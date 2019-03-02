import formatDistance from 'date-fns/formatDistance';
import React from 'react';
import Star from '../../images/star';

export const Message = ({ item, send }) => {
  return (
    <li
      className={`ba mv1 pa2 b--silver br3 ${
        item.author !== 'Josh Pitzalis' ? 'red' : 'black'
      }`}
    >
      <div className="flex justify-between">
        <h4>
          <span className="author">{`${item.author} `}</span>
          <small className="date fw1">
            {item.created &&
              ` ${formatDistance(new Date(), new Date(item.created))} ago`}
          </small>
        </h4>
        <Star
          handleClick={() =>
            send({ type: 'COMMENT_STARRED', payload: item.body })
          }
        />
      </div>
      <p>{item.body}</p>
    </li>
  );
};
