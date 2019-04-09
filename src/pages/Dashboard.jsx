import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'rebass';

const propTypes = {};

const defaultProps = {};

const Dashboard = ({ projects }) => (
  <div data-testid="dashboard">
    Dashboard
    {projects &&
      projects.map(project => (
        <Card
          fontSize={6}
          fontWeight="bold"
          width={[1, 1, 1 / 2]}
          p={5}
          my={5}
          bg="#f6f6ff"
          borderRadius={8}
          boxShadow="0 2px 16px rgba(0, 0, 0, 0.25)"
        >
          {project.id}
        </Card>
      ))}
  </div>
);

const getProjects = store => store.auth && store.auth.projects;

const select = store => ({
  projects: getProjects(store),
});

export default connect(select)(Dashboard);

Dashboard.propTypes = propTypes;
Dashboard.defaultProps = defaultProps;
