import React from 'react';
import "../Styles/ErrorMessage.css";

const ErrorMessage = (): JSX.Element => {
  return (
    <div className='error-message'>
      <img src="https://media.giphy.com/media/l46Cl6JOKu0fbiR3O/giphy.gif" alt="sock puppet drinking beer"></img>
      <h1>Something went wrong, please try again!</h1>
    </div>
  )
}

export default ErrorMessage;
