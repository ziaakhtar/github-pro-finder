import React from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({ message }) => {
    return <p className='error-msg'>{message}</p>;
};

export default ErrorMessage;
