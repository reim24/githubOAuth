import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import CalendarHeatmap from 'react-calendar-heatmap';
import { useNavigate, useParams } from 'react-router-dom';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-calendar-heatmap/dist/styles.css';
import './index.css';
import { useState } from 'react';
const CommitHeatmap = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [active, setActive] = useState<{ commits: Array<string> } | null>(null);
  const queryFn = async () => {
    const response = await axios.get(`/repo/${name}/commits`);
    return response.data;
  };
  const { data, isLoading } = useQuery({ queryKey: [`repo/${name}`], queryFn });
  if (isLoading) return <div>Loading...</div>;
  const startDate = new Date();
  startDate.setFullYear(new Date().getFullYear() - 1);
  return (
    <div className='relative isolate px-6 pt-14 lg:px-8'>
      <div className='flex items-center justify-between mb-4 px-6 pt-14 lg:px-8'>
        <div className='flex items-center'>
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            Go Back
          </button>
        </div>
      </div>
      <div className='p-4 rounded-lg shadow'>
        <CalendarHeatmap
          startDate={startDate}
          endDate={new Date()}
          values={data.map((d: any) => ({
            date: new Date(d._id),
            count: d.commits.length,
            id: d._id,
          }))}
          classForValue={(value) => {
            if (!value) {
              return 'color-empty';
            }
            const val = Math.ceil(value.count / 5);
            return `color-github-${val}`;
          }}
          tooltipDataAttrs={(value: { date: Date; count: number }) => {
            if (!value.date) {
              return;
            }

            return {
              'data-tooltip-content': `${
                value.count
              } contributions on ${value.date.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
              })}`,
              'data-tooltip-id': 'my-tooltip',
            };
          }}
          showWeekdayLabels={true}
          onClick={(e) => {
            if (e) {
              setActive(data.find((d: any) => d._id === e.id));
            } else {
              setActive(null);
            }
          }}
        />
        <ReactTooltip id='my-tooltip' />
      </div>
      <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {active?.commits?.map((commit: any) => (
          <li
            key={commit}
            className='shadow-md rounded-md p-4 flex items-center border border-white'
          >
            <div className='flex-grow'>
              <p>{commit}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommitHeatmap;
