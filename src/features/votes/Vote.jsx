import React from 'react';

export const Vote = ({ id, dispatch, setId }) => (
  <article
    className="dt w-100 pb2 mt2 grow pointer"
    onClick={() => {
      setId(id);
      dispatch({ type: 'EXISTING_POLL_OPENED' });
    }}
  >
    <div className="dtc v-mid" />
  </article>
);
