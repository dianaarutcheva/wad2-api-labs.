import React from "react";

const AddTaskForm = (props) => {
  return (
    <div>
      <form onSubmit={props.submit}>
        <label>
          Task title:
          <input
            type="text"
            name="title"
            required
            value={props.formState.title}
            onChange={props.change}
          />
        </label>
        <br />
        <label>
          Due date:
          <input
            type="date"
            name="deadline"
            required
            value={props.formState.deadline}
            onChange={props.change}
          />
        </label>
        <br />
        <label>
          Details:
          <input
            type="text"
            name="description"
            value={props.formState.description}
            onChange={props.change}
          />
        </label>
        <br />
        <label>
          Priority:
          <select
            name="priority"
            required
            value={props.formState.priority}
            onChange={props.change}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AddTaskForm;
