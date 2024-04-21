import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <header className='absolute inset-x-0 top-0 z-50'>
        <nav
          className='flex items-center justify-between p-6 px-8'
          aria-label='Global'
        >
          <div className='flex flex-1'>
            <img
              className='-m-1.5 p-1.5 h-8 w-auto'
              src={'/images/logo/github-mark-white.svg'}
              alt='Github Profile'
            />
          </div>
          <div className='flex flex-1 justify-end'>
            <button
              onClick={() => {
                navigate('/logout');
              }}
            >
              Logout
            </button>
          </div>
        </nav>
      </header>
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
