import React from 'react';
import { State, withStateMachine } from 'react-automata';
import { connect } from 'react-redux';
import { Button, Card, Text } from 'rebass';
import { createNewTeam, deleteTeam } from '../features/auth/authOperations';

const dashboardStatemachine = {
  initial: 'loading',
  states: {
    loading: {
      onEntry: 'initalRender',
      on: { LOADED: 'idle' },
    },
    idle: {
      on: {
        NEW_PROJECT_CREATED: 'creating',
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
    error: {},
  },
};

class Dashboard extends React.Component {
  static propTypes = {};

  static defaultProps = {};

  initalRender = () => this.props.transition('LOADED');

  handleCreateNewProject = () => {
    const { handleCreateNewTeam, myUserDetails } = this.props;
    handleCreateNewTeam(myUserDetails);
  };

  handleDeleteTeam = async () => {
    const {
      handleDeleteTeam,
      projectId,
      transition,
      myUserDetails,
    } = this.props;
    try {
      await handleDeleteTeam(myUserDetails.uid, projectId);
      transition('DELETED');
    } catch (error) {
      console.error(error);
      transition('ERRORED', { error });
    }
  };

  render() {
    const { projects, transition, machineState, projectId } = this.props;
    return (
      <React.Fragment>
        <State is={['loading', 'creating', 'deleting']}>
          {`${machineState.value.replace(/^./, str => str.toUpperCase())}...`}
        </State>
        <State is={['idle', 'makingSure']}>
          <div data-testid="dashboard">
            <Button
              data-testid="createNewProject"
              onClick={() => this.handleCreateNewProject()}
              className="pointer"
            >
              Create a new Team
            </Button>
            <div className="flex wrap">
              {projects &&
                projects.map(project => (
                  <Card
                    key={project.id}
                    fontSize={6}
                    fontWeight="bold"
                    width={[1, 1, 1 / 2]}
                    p={5}
                    m={5}
                    bg="#f6f6ff"
                    borderRadius={8}
                    boxShadow="0 2px 16px rgba(0, 0, 0, 0.25)"
                  >
                    <Text lineHeight={1}>{project.id}</Text>

                    <State is="idle">
                      <Button
                        bg="red"
                        onClick={() =>
                          transition('DELETED', { projectId: project.id })
                        }
                      >
                        Delete
                      </Button>
                    </State>

                    {project.id === projectId && (
                      <State is="makingSure">
                        <Text lineHeight={1}>
                          You absolutely sure about this?
                        </Text>
                        <Button
                          bg="red"
                          onClick={() => transition('DELETES_FO_SHO')}
                        >
                          DELETE FO SHO !
                        </Button>
                        <Button onClick={() => transition('JUST_KIDDING')}>
                          Just Kidding
                        </Button>
                      </State>
                    )}
                  </Card>
                ))}
            </div>
          </div>
        </State>
        <State is="error">Error!</State>
      </React.Fragment>
    );
  }
}

const getProjects = store => store.auth && store.auth.projects;

const getUser = store =>
  store.auth &&
  store.auth.user && {
    uid: store.auth.user.uid,
    photoURL: store.auth.user.photoURL,
    name: store.auth.user.displayName,
  };

const select = store => ({
  projects: getProjects(store),
  myUserDetails: getUser(store),
});

const actions = {
  handleCreateNewTeam: createNewTeam,
  handleDeleteTeam: deleteTeam,
};

export default connect(
  select,
  actions
)(withStateMachine(dashboardStatemachine)(Dashboard));
