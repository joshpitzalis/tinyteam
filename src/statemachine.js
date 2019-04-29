const stateMachine = {
  initial: 'loading',
  states: {
    loading: {
      onEntry: 'checkAuth',
      on: {
        AUTH: 'loggedIn',
        NO_AUTH: 'loggedOut',
        ERRORED: 'error',
      },
    },
    dashboard: {
      on: {
        NO_AUTH: 'loggedOut',
      },
      initial: 'idle',
      states: {
        loading: {
          onEntry: 'initalRender',
          on: { LOADED: 'idle' },
        },
        idle: {
          on: {
            NEW_PROJECT_CREATED: 'creating',
            // PROJECT_SELECTED: 'redirect',
            DELETED: 'makingSure',
          },
        },
        makingSure: {
          on: {
            DELETES_FO_SHO: 'deleting',
            JUST_KIDDING: 'idle',
          },
        },
        deleting: {
          onEntry: 'handleDeleteTeam',
          on: {
            DELETED: 'idle',
            ERRORED: 'error',
          },
        },
        creating: {
          onEntry: 'handleCreateNewProject',
          on: {
            CREATED: 'idle',
            ERRORED: 'error',
          },
        },
        redirect: {},
        error: {},
      },
    },
    loggedOut: {
      on: {
        LOGGED_IN: 'loading',
      },
    },
    error: {
      on: {
        RETRIED: 'loading',
        cancel: 'loggedOut',
      },
    },
  },
};

export default stateMachine;
