import Slider from 'antd/lib/slider';
import React from 'react';

export const RoadMap = ({
  setVisibility,
  objectives,
  objectivesObject,
  setValue,
  convertNumberToDate,
  visible,
  value,
}) => (
  <div
    role="slider"
    aria-valuemin={1}
    aria-valuemax={7}
    aria-valuenow={2}
    aria-valuetext="Monday"
    className="mw9 center ph3 ph5-ns mb6"
    onDoubleClick={() => setVisibility(true)}
    onKeyDown={() => setVisibility(true)}
    tabIndex="-1"
  >
    {objectives && objectives.length > 0 && (
      <Slider
        marks={objectivesObject}
        onChange={val => setValue(val)}
        value={value}
        max={Number(Object.keys(objectivesObject).pop())}
        tipFormatter={e =>
          `${objectives[0] &&
            convertNumberToDate(e, objectives[0].deadline.seconds)}`
        }
        tooltipVisible={!visible}
      />
    )}
  </div>
);
