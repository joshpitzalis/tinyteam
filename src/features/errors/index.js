import { captureException, showReportDialog, withScope } from '@sentry/browser';
import React from 'react';

class ErrorBoundary extends React.Component {
  state = { error: null, eventId: null };

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    withScope(scope => {
      scope.setExtras(errorInfo);
      const eventId = captureException(error);
      this.setState({ eventId });
    });
  }

  render() {
    if (this.state.error) {
      // render user feedback error modal UI
      return showReportDialog({ eventId: this.state.eventId });
    }
    // when there's not an error, render children untouched
    return this.props.children;
  }
}

export default ErrorBoundary;
