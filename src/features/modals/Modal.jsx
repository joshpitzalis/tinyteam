/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';

let modalRoot = document.getElementById('modal-root');

if (!modalRoot) {
  modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');
  document.body.appendChild(modalRoot);
}

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
          className="w-2/3 mx-56 mt-20 rounded p-4 shadow bg-white relative left-4 top-1"
        >
          <div className="w-100 text-right">
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
