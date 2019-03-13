import Icon from 'antd/lib/icon';
import Slider from 'antd/lib/slider';
import PropTypes from 'prop-types';
import React from 'react';
import { useFireColl } from '../../hooks/firebase';
import {
  calculateTodayDateinDaysFromStartDate,
  convertNumberToDate,
  convertSecondsToDaysFrom,
  createNewGoal,
  inPast,
} from './helpers';

export const Stats = () => {
  const goals = useFireColl(`objectives`);

  const [value, setValue] = React.useState(0);
  const [color, setColor] = React.useState(null);
  const [visible, setVisbility] = React.useState(false);
  const [today, setToday] = React.useState(null);

  const objectives = goals.sort(
    (a, b) => a.deadline.seconds - b.deadline.seconds
  );

  const objectivesObject = objectives.reduce((total, objective) => {
    total[
      convertSecondsToDaysFrom(
        objective.deadline.seconds,
        objectives[0].deadline.seconds
      )
    ] = {
      style: {
        fontSize: objective.size,
      },
      label: (
        <Objective
          icon={inPast(objective.deadline.seconds) ? 'trophy' : 'rocket'}
          color={objective.color}
          setColor={setColor}
          setVisbility={setVisbility}
          fontsize={objective.size}
        />
      ),
    };
    return total;
  }, {});

  React.useEffect(() => {
    const todaysDateInDays =
      objectives &&
      objectives.length > 0 &&
      calculateTodayDateinDaysFromStartDate(objectives[0].deadline.seconds);
    setToday(todaysDateInDays);
    setValue(todaysDateInDays);
  }, [objectives]);

  return (
    <div data-testid="goalRoad" onMouseLeave={() => setValue(today)}>
      <div className="h3 flex align-items">
        {visible && (
          <div data-testid="detailsBox" className="w-100 tc pa3">
            <h1 style={{ color: `${color}` }}>hello</h1>
          </div>
        )}
      </div>
      <div
        role="slider"
        aria-valuemin="1"
        aria-valuemax="7"
        aria-valuenow="2"
        aria-valuetext="Monday"
        className="mw9 center ph3 ph5-ns mb6"
        onDoubleClick={() => createNewGoal(value)}
        onKeyDown={() => createNewGoal(value)}
        tabIndex="-1"
      >
        {objectives && objectives.length > 0 && (
          <Slider
            marks={objectivesObject}
            onChange={val => setValue(val)}
            value={value}
            max={365}
            tipFormatter={e =>
              convertNumberToDate(e, objectives[0].deadline.seconds)
            }
            tooltipVisible
          />
        )}
      </div>
    </div>
  );
};

/** @param {({icon:string, color: string, setColor: function, setVisbility: function, fontSize: string })} group */
const Objective = ({ icon, color, setColor, setVisbility, fontSize }) => (
  <div
    data-testid="objective"
    onMouseEnter={() => {
      setColor(color);
      setVisbility(true);
    }}
    onMouseLeave={() => {
      setColor(color);
      setVisbility(true);
    }}
  >
    <Icon type={icon} className="rot30" style={{ fontSize }} />
  </div>
);

Objective.propTypes = {
  icon: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  setColor: PropTypes.func.isRequired,
  setVisbility: PropTypes.func.isRequired,
  fontSize: PropTypes.string.isRequired,
};

export const TeamStats = () => (
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
