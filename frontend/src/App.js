import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import { removeValueFromArray, updateValueFromArray } from "./util";
import { CustomInput } from "./components/input";
import { CustomButtons } from "./components/button";
import { List } from "./components/list";
import * as taskApi from './api/task'

/**
 * To Do application
 * - input box
 * - add
 * - list
 */

function App() {
  const [list, updateList] = useState([]);

  const [task, setTask] = useState("");

  useEffect(() => {
   
    async function getList(){
    const data = await taskApi.list()
    updateList(data)
   }

   getList()

  }, [])

  async function addToTheList(task) {
    // is unique task
    const isAvailable = list.find(function (value) {
      return value.name === task;
    });

    if (isAvailable) {
      alert("task " + task + " is already in the queue");
      return;
    }

    // api call
    await taskApi.post(task)
    const data = await taskApi.list()
    updateList(data)

  }

  async function deleteTask(task /* value */) {
    if (task && task.length === 0) {
      console.debug(`task is not type of string task is `, task);
      throw Error(`task is not a type of string`);
    }

    await taskApi.del(task)

    const data = await taskApi.list()
    updateList(data)
  }

  const updateTask = (task) => {
    if (task && task.length === 0) {
      console.debug(`task is empty`);
      throw new Error(`task must have length more than 0`);
    }

    const isExists = list.findIndex((val) => val === task);

    if (isExists === -1) {
      alert(`Task ${task} not found`);
      return;
    }

    const update = prompt(`Please enter update value`, task);

    const updatedArray = updateValueFromArray(list, task, update);

    updateList(updatedArray);
  };




  return (
    <div className="container">
      <p class="h1">To Do App</p>
      <form onSubmit={(ev) => ev.preventDefault()}>
        <CustomInput placeholder="Add task" onInput={(task) => setTask(task)} />
        <CustomButtons
          label={"Add Task"}
          onClick={() => {
            if (task && task.length > 0) {
              addToTheList(task);
              setTask("");
              return;
            }
            alert("please add a task");
          }}
        />
      </form>

      <br />
      <br />
      <ul class="list-group">
        <List list={list} deleteTask={deleteTask} updateTask={updateTask} />
      </ul>
    </div>
  );
}

export default App;
