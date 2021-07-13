import { useState } from 'react'
import Listtry from './component/Listtry'

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

const Apptry = () => {
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
      <section className='text-center'>
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <div className='relative'>
              <input
                type='text'
                maxLength='25'
                placeholder='Add Task...'
                className='w-full pr-16 input input-primary input-bordered'
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
              <button
                type='submit'
                className='absolute right-0 top-0 rounded-l-none btn btn-primary'
              >
                Add Task
              </button>
            </div>
          </div>
        </form>
        <br />
        <div>
          <Listtry
            tasks={taskList}
            setTasks={setTaskList}
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
            <button onClick={deleteAll} className='btn btn-primary'>
              Clear All Tasks
            </button>
          )}
        </div>
      </section>
    </div>
  )
}

export default Apptry
