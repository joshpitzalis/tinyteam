import React from 'react';
import { GoalModal } from './GoalModal';
import { createNewGoal } from './helpers';

export const ModalForGoals = ({
  visible,
  setVisibility,
  value,
  objectives,
}) => (
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
