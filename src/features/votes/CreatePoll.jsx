import React from 'react';

export const CreatePoll = ({ dispatch, set }) => {
  const [value, setValue] = React.useState('');
  const [fields, setFields] = React.useState([]);
  const [title, setTitle] = React.useState('');

  return (
    <div>
      <h1>{title ? title : 'Create Poll'}</h1>
      <ul>
        {fields.map(field => (
          <li>{field}</li>
        ))}
      </ul>
      <form
        onSubmit={e => {
          e.preventDefault();
          setFields([...fields, value]);
          setValue('');
        }}
      >
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="title"
          className="db"
        />
        <input
          type="text"
          value={value}
          className="db"
          placeholder="options go here..."
          onChange={e => setValue(e.target.value)}
        />
        <button type="submit">Add Option</button>
      </form>
      <br />
      <form
        onSubmit={e => {
          e.preventDefault();
          set({
            title,
            createdBy: 'Josh',
            description: value,
            deadline: '7 days',
            fields
          });

          dispatch('POLL_CREATED');
        }}
      >
        <button type="submit">Complete</button>
      </form>
    </div>
  );
};
