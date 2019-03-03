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

  return (
    <section className="mw6-ns w-100 center tc ">
      <header>
        <h2 className="f1 lh-title">{title}</h2>
        <h3>A little desctiption goes heres</h3>
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
                  <label className=" tl ma0  ">
                    <input
                      type="checkbox"
                      name="responses"
                      checked={voted}
                      onChange={() => handleChange(voted, option.id)}
                    />{' '}
                    {option.title} <b className="f3">{count}</b>
                    <span className="radiomark " />
                  </label>
                </div>
              );
            })}
        </div>
        <input type="submit" value={'Submit'} className="mt3" />
      </form>
      {/* <h3>{deadline} left...</h3> */}
      <p className="red b pointer" onClick={() => deletePoll(id)}>
        Delete this poll
      </p>
    </section>
  );
};
