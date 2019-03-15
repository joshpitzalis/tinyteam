import Slider from 'antd/lib/slider';
import React from 'react';
import { useFireColl } from '../../hooks/firebase';
import { GoalModal } from './GoalModal';
import {
  calculateTodayDateinDaysFromStartDate,
  convertNumberToDate,
  convertSecondsToDaysFrom,
  createNewGoal,
} from './helpers';
import { Objective } from './Objective';

export const Stats = () => {
  const goals = useFireColl(`objectives`);

  const [value, setValue] = React.useState(0);
  const [today, setToday] = React.useState(null);
  const [visible, setVisibility] = React.useState(false);
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
          details={objective.details}
          deadline={objective.deadline.seconds}
          goalId={objective.id}
          startDate={objectives[0].deadline.seconds}
          // fontsize={objective.size}
          // color={objective.color}
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
          // <div data-testid="detailsBox" className="w-100 tc pa3">
          //   <h1 style={{ color: `${color}` }}>hello</h1>
          // </div>
          <GoalModal
            onClose={() => setVisibility(false)}
            deadline={value}
            startDate={objectives[0].deadline.seconds}
            createNewGoal={createNewGoal}
          />
        )}
      </div>

      <div
        role="slider"
        aria-valuemin="1"
        aria-valuemax="7"
        aria-valuenow="2"
        aria-valuetext="Monday"
        className="mw9 center ph3 ph5-ns mb6"
        onDoubleClick={() => {
          setVisibility(true);
          // createNewGoal(value, objectives[0].deadline.seconds);
        }}
        onKeyDown={() => setVisibility(true)}
        tabIndex="-1"
        div
      >
        {objectives && objectives.length > 0 && (
          <Slider
            marks={objectivesObject}
            onChange={val => setValue(val)}
            value={value}
            max={Object.keys(objectivesObject).pop()}
            tipFormatter={e =>
              `${convertNumberToDate(e, objectives[0].deadline.seconds)}`
            }
            tooltipVisible={!visible}
          />
        )}
      </div>
    </div>
  );
};
