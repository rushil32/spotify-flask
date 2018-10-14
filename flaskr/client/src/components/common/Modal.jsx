import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ name, header, icon, children }) => (
  <div className="modal fade" id={name} tabIndex="-1" role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <span className="modal-icon">
            <i className="material-icons">{icon}</i>
          </span>
          <h5 className="modal-title">{header}</h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  </div>
);

Modal.defaultProps = {
  name: '',
  header: '',
  icon: 'plus',
  children: <div />,
};

Modal.propTypes = {
  name: PropTypes.string,
  header: PropTypes.string,
  icon: PropTypes.string,
  children: PropTypes.object
};

export default Modal;
