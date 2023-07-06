import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import MicIcon from '@mui/icons-material/Mic';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const Navbar = ({ text, year }) => (
  <nav>
    <ul>
      <li className="behind">
        <Link to="/" style={{ color: '#fff' }}>
          <KeyboardArrowLeftIcon style={{ fontSize: '2.5em' }} />
        </Link>
        {year}
      </li>
      <li className="hidden">{text}</li>
      <li className="organise">
        <div>
          <MicIcon />
        </div>
        <div className="divider">
          <SettingsIcon />
        </div>
      </li>
    </ul>
  </nav>
);

Navbar.propTypes = {
  text: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
};

export default Navbar;
