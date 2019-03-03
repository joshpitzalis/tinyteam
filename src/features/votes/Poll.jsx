import firebase from 'firebase/app';
import React from 'react';
import { useAuth } from '../../hooks/auth';
import { useFireColl } from '../../hooks/firebase';
import { firestore } from '../../utils/firebase';

export const Poll = ({ poll: { id, title, deadline }, transition }) => {
  const options = useFireColl(`decisions/${id}/options`);

  const handleChange = async (voted, optionId) => {
    if (voted) {
      await firestore.doc(`decisions/${id}/options/${optionId}`).update({
        votes: firebase.firestore.FieldValue.arrayRemove(user.uid)
      });
      return;
    }

    await firestore.doc(`decisions/${id}/options/${optionId}`).update({
      votes: firebase.firestore.FieldValue.arrayUnion(user.uid)
    });
  };

  const user = useAuth();

  const deletePoll = id => {
    transition('MODAL_CLOSED');
    firestore.doc(`decisions/${id}`).delete();
  };

  return (
    <section className="mw6-ns w-100 center tc ">
      <p className="tl red b pointer" onClick={() => deletePoll(id)}>
        Delete Poll
      </p>
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
              return (
                <div key={option.id} className="pa2 ma0  bg-white">
                  <label className="container tl ma0 relative ">
                    <input
                      type="checkbox"
                      name="responses"
                      checked={voted}
                      onChange={() => handleChange(voted, option.id)}
                    />{' '}
                    {option.title}
                    <span className="radiomark" />
                  </label>
                </div>
              );
            })}
        </div>
        <input type="submit" value={'Submit'} className="mt3" />
      </form>
      <h3>{deadline} left...</h3>
    </section>
  );
};
