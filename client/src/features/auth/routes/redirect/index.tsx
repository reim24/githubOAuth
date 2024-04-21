import React, { useEffect } from 'react';
import { me } from '../../api';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../app/hooks';
import { set } from '../../stores/userSlice';

const RedirectPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    me().then((user) => {
      if (user) {
        dispatch(set(user));
        navigate('/dashboard');
      } else {
        navigate('/auth/failure');
      }
    });
  }, []);

  return <div>Redirecting...</div>;
};

export default RedirectPage;
