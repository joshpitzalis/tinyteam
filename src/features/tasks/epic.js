import { collection } from 'rxfire/firestore';
import { map } from 'rxjs/operators';
import { firestore } from '../../utils/firebase';
import { FETCH_FULFILLED } from './constants';

export const fetchTaskLists = () =>
  collection(firestore.collection('todoLists')).pipe(
    map(docs => docs.map(doc => doc.data())),
    map(data => ({ type: FETCH_FULFILLED, payload: data }))
  );
