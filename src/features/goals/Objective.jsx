import { Menu } from 'grommet';
import { Achievement, Launch } from 'grommet-icons';
import React from 'react';
import { firestore } from '../../utils/firebase';
import { inPast } from './helpers';

/** @param {({
 * details:string,
 * dealine: number,
 * goalId: number
 * })} props */
export const Objective = ({ details, deadline, goalId, color }) => {
  const handleDelete = goalId =>
    firestore
      .doc(`objectives/${goalId}`)
      .delete()
      .then(function() {
        console.log('Document successfully deleted!');
      })
      .catch(function(error) {
        console.error('Error removing document: ', error);
      });

  return (
    <div
      data-testid="objective"
      // onMouseEnter={() => {
      //   //   setColor(color);
      //   // setVisbility(true);
      // }}
      // onMouseLeave={() => {
      //   //   setColor(color);
      //   // setVisbility(true);
      // }}
    >
      <Menu
        icon={
          inPast(deadline) ? <Achievement /> : <Launch color={`${color}`} />
        }
        margin="xsmall"
        size="medium"
        items={[
          { label: <strong>{`${details}`}</strong> },
          {
            label: <small style={{ color: 'red' }}>Delete This Goal</small>,
            onClick: () => handleDelete(goalId),
          },
          // {
          //   label: `Due ${format(new Date(deadline), 'd MMM yyyy')}`,
          //   onClick: () => {},
          // },
          // { label: `${color}`, onClick: () => {} },
        ]}
      />
    </div>
  );
};

// Objective.propTypes = {
//   icon: PropTypes.string.isRequired,
//   color: PropTypes.string.isRequired,
//   setColor: PropTypes.func.isRequired,
//   setVisbility: PropTypes.func.isRequired,
//   fontSize: PropTypes.string.isRequired,
// };
