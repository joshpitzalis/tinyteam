import { hacker } from 'faker';
import { firestore } from '../../utils/firebase';
import { setMyProjects } from './authReducer';

export const fetchUserProjects = uid => dispatch =>
  firestore
    .collection('teams')
    .where('members', 'array-contains', uid)
    .get()
    .then(snap => {
      const projects = [];
      snap.forEach(doc => projects.push(doc.data()));
      dispatch(setMyProjects(projects));
    })
    .catch(error => console.error('Error getting user projects: ', error));

export const createNewTeam = user => dispatch => {
  const newProjectName = `${hacker.verb()} ${hacker.adjective()} ${hacker.noun()}`;

  return firestore
    .collection(`teams`)
    .doc(newProjectName)
    .set({
      created: new Date(),
      id: newProjectName,
      members: [user.uid],
      users: [user],
    })
    .then(dispatch(fetchUserProjects(user.uid)))
    .catch(error => console.error('Error creating a new project: ', error));

  // tk when you ceate a new project there shoudl be some kind fo toast or notificatiosn that it is done
};

export const deleteTeam = (uid, projectId) => dispatch =>
  firestore
    .collection(`teams`)
    .doc(projectId)
    .delete()
    .then(dispatch(fetchUserProjects(uid)))
    .catch(error => console.error('Error creating a new project: ', error));

// tk when you ceate a new project there shoudl be some kind fo toast or notificatiosn that it is done
