import './App.css'
import { useState, useEffect } from 'react'
import List from './component/List'

const getLocalStorage = () => {
  let getData = localStorage.getItem('Tasks')
  if (getData) {
    const data = JSON.parse(localStorage.getItem('Tasks'))
    const checkingEdit = data.map((item) => {
      return { ...item, isEditing: false }
    })
    localStorage.setItem('Tasks', JSON.stringify(checkingEdit))
    return data
  } else {
    return []
  }
}

function App() {
  const [task, setTask] = useState('')
  const [taskList, setTaskList] = useState(getLocalStorage)
  const [taskEdit, setTaskEdit] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!task) {
      return
    } else {
      const newTask = {
        id: new Date().getTime().toString(),
        title: task,
        checked: false,
        isEditing: false,
      }
      setTaskList([...taskList, newTask])
      localStorage.setItem('Tasks', JSON.stringify([...taskList, newTask]))
      setTask('')
    }
  }

  // useEffect(() => {
  //   localStorage.setItem('Tasks', JSON.stringify(taskList))
  // }, [taskList])

  const deleteAll = () => {
    setTaskList([])
    localStorage.setItem('Tasks', JSON.stringify([]))
  }

  const specificDelete = (id) => {
    setTaskList(taskList.filter((item) => item.id !== id))
    localStorage.setItem(
      'Tasks',
      JSON.stringify(taskList.filter((item) => item.id !== id))
    )
  }

  const specificChange = (id) => {
    const specificTask = taskList.find((item) => item.id === id)
    setTaskList(
      taskList.map((item) => {
        if (item.id === specificTask.id) {
          return { ...item, checked: !specificTask.checked }
        }
        return item
      })
    )
    localStorage.setItem(
      'Tasks',
      JSON.stringify(
        taskList.map((item) => {
          if (item.id === specificTask.id) {
            return { ...item, checked: !specificTask.checked }
          }
          return item
        })
      )
    )
  }

  const editTask = (id) => {
    const specificTask = taskList.find((item) => item.id === id)
    setTaskEdit(specificTask.title)
    setTaskList(
      taskList.map((item) => {
        if (item.id === specificTask.id) {
          return { ...item, isEditing: !specificTask.isEditing }
        } else {
          return { ...item, isEditing: false }
        }
        return item
      })
    )

    localStorage.setItem(
      'Tasks',
      JSON.stringify(
        taskList.map((item) => {
          if (item.id === specificTask.id) {
            return { ...item, isEditing: !specificTask.isEditing }
          } else {
            return { ...item, isEditing: false }
          }
          return item
        })
      )
    )
  }

  const handleEdit = (id) => {
    if (!taskEdit) {
      return
    } else {
      const specificTask = taskList.find((item) => item.id === id)
      setTaskList(
        taskList.map((item) => {
          if (item.id === specificTask.id) {
            return { ...item, title: taskEdit, isEditing: false }
          }
          return item
        })
      )
      localStorage.setItem(
        'Tasks',
        JSON.stringify(
          taskList.map((item) => {
            if (item.id === specificTask.id) {
              return {
                ...item,
                title: taskEdit,
                isEditing: false,
              }
            }
            return item
          })
        )
      )
    }
  }

  return (
    <div>
      <section className=' text-center p-2'>
        <form className='p-4' onSubmit={handleSubmit}>
          <div>
            <input
              maxLength='25'
              className='border border-gray-200 p-2'
              type='text'
              placeholder='Add Task...'
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <button
              className='p-2 bg-blue-500 rounded  text-white '
              type='submit'
            >
              Add Task
            </button>
          </div>
        </form>
        <div className=''>
          <List
            tasks={taskList}
            specificDelete={specificDelete}
            specificChange={specificChange}
            editTask={editTask}
            taskEdit={taskEdit}
            setTaskEdit={setTaskEdit}
            handleEdit={handleEdit}
          />
        </div>
        <div className='p-10'>
          {taskList.length > 0 && (
            <button
              className='bg-blue-500 rounded  text-white p-2'
              onClick={deleteAll}
            >
              Clear All Tasks
            </button>
          )}
        </div>
      </section>
    </div>
  )
}

export default App
