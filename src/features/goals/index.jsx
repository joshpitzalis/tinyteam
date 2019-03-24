import Slider from 'antd/lib/slider';
import React from 'react';
import { useFireColl } from '../../hooks/firebase';
import { GoalModal } from './GoalModal';
import {
  calculateTodayDateinDaysFromStartDate,
  convertNumberToDate,
  convertSecondsToDaysFrom,
  createNewGoal,
  objectivesObjectCreator,
} from './helpers';
import { TeamStats } from './TeamStats';

const objectives = goals =>
  goals.sort((a, b) => a.deadline.seconds - b.deadline.seconds);
const objectivesObject = goals =>
  objectivesObjectCreator(objectives(goals), convertSecondsToDaysFrom);

export const Stats = () => {
  const goals = useFireColl(`objectives`);
  const [value, setValue] = React.useState(0);
  const [today, setToday] = React.useState(null);
  const [visible, setVisibility] = React.useState(false);

  React.useEffect(() => {
    const todaysDateInDays =
      objectives(goals) &&
      objectives(goals).length > 0 &&
      objectives[0] &&
      calculateTodayDateinDaysFromStartDate(objectives[0].deadline.seconds);
    setToday(todaysDateInDays);
    setValue(todaysDateInDays);
  }, [goals]);

  return (
    <div data-testid="goalRoad" onMouseLeave={() => setValue(today)}>
      <TeamStats />
      <ModalForGoals
        visible={visible}
        setVisibility={setVisibility}
        value={value}
      />
      <RoadMap
        setVisibility={setVisibility}
        objectives={objectives}
        objectivesObject={objectivesObject(goals)}
        setValue={setValue}
        convertNumberToDate={convertNumberToDate}
        visible={visible}
        value={value}
      />
    </div>
  );
};

const ModalForGoals = ({ visible, setVisibility, value }) => (
  <div className="h3 flex align-items">
    {visible && (
      <GoalModal
        onClose={() => setVisibility(false)}
        deadline={value}
        startDate={objectives[0].deadline.seconds}
        createNewGoal={createNewGoal}
      />
    )}
  </div>
);

const RoadMap = ({
  setVisibility,
  objectives,
  objectivesObject,
  setValue,
  convertNumberToDate,
  visible,
  value,
}) =>
  objectives &&
  objectives.length > 0 && (
    <div
      role="slider"
      aria-valuemin="1"
      aria-valuemax="7"
      aria-valuenow="2"
      aria-valuetext="Monday"
      className="mw9 center ph3 ph5-ns mb6"
      onDoubleClick={() => setVisibility(true)}
      onKeyDown={() => setVisibility(true)}
      tabIndex="-1"
    >
      <Slider
        marks={objectivesObject}
        onChange={val => setValue(val)}
        value={value}
        max={Object.keys(objectivesObject).pop()}
        tipFormatter={e =>
          `${objectives[0] &&
            convertNumberToDate(e, objectives[0].deadline.seconds)}`
        }
        tooltipVisible={!visible}
      />
    </div>
  );
