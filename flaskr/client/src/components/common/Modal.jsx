import React from 'react';

const Modal = ({ name, header, icon, children }) => {
  return (
    <div className="modal fade" id={name} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <span className="modal-icon">
                <i className="material-icons">{icon}</i>
              </span>
              <h5 className="modal-title">{header}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {children}
            </div>
          </div>
        </div>
      </div>
  );
}
 
export default Modal;
