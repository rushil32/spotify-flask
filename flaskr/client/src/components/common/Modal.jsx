import React from 'react';

const Modal = ({ name, header, icon, children }) => {
  return (
    <div className="modal fade" id={name} tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <span class="modal-icon">
                <i class="material-icons">{icon}</i>
              </span>
              <h5 class="modal-title">{header}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              {children}
            </div>
          </div>
        </div>
      </div>
  );
}
 
export default Modal;
