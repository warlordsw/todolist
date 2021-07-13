import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const Listtry = ({
  tasks,
  setTasks,
  specificDelete,
  specificChange,
  editTask,
  taskEdit,
  setTaskEdit,
  handleEdit,
}) => {
  const onEnd = (result) => {
    const items = Array.from(tasks)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    setTasks(items)
    localStorage.setItem('Taskss', JSON.stringify(items))
  }

  return (
    <div>
      <DragDropContext onDragEnd={onEnd}>
        <Droppable droppableId='12345678'>
          {(provided, snapshot) => (
            <div ref={provided.innerRef}>
              {tasks.map((task, index) => {
                const { id, title, checked, isEditing } = task
                return (
                  <Draggable draggableId={id} key={id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className='px-3 py-6 mb-2 card bordered'
                      >
                        <div className='form-control'>
                          <label className='cursor-pointer label'>
                            <div className='flex items-center flex-grow'>
                              <div>
                                <input
                                  type='checkbox'
                                  className='checkbox checkbox-primary'
                                  onChange={() => specificChange(id)}
                                  checked={checked}
                                />
                                <span className='checkbox-mark'></span>
                              </div>
                              {isEditing ? (
                                <form
                                  className='flex-grow'
                                  onSubmit={(e) => {
                                    e.preventDefault()
                                    handleEdit(id)
                                  }}
                                >
                                  <div className='form-control mx-2 '>
                                    <div className='relative'>
                                      <input
                                        value={taskEdit}
                                        maxLength='25'
                                        type='text'
                                        placeholder='Add task...'
                                        className='w-full pr-16 input input-primary input-bordered'
                                        onChange={(e) =>
                                          setTaskEdit(e.target.value)
                                        }
                                      />
                                      <button
                                        type='submit'
                                        className='absolute right-0 top-0 rounded-l-none btn btn-accent'
                                      >
                                        Edit
                                      </button>
                                    </div>
                                  </div>
                                </form>
                              ) : checked ? (
                                <span className='label-text px-2'>
                                  <del className='text-gray-400'>{title}</del>
                                </span>
                              ) : (
                                <span className='label-text px-2'>{title}</span>
                              )}
                            </div>

                            <div>
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
                            </div>
                          </label>
                        </div>
                      </div>
                    )}
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default Listtry
