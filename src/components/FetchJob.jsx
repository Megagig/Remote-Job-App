import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Navbar from './Navbar';
import {
  findjobs,
  updateJobDetails,
  resetJobDetails,
} from '../redux/jobs/jobsSlice';
import remotejob from '../assets/remotejob.jpg';

const FetchJobs = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.jobs);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(findjobs());
  }, [dispatch]);

  if (!jobs.length) {
    return <div>Loading</div>;
  }

  const handleJobDetails = (jobId) => {
    const job = jobs.find((findjob) => findjob.id === jobId);
    if (job && job.details) {
      dispatch(updateJobDetails(jobId));
    } else {
      dispatch(resetJobDetails(jobId));
    }
    navigate(`/jobdetails/${jobId}`);
  };

  const getJobTitle = (title) => {
    if (title.length > 31) {
      return `${title.slice(0, 31)}...`;
    }
    return title;
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="job-container">
      <Navbar year="2023" text="Remote Job Listings" />
      <div className="viewport desktop-view">
        <img src={remotejob} alt="man" />
        <p>
          Remote jobs have become increasingly popular, offering individuals the
          opportunity to work from anywhere, whether it's their home, a
          different city, or even a different country. This flexibility allows
          for a better work-life balance, as remote workers can tailor their
          schedules to accommodate personal needs.
        </p>
      </div>
      <div className="search">
        <input
          type="text"
          placeholder="Search by job title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
            }
          }}
        />
      </div>
      <ul className="Display">
        {filteredJobs.map((job) => (
          <li key={job.id}>
            <button type="button" onClick={() => handleJobDetails(job.id)}>
              <ArrowCircleRightIcon
                style={{
                  position: 'relative',
                  left: '40%',
                  bottom: '5%',
                  color: '#fff',
                }}
              />
              <img src={job.company_logo} alt={job.company_name} />
              <h2>
                Job Title:
                {getJobTitle(job.title)}
              </h2>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FetchJobs;
