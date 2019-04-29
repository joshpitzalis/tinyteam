import React from 'react';
// import { Skeleton } from 'react-loading-skeleton-placeholders';
import { connect } from 'react-redux';
import { createNewTeam, deleteTeam } from '../features/auth/authOperations';
import { CreateProject } from '../features/auth/components/CreateProject';
import { Projects } from '../features/auth/components/Projects';

class Dashboard extends React.Component {
  static propTypes = {};

  static defaultProps = {};

  handleCreateNewProject = name => {
    const { handleCreateNewTeam, myUserDetails } = this.props;
    handleCreateNewTeam(myUserDetails, name);
  };

  handleDeleteTeam = async (uid, projectId) => {
    const { handleDeleteTeam } = this.props;
    try {
      await handleDeleteTeam(uid, projectId);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const {
      projects,
      handleDeleteTeam,
      noProjects,
      history,
      myUserDetails,
    } = this.props;

    return (
      <div data-testid="dashboardPage">
        <CreateProject handleCreateNewProject={this.handleCreateNewProject} />
        <Projects
          projects={projects}
          noProjects={noProjects}
          history={history}
          handleDeleteTeam={handleDeleteTeam}
          uid={myUserDetails.uid}
        />
      </div>
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
  noProjects: store.auth && store.auth.noProjects,
});

const actions = {
  handleCreateNewTeam: createNewTeam,
  handleDeleteTeam: deleteTeam,
};

export default connect(
  select,
  actions
)(Dashboard);
