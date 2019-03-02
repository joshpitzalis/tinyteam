import React from 'react';
export const EditableToDoItem = ({ submit, todo, setTodo }) => {
  return (
    <form onSubmit={submit}>
      <input
        type="text"
        value={todo}
        onChange={e => setTodo(e.target.value)}
        data-testid="taskInput"
      />
      <input type="submit" value="add todo" data-testid="addToDo" />
    </form>
  );
};
