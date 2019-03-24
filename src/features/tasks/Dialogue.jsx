import React from 'react';
import Modal from '../modals/Modal';
import { ListCreator } from './ListCreator';
import { ListEditor } from './ListEditor';

export const Dialogue = ({ modalVisible, id, dispatch, listId }) =>
  modalVisible && (
    <Modal
      onClose={() =>
        id
          ? dispatch({ type: 'EDITOR_MODAL_CLOSED' })
          : dispatch({ type: 'MODAL_CLOSED' })
      }
    >
      {id ? (
        <ListEditor dispatch={dispatch} listId={listId} />
      ) : (
        <ListCreator dispatch={dispatch} />
      )}
    </Modal>
  );
