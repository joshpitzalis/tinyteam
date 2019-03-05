import Slider from 'antd/lib/slider';
import React from 'react';
const marks = {
  0: 'Dec 11th 2018',
  16: {
    label: <small>Landing Page Up</small>
  },
  37: {
    label: <small className="db">Launched MVP</small>
  },
  50: {
    style: {
      color: '#4fafa0'
    },
    label: (
      <>
        <strong className="db">100 Email Subscribers</strong>
        <small className="db">May 16th</small>
      </>
    )
  },
  70: {
    style: {
      color: '#c8494d'
    },
    label: (
      <>
        <strong className="db">Begin Beta Testing</strong>
        <small className="db">April 26th</small>
      </>
    )
  },
  100: {
    style: {
      color: '#1d5095'
    },
    label: (
      <>
        <strong className="db">First Paid Customer</strong>
        <small className="db">June 16th 2019</small>
      </>
    )
  }
};
export const Stats = () => {
  return (
    <>
      {/* <TeamStats /> */}

      <div className="mw9 center ph3 ph5-ns mb6">
        <Slider marks={marks} defaultValue={42} disabled />
      </div>
    </>
  );
};

export const TeamStats = () => {
  return (
    <section className="pa3 pa5-ns" data-name="slab-stat-small">
      <h3 className="f6 ttu tracked">Today</h3>
      <div className="cf">
        <dl className="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
          <dd className="f6 fw4 ml0">Votes cast</dd>
          <dd className="f3 fw6 ml0">24</dd>
        </dl>
        <dl className="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
          <dd className="f6 fw4 ml0">Todos created</dd>
          <dd className="f3 fw6 ml0">3</dd>
        </dl>
        <dl className="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
          <dd className="f6 fw4 ml0">Hour Worked</dd>
          <dd className="f3 fw6 ml0">44</dd>
        </dl>
        <dl className="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
          <dd className="f6 fw4 ml0">Chat Comments</dd>
          <dd className="f3 fw6 ml0">102</dd>
        </dl>

        <dl className="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
          <dd className="f6 fw4 ml0">People</dd>
          <dd className="f3 fw6 ml0">3</dd>
        </dl>
        <dl className="fl fn-l w-50 dib-l w-auto-l lh-title">
          <dd className="f6 fw4 ml0">Days left</dd>
          <dd className="f3 fw6 ml0">126</dd>
        </dl>
      </div>
    </section>
  );
};
