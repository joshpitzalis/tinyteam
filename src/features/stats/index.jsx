import Slider from 'antd/lib/slider';
import React from 'react';
import { useFireColl } from '../../hooks/firebase';
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

  const objectives = goals.sort(
    (a, b) => a.deadline.seconds - b.deadline.seconds
  );
  console.log('objectives', objectives);
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
          // color={objective.color}
          goalId={objective.id}
          startDate={objectives[0].deadline.seconds}
          // fontsize={objective.size}
        />
      ),
    };
    return total;
  }, {});

  console.log('objectivesObject', objectivesObject);

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
        {/* {visible && (
          <div data-testid="detailsBox" className="w-100 tc pa3">
            <h1 style={{ color: `${color}` }}>hello</h1>
          </div>
        )} */}
      </div>

      <div
        role="slider"
        aria-valuemin="1"
        aria-valuemax="7"
        aria-valuenow="2"
        aria-valuetext="Monday"
        className="mw9 center ph3 ph5-ns mb6"
        onDoubleClick={() =>
          createNewGoal(value, objectives[0].deadline.seconds)
        }
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
              `${convertNumberToDate(e, objectives[0].deadline.seconds)}`
            }
            tooltipVisible
          />
        )}
      </div>
    </div>
  );
};
