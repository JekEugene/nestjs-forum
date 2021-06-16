import React from 'react';
const Alert = (props) => {

  let alertClass = ''
  let msg = ''
  if (props.type === "success") {
    alertClass = "alert alert-success"
    msg = "Well done!"
  }
  if (props.type === "error") {
    alertClass = "alert alert-danger"
    msg = "error"
  }
  if (props.type === "hide"){
    return null
  }

  if(alertClass){
    return(
      <div class="fixed-bottom">
        <div className={alertClass} role="alert">
          <strong>{msg}</strong> {props.msg}.
        </div>
      </div>
    )
  } else return null
};

export default Alert;