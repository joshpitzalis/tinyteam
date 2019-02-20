import React from 'react';

export const Vote = ({ title, deadline, votes, id, dispatch }) => {
  return (
    <article className="dt w-100 bb b--black-05 pb2 mt2" href="#0">
      <div className="dtc w5 v-mid">
        <div className="f3 f2-ns b ml0">{deadline}</div>{' '}
      </div>
      <div className="dtc v-mid pl3">
        <h1 className="f6 f5-ns fw6 lh-title black mv0">{title}</h1>
        <time className="f6 ttu tracked gray">{votes} people voted</time>
      </div>
      <div className="dtc v-mid">
        <button
          className="f6 button-reset bg-white ba b--black-10 dim pointer pv1 black-60"
          onClick={() => dispatch({ type: 'UPVOTED', payload: id })}
        >
          Vote
        </button>
      </div>
    </article>
  );
};
