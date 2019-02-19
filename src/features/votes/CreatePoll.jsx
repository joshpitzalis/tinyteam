import React from 'react';
import { VoteContext } from '../../context/VoteContext';

export const CreatePoll = ({ dispatch }) => {
  const [value, setValue] = React.useState('');
  const [fields, setFields] = React.useState([]);
  const [newPoll, setPoll] = React.useState({});
  const [title, setTitle] = React.useState('');

  const { createPoll } = React.useContext(VoteContext);

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
          onChange={e => setValue(e.target.value)}
        />
        <button type="submit">Add Option</button>
      </form>
      <br />
      <form
        onSubmit={e => {
          e.preventDefault();
          dispatch({
            type: 'POLL_CREATED',
            payload: {
              newPoll: {
                title,
                id: +new Date(),
                createdBy: 'Josh',
                votes: 15,
                fields,
                deadline: '14 days'
              },
              createPoll
            }
          });
        }}
      >
        <button type="submit">Complete</button>
      </form>
    </div>
  );
};
