import Slider from 'antd/lib/slider';
import React from 'react';
import { useFireColl } from '../../hooks/firebase';
import { GoalModal } from './GoalModal';
import { calculateTodayDateinDaysFromStartDate, convertNumberToDate, convertSecondsToDaysFrom, createNewGoal, objectivesObjectCreator } from './helpers';
import { TeamStats } from './TeamStats';

export const Stats = () => {
  const goals = useFireColl(`objectives`);

  const [value, setValue] = React.useState(0);
  const [today, setToday] = React.useState(null);
  const [visible, setVisibility] = React.useState(false);

  const objectives = goals.sort((a, b) => a.deadline.seconds - b.deadline.seconds);
  const objectivesObject = objectivesObjectCreator(objectives, convertSecondsToDaysFrom)

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
      <TeamStats />
      <div className="h3 flex align-items">
        {visible && (<GoalModal
            onClose={() => setVisibility(false)}
            deadline={value}
            startDate={objectives[0].deadline.seconds}
            createNewGoal={createNewGoal}
          />
        )}
      </div>
      <RoadMap setVisibility={setVisibility} objectives={objectives} objectivesObject={objectivesObject} setValue={setValue} convertNumberToDate={convertNumberToDate} visible={visible} value={value}/>
    </div>
  );
};


const RoadMap = ({setVisibility, objectives, objectivesObject, setValue, convertNumberToDate, visible, value}) => <div
role="slider"
aria-valuemin="1"
aria-valuemax="7"
aria-valuenow="2"
aria-valuetext="Monday"
className="mw9 center ph3 ph5-ns mb6"
onDoubleClick={() => setVisibility(true)}
onKeyDown={() => setVisibility(true)}
tabIndex="-1">
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