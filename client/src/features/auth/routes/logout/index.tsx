import React, { useEffect } from 'react';

const Logout: React.FC = () => {
  useEffect(() => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/logout`;
  }, []);

  return null;
};

export default Logout;
