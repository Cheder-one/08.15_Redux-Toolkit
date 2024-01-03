import { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { initStore, actions } from "./store";

const store = initStore();
const { dispatch, subscribe } = store;

const App = () => {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    subscribe(() => {
      setState(store.getState());
      console.log(store.getState());
    });
  }, []);

  // prettier-ignore
  const { 
    taskCompleted,
    titleChanged,
    taskAdded,
    taskDeleted 
  } = bindActionCreators(actions, dispatch);

  const handleTaskComplete = (id) => {
    taskCompleted(id);
  };

  const handleTitleChange = (id) => {
    titleChanged(id);
  };

  const handleTaskAdd = () => {
    taskAdded();
  };

  const handleTaskDelete = (id) => {
    taskDeleted(id);
  };

  return (
    <>
      <h1>App</h1>
      <p />
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
