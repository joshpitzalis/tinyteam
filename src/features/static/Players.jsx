import React from 'react';
import { connect } from 'react-redux';

const _Players = ({ image }) => {
  console.log('image', image);
  return (
    <div className="flex">
      <img
        src={image}
        alt="me"
        className="ba b--black-10 db br-100 w2 w3-ns h2 h3-ns"
      />
    </div>
  );
};

const profileImage = store => store.auth.user && store.auth.user.photoURL;

const select = store => ({
  image: profileImage(store),
});

export const Players = connect(select)(_Players);
