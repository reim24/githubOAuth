import { useQuery } from '@tanstack/react-query';
import useGetUser from '../../../../hooks/useGetUser';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const user = useGetUser();
  const navigate = useNavigate();
  const queryFn = async () => {
    const response = await axios.get(`repo/starred`);
    return response.data;
  };
  const { data, isLoading } = useQuery({ queryKey: ['starred'], queryFn });
  return (
    <div className='relative isolate px-6 pt-14 lg:px-8'>
      <div className='mx-auto max-w-2xl py-16 sm:py-24 lg:py-32'>
        <div className='flex flex-col items-center text-center'>
          <img
            className='w-48 h-48 lg:w-96 lg:h-96'
            src={user?.avatar_url}
          ></img>
          <h1 className='text-4xl font-bold tracking-tight sm:text-6xl flex items-center text-center'>
            {user?.name}
            <a
              href={user?.html_url}
              className='text-2xl font-bold tracking-tight  sm:text-4xl'
            >
              (@{user?.login})
            </a>
          </h1>
          <p className='mt-6 text-lg leading-8 '></p>
        </div>
      </div>
      <div className='mt-10 flex flex-col'>
        <h2 className='text-2xl font-bold mb-4'>Starred Repositories</h2>
        {isLoading ? (
          <div className='flex justify-center items-center h-64'>
            <div className='animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white-900'></div>
          </div>
        ) : (
          <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {data.map((repo: any) => (
              <li
                key={repo.id}
                className='shadow-md rounded-md p-4 flex items-center border border-white'
              >
                <div className='flex-grow'>
                  <a
                    href={repo.html_url}
                    className='text-blue-500 hover:underline'
                  >
                    {repo.name}
                  </a>
                  <p>{repo.description}</p>
                </div>
                <button
                  onClick={() => {
                    navigate(`/dashboard/repo/${repo.name}`);
                  }}
                  className='ml-4 px-4 py-2 rounded-md'
                >
                  Commit Data
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
