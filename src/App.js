import 'bootstrap/dist/css/bootstrap.css'
import { FloppyFill } from 'react-bootstrap-icons';
import { useState } from 'react'
import _ from 'underscore'
import { removeValueFromArray, updateValueFromArray } from './util'

/**
 * To Do application
 * - input box
 * - add
 * - list
 */

function App() {
  const [list, updateList] = useState([])

  const [task, setTask] = useState('')
  
  function addToTheList(task){

    // is unique task
    const isAvailable = list.find(function(value){
      return value === task
    })

    if(isAvailable){
      alert("task " + task + ' is already in the queue')
      return
    }

    const tasks = [...list, task]

    updateList(tasks)
  }

  function deleteTask(task /* value */){
    if(task.length === 0){
      console.debug(`task is not type of string task is `, task)
      throw Error(`task is not a type of string`)
    }

    


    const isExists = list.findIndex((val) => val === task)


    if(isExists === -1){
      alert(`Task ${task} not found`);
      return
    }


    const removedTask = removeValueFromArray(list, task)

    updateList(removedTask)

  }

  const updateTask = (task) => {
    if(task && task.length === 0){
      console.debug(`task is empty`)
      throw new Error(`task must have length more than 0`)
    }


    const isExists = list.findIndex((val) => val === task)


    if(isExists === -1){
      alert(`Task ${task} not found`);
      return
    }

    const update = prompt(`Please enter update value`, task)
    
    const updatedArray = updateValueFromArray(list, task, update)

    updateList(updatedArray)

    
  }

  return (
    <div className='container'>
      <p class="h1">To Do App</p>

{/* input box */}

<input class="form-control" type="text" onInput={(event) => setTask(event.target.value)
} value={task}
placeholder="add task" aria-label="enter task" readonly />


{/* add button */}
<button onClick={() => {
  if(task && task.length > 0){
    addToTheList(task)
    setTask('')
    return
  }

  alert("please add a task")
  

}} type="button btn-block btn-lg" class="btn btn-primary"><FloppyFill />Add</button>

<br/>
<br/>
{/* show list */}

<ul class="list-group">
  {
    list.map(function(value, index){
      return (
        <>
          <li 
          key={`li-${index}`}
          class="list-group-item">
            {value}
            <button onClick={() => deleteTask(value)} type="button" class="btn btn-danger">Delete</button>
            <button onClick={() => updateTask(value)} type="button" class="btn btn-primary">Update</button>
            </li>
        </>
      )
    })
  }  
</ul>




    </div>
  );
}

export default App;
