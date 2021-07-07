import React from 'react'

const List = ({
  tasks,
  specificDelete,
  specificChange,
  editTask,
  taskEdit,
  setTaskEdit,
  handleEdit,
}) => {
  // const handleOnChange = () => {
  //   setIsChecked(!isChecked)
  // }

  return (
    <div className='m-auto  lg:w-1/2'>
      {tasks.map((task) => {
        const { id, title, checked, isEditing } = task
        return (
          <div
            key={id}
            className='p-2 mb-2 border border-blue-500 text-left min-w-full flex justify-between items-center'
          >
            <div className='flex items-center'>
              <input
                className='m-1'
                type='checkbox'
                id='accept'
                onChange={() => specificChange(id)}
                checked={checked}
              />
              {isEditing ? (
                <div className='m-1'>
                  <input
                    className='border border-gray-200'
                    maxLength='25'
                    type='text'
                    value={taskEdit}
                    onChange={(e) => setTaskEdit(e.target.value)}
                  />
                  <button
                    onClick={() => handleEdit(id)}
                    className='bg-yellow-600 rounded  text-white pl-1 pr-1'
                  >
                    Edit
                  </button>
                </div>
              ) : checked ? (
                <h2 className='m-1'>
                  <del>{title}</del>
                </h2>
              ) : (
                <h2 className='m-1'>{title}</h2>
              )}
            </div>
            <div>
              <button onClick={() => editTask(id)}>
                <i
                  className='fa fa-pencil p-2 text-yellow-800'
                  aria-hidden='true'
                ></i>
              </button>
              <button onClick={() => specificDelete(id)}>
                <i
                  className='fa fa-times p-2 text-red-500'
                  aria-hidden='true'
                ></i>
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default List
