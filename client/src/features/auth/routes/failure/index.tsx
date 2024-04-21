import React from 'react';
import { useNavigate } from 'react-router-dom';

const Failure: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className='flex flex-col gap-4 text-center min-w-full min-h-screen place-items-center justify-center'>
      <h1>Authentication Failed</h1>
      <p>Sorry, the authentication process failed. Please try again.</p>
      <button onClick={handleGoBack}>Go Back to Login</button>
    </div>
  );
};

export default Failure;
