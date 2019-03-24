import React from 'react';
import { useFireColl } from '../../hooks/firebase';
import {
  calculateTodayDateinDaysFromStartDate,
  convertNumberToDate,
  convertSecondsToDaysFrom,
  objectivesObjectCreator,
} from './helpers';
import { ModalForGoals } from './ModalForGoals';
import { RoadMap } from './RoadMap';
import { TeamStats } from './TeamStats';

export const Stats = () => {
  const goals = useFireColl(`objectives`);
  const [value, setValue] = React.useState(0);
  const [today, setToday] = React.useState(null);
  const [visible, setVisibility] = React.useState(false);
  const objectives = goals.sort(
    (a, b) => a.deadline.seconds - b.deadline.seconds
  );
  const objectivesObject = objectivesObjectCreator(
    objectives,
    convertSecondsToDaysFrom
  );
  React.useEffect(() => {
    const todaysDateInDays =
      objectives &&
      objectives[0] &&
      objectives.length > 0 &&
      calculateTodayDateinDaysFromStartDate(objectives[0].deadline.seconds);
    setToday(todaysDateInDays);
    setValue(todaysDateInDays);
  }, [goals, objectives]);
  return (
    <div data-testid="goalRoad" onMouseLeave={() => setValue(today)}>
      <TeamStats />
      <ModalForGoals
        visible={visible}
        setVisibility={setVisibility}
        value={value}
        objectives={objectives}
      />
      <RoadMap
        setVisibility={setVisibility}
        objectives={objectives}
        objectivesObject={objectivesObject}
        setValue={setValue}
        convertNumberToDate={convertNumberToDate}
        visible={visible}
        value={value}
      />
    </div>
  );
};
