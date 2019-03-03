import firebase from 'firebase/app';
import React from 'react';
import { useAuth } from '../../hooks/auth';
import { useFireColl } from '../../hooks/firebase';
import { firestore } from '../../utils/firebase';

export const Poll = ({ poll: { id, title, deadline }, transition }) => {
  const options = useFireColl(`decisions/${id}/options`);

  const handleChange = async (voted, optionId) => {
    await firestore.doc(`decisions/${id}/options/${optionId}`).update({
      votes: voted
        ? firebase.firestore.FieldValue.arrayRemove(user.uid)
        : firebase.firestore.FieldValue.arrayUnion(user.uid)
    });
  };

  const user = useAuth();

  const deletePoll = id => {
    transition('MODAL_CLOSED');
    firestore.doc(`decisions/${id}`).delete();
  };

  const [value, setValue] = React.useState('');

  const submitNewOption = voteId => async e => {
    e.preventDefault();

    const newOption = await firestore
      .collection(`decisions/${voteId}/options`)
      .doc();
    await firestore
      .doc(`decisions/${voteId}/options/${newOption.id}`)
      .set({ title: value, id: newOption.id });

    setValue('');
  };

  return (
    <section className="mw6-ns w-100 center tc ">
      <header>
        <h2 className="f1 lh-title">{title}</h2>
        {/* <h3>A little desctiption goes heres</h3> */}
      </header>
      <hr className="dn" />
      <form className="mt3">
        <div className="ma0">
          {options &&
            options.map(option => {
              const voted = new Set(option.votes).has(user.uid);
              const count = option.votes ? option.votes.length : 0;
              return (
                <div key={option.id} className="pa2 ma0 tl bg-white">
                  <label className=" ma0 w-100 ">
                    <input
                      type="checkbox"
                      name="responses"
                      checked={voted}
                      onChange={() => handleChange(voted, option.id)}
                    />{' '}
                    {option.title}
                    <span className="radiomark " />
                  </label>
                  <b className="f3 fr">{count}</b>
                </div>
              );
            })}
        </div>
        <input
          type="submit"
          value="Submit"
          className="mt3 pa4 br3 ttu pointer b"
        />
      </form>
      {/* <h3>{deadline} left...</h3> */}

      <form onSubmit={submitNewOption(id)}>
        <input
          type="text"
          value={value}
          className="db w-100 pa3 br3 ma3 mb0 mt6"
          placeholder="Add a new option to the mix..."
          onChange={e => setValue(e.target.value)}
        />
        <button type="submit" className="db w-100 pa3 br3 ma3 mt0">
          Add An Option
        </button>
      </form>

      <p className="washed-red b pointer" onClick={() => deletePoll(id)}>
        Delete this poll
      </p>
    </section>
  );
};
