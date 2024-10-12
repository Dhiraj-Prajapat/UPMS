/* eslint-disable react/prop-types */
import { FaUserPlus, FaHistory } from 'react-icons/fa';

const Navbar = ({ onAddUser, onViewHistory }) => {
  return (
    <nav className="navbar">
      <h1>User Profiles</h1>
      <div className="navbar-buttons">
        <button onClick={onAddUser}>
          <FaUserPlus /> Add User
        </button>
        <button onClick={onViewHistory}>
          <FaHistory /> History
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
