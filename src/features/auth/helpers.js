import firebase from 'firebase/app';
import { firestore } from '../../utils/firebase';

export const handleInvite = (email, projectId) =>
  firestore
    .collection(`teams`)
    .doc(projectId)
    .update({
      users: firebase.firestore.FieldValue.arrayUnion({ email }),
    })
    .catch(error =>
      console.error('Error inviting someone to a project: ', error)
    );
