import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Navbar from './Navbar';

const FetchJobDetails = () => {
  const newJob = useSelector((state) =>
    state.jobs.jobs.filter((job) => job.details === true)
  );
  const jobDetails = newJob;

  return (
    <div className="content-box">
      <Navbar text="Job Details" />
      <ul>
        {jobDetails.map((details) => (
          <>
            <div className="viewport detail-view">
              <img src={details.company_logo} alt={details.company_name} />
              <h2>
                Company Name:
                {details.company_name}
              </h2>
            </div>
            <li key={details.id}>
              <h2>
                <span>Job Title: </span>
                <span>{details.title}</span>
                <span>
                  <ArrowCircleRightIcon />
                </span>
              </h2>
              <h2>
                <span>Job Type: </span>
                <span>{details.job_type}</span>
                <span>
                  <ArrowCircleRightIcon />
                </span>
              </h2>
              <h2>
                <span>Job Date:</span>
                <span>{details.publication_date}</span>
                <span>
                  <ArrowCircleRightIcon />
                </span>
              </h2>
              <h2>
                <span>Salary:</span>
                <span>
                  {details.salary ? details.salary : 'Salary not provided'}
                </span>
                <span>
                  <ArrowCircleRightIcon />
                </span>
              </h2>
              <h2>
                <span>Location:</span>
                <span>{details.candidate_required_location}</span>
                <span>
                  <ArrowCircleRightIcon />
                </span>
              </h2>
              <h2>
                <span>Website:</span>
                <Link to={details.url} style={{ color: '#fff' }}>
                  Visit Link
                </Link>
                <span>
                  <ArrowCircleRightIcon />
                </span>
              </h2>
            </li>
          </>
        ))}
      </ul>
    </div>
  );
};

export default FetchJobDetails;
