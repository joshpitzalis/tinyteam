import React, { Component } from 'react';

export default class DeleteButton extends Component {
  state = {
    isDeleting: false,
  };

  x = () => this.setState({ isDeleting: true });

  y = () => this.setState({ isDeleting: false });

  render() {
    return this.state.isDeleting ? (
      <>
        <h2>Are you sure you want to delete the file permanently ?</h2>
        <button
          type="button"
          className="f7 grow no-underline br-pill ph3 pv2 mb2 dib white bg-red "
          data-testid="confirmButton"
          onClick={() => {
            this.props.handleDelete(this.props.item, this.props.teamName);
          }}
        >
          Yes, I'm dead sure
        </button>
        <button
          type="button"
          onClick={() => {
            this.y();
          }}
        >
          {' '}
          No{' '}
        </button>
      </>
    ) : (
      <button
        type="button"
        className="f7 grow no-underline br-pill ph3 pv2 mb2 dib white bg-red "
        data-testid="deleteButton"
        onClick={() => {
          this.x();
        }}
      >
        Delete
      </button>
    );
  }
}
