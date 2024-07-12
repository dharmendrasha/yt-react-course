import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
// import { trash } from "../trash-can-solid.svg";

/**
 * To Do application
 * - input box
 * - add
 * - list
 */

function App() {
  const [list, updateList] = useState([]);

  const [task, setTask] = useState("");

  const [isSave, setIsSave] = useState(true);

  function addToTheList(task) {
    // is unique task
    const isAvailable = list.find(function (value) {
      return value === task;
    });

    if (isAvailable) {
      alert("task " + task + " is already in the queue");
      return;
    }

    const tasks = [...list, task];

    console.log({ list, task, tasks });
    updateList(tasks);
  }

  const handleRemove = (indexToRemove) => {
    updateList(list.filter((_, index) => index !== indexToRemove));
  };

  const handleEdit = (indexToEdit) => {
    setIsSave(false);
    const valueToEdit = list[indexToEdit];
    setTask(valueToEdit);
  };

  const updateToTheList = (editted) => {
    if (editted && editted.length > 0) {
      const tasks = [...list, editted];
      console.log({ list, editted, tasks });
      updateList(tasks);
      setTask("");
      setIsSave(true);
    }
  };

  return (
    <div className="container">
      <p class="h1">To Do App</p>

      {/* input box */}

      <input
        class="form-control"
        type="text"
        onInput={(event) => setTask(event.target.value)}
        value={task}
        placeholder="add task"
        aria-label="enter task"
        readonly
      />

      {/* add button */}
      <button
        onClick={() => {
          if (task && task.length > 0) {
            addToTheList(task);
            setTask("");
            return;
          }

          alert("please add a task");
        }}
        type="button btn-block btn-lg"
        class="btn btn-primary"
      >
        +Add
      </button>
      <button
        type="button btn-block btn-lg"
        class="btn btn-warning"
        onClick={() => updateToTheList(task)}
        disabled={isSave}
      >
        Save
      </button>

      <br />
      <br />
      {/* show list */}

      <ul class="list-group">
        {list.map(function (value, index) {
          return (
            <>
              <li key={`li-${index}`} class="list-group-item">
                {value}
                <button
                  class="btn btn-danger"
                  onClick={() => handleRemove(index)}
                >
                  remove
                </button>
                <button
                  class="btn btn-success"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>
              </li>
            </>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
