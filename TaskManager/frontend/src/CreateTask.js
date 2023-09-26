import React from 'react'

const CreateTask = () => {
  return (
    <div>
        <h3>Create Task</h3>
      <form>
        <label>Name of Task</label>
        <input type='text' placeholder='e.g Owambe'/>
        <br/>
        <br/>
        <label>Date of Task</label>
        <input type='date'/>
        <br/>
        <br/>
        <label>Time of Task</label>
        <input type='time'/>
        <br/>
        <br/>
        <label>Description of Task</label>
        <input type='textarea'/>
        <br/>
        <br/>
        <input type='submit'/>

      </form>
    </div>
  )
}

export default CreateTask
