import { useEffect } from "react";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";

import * as actions from "./store/reducers/tasks";
import * as selectors from "./store/reducers/tasks";
import { getErrors } from "./store/reducers/errors";

const { getTasks, getTasksLoadingStatus } = selectors;

const App = () => {
  const state = useSelector(getTasks());
  const isLoading = useSelector(getTasksLoadingStatus());
  const error = useSelector(getErrors());

  const dispatch = useDispatch();

  const { loadTasks, taskCompleted, titleChanged, createTask, taskDeleted } =
    bindActionCreators(actions, dispatch);

  useEffect(() => {
    loadTasks();
  }, []);

  const handleTaskComplete = (id) => {
    taskCompleted(id);
  };

  const handleTitleChange = (id) => {
    titleChanged(id);
  };

  const handleTaskAdd = () => {
    createTask("New Task");
  };

  const handleTaskDelete = (id) => {
    taskDeleted(id);
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error.length > 0) {
    return <p>{error}</p>;
  }

  return (
    <>
      {state.map((task) => (
        <li key={task.id}>
          <span>{task.title}</span>
          <span> {task.completed ? "✅" : "❌"}</span> <p />
          <button onClick={() => handleTaskComplete(task.id)}>Complete</button>
          <button onClick={() => handleTitleChange(task.id)}>
            Change Title
          </button>
          <button onClick={() => handleTaskDelete(task.id)}>Delete</button>
          <hr />
        </li>
      ))}
      <button onClick={handleTaskAdd}>Add Task</button>
    </>
  );
};

export default App;
