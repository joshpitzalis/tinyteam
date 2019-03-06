import formatDistance from 'date-fns/formatDistance';
import React from 'react';

export const Message = ({ item, send }) => {
  return (
    <li
      className={`  pa2  ${item.author !== 'Josh Pitzalis' ? 'red' : 'black'}`}
    >
      {/* <div className="flex justify-between"> */}
      <h4 className="mb1">
        <span className="author">{`${item.author} `}</span>
        <small className="date fw1">
          {item.created &&
            ` ${formatDistance(new Date(), new Date(item.created))} ago`}
        </small>
      </h4>
      {/* <Star
          handleClick={() =>
            send({ type: 'COMMENT_STARRED', payload: item.body })
          }
        /> */}
      {/* </div> */}
      <p className="mt0">{item.body}</p>
    </li>
  );
};
