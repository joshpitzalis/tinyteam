import React from 'react';
import { useFireColl } from '../../hooks/firebase';

export const Poll = ({ poll: { id, title, deadline } }) => {
  const options = useFireColl(`decisions/${id}/options`);
  const handleChange = () => console.log('frog');
  return (
    <section className="mw6-ns w-100 center tc ">
      <header>
        <h2 className="f1 lh-title">{title}</h2>
        <h3>A little desctiption goes here</h3>
      </header>
      <hr className="dn" />
      <form className="mt3">
        <div className="ma0">
          {options.map(({ title, id }) => (
            <div key={id} className="pa2 ma0  bg-white">
              <label className="container tl ma0 relative ">
                <input
                  type="radio"
                  name="responses"
                  value={title}
                  // onChange={e => handleChange(e, question)}
                />{' '}
                {title}
                <span className="radiomark" />
              </label>
            </div>
          ))}
        </div>
        <input type="submit" value={'Submit'} className="mt3" />
      </form>
      <h3>{deadline} left...</h3>
    </section>
  );
};
