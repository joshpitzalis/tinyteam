import React from 'react';
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component {
  el = document.createElement('div');
  componentDidMount() {
    modalRoot.appendChild(this.el);
  }
  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }
  render() {
    return ReactDOM.createPortal(
      <div
        // onClick={this.props.onClose}
        className="vh-100 vw-100 absolute--fill fixed bg-black-60 overflow-container
        "
      >
        <div
          className="center mw9 ma3 ma5-ns br2 pa3 shadow-1"
          style={{
            background: '#f4f2e8'
          }}
        >
          <div className="w-100 tr">
            <button className="pointer" onClick={this.props.onClose}>
              Close
            </button>
          </div>
          {this.props.children}
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
