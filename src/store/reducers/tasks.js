import { createSlice } from "@reduxjs/toolkit";

import todosService from "../services/todos.service";
import { setErrors } from "./errors";

const initialState = {
  entities: [],
  isLoading: true,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    received(state, action) {
      state.entities.push(...action.payload);
      state.isLoading = false;
    },
    add(state, action) {
      state.entities.push(action.payload);
      state.isLoading = false;
    },
    update(state, action) {
      const newArr = state.entities.map((task) => {
        return task.id === action.payload.id
          ? { ...task, ...action.payload }
          : task;
      });
      state.entities = newArr;
    },
    remove(state, action) {
      const newArr = state.entities.filter((item) => {
        return item.id !== action.payload.id;
      });
      state.entities = newArr;
    },

    taskRequested(state) {
      state.isLoading = true;
    },
    taskRequestFailed(state) {
      state.isLoading = false;
    },
  },
});

const { received, add, update, remove, taskRequested, taskRequestFailed } =
  taskSlice.actions;

export const loadTasks = () => async (dispatch) => {
  dispatch(taskRequested());
  try {
    const data = await todosService.fetch();
    dispatch(received(data));
  } catch (error) {
    dispatch(taskRequestFailed());
    dispatch(setErrors(error.message));
  }
};

export const createTask = (title) => async (dispatch) => {
  dispatch(taskRequested());
  try {
    const data = await todosService.create(title);
    dispatch(add(data));
  } catch (error) {
    dispatch(taskRequestFailed());
    dispatch(setErrors(error.message));
  }
};

export const taskCompleted = (id) => {
  return update({ id: id, completed: true });
};

export const titleChanged = (id) => {
  return update({ id: id, title: `New Title ${id}` });
};

export const taskAdded = () => {
  return add({ id: Date.now(), title: "New Task", completed: false });
};

export const taskDeleted = (id) => {
  return remove({ id: id });
};

export const getTasks = () => (state) => state.tasks.entities;
export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading;

const { reducer: taskReducer } = taskSlice;
export default taskReducer;
