import React from 'react'

const Listtry = ({
  tasks,
  specificDelete,
  specificChange,
  editTask,
  taskEdit,
  setTaskEdit,
  handleEdit,
}) => {
  return (
    <div>
      {tasks.map((task) => {
        const { id, title, checked, isEditing } = task
        return (
          <div key={id} className='px-3 py-6 mb-2 card bordered'>
            <div className='form-control'>
              <label className='cursor-pointer label '>
                <div className='flex items-center'>
                  <div className='inline-block pr-1'>
                    <input
                      type='checkbox'
                      className='checkbox checkbox-primary'
                      onChange={() => specificChange(id)}
                      checked={checked}
                    />
                    <span className='checkbox-mark'></span>
                  </div>
                  {isEditing ? (
                    <div className='form-control'>
                      <div className='relative'>
                        <input
                          value={taskEdit}
                          maxLength='25'
                          type='text'
                          placeholder=''
                          className='w-full pr-16 input input-primary input-bordered'
                          onChange={(e) => setTaskEdit(e.target.value)}
                        />
                        <button
                          onClick={() => handleEdit(id)}
                          className='absolute right-0 top-0 rounded-l-none btn btn-primary'
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ) : checked ? (
                    <span className='label-text'>
                      <del className='text-gray-400'>{title}</del>
                    </span>
                  ) : (
                    <span className='label-text'>{title}</span>
                  )}
                </div>
                <div>
                  <button onClick={() => editTask(id)}>
                    <i
                      className='fa fa-pencil p-3 text-yellow-800'
                      aria-hidden='true'
                    ></i>
                  </button>
                  <button onClick={() => specificDelete(id)}>
                    <i
                      className='fa fa-times p-3 text-red-500'
                      aria-hidden='true'
                    ></i>
                  </button>
                </div>
              </label>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Listtry
