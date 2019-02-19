import React from 'react';
import { VoteContext } from '../../context/VoteContext';

/* @params
 id:string 
 */
export const Poll = ({ id }) => {
  const { polls } = React.useContext(VoteContext);
  const questions = polls[id].fields;
  const handleChange = () => console.log('frog');
  console.log('questions', polls[id]);
  return (
    <section className="mw6-ns w-100 center tc ">
      <header>
        <h2 className="f1 lh-title">{polls[id].title}</h2>
        <h3>A little desctiption goes here</h3>
      </header>
      <hr className="dn" />
      <form className="mt3">
        <div className="ma0">
          {questions.map((question, index) => (
            <div key={index} className="pa2 ma0  bg-white">
              <label className="container tl ma0 relative ">
                <input
                  type="radio"
                  name="responses"
                  value={question}
                  onChange={e => handleChange(e, question)}
                />{' '}
                {question}
                <span className="radiomark" />
              </label>
            </div>
          ))}
        </div>
        <input type="submit" value={'Submit'} />
      </form>
      <h3>2 days and 45 minutes left...</h3>
    </section>
  );
};
