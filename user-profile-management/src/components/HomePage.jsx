import { useContext, useState } from 'react';
import UserContext from '../context/UserContext';
import Navbar from './Navbar';
import ProfileCard from './ProfileCard';
import './HomePage.css';

const HomePage = () => {
  const { state, dispatch } = useContext(UserContext);
  const [historyVisible, setHistoryVisible] = useState(false);
  const [editHistory, setEditHistory] = useState([]);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', bio: '', profilePicture: '' });

  const handleAddUser = () => {
    setNewUser({ name: '', email: '', bio: '', profilePicture: '' });
    setIsAddingUser(true);
  };

  const handleCloseAddUser = () => {
    setIsAddingUser(false);
  };

  const handleSaveUser = () => {
    if (newUser.name && newUser.email) {
      const userWithId = { ...newUser, id: newUser.id || Date.now() };
      if (newUser.id) {
        // Update existing user
        dispatch({ type: 'UPDATE_USER', payload: userWithId });
      } else {
        // Add new user
        dispatch({ type: 'ADD_USER', payload: userWithId });
      }
      // Add to history
      setEditHistory([...editHistory, userWithId]);
      setIsAddingUser(false);
      setNewUser({ name: '', email: '', bio: '', profilePicture: '' });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewUser((prevState) => ({ ...prevState, profilePicture: reader.result }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const toggleHistory = () => {
    setHistoryVisible(!historyVisible);
  };

  return (
    <div className="homepage">
      <Navbar onAddUser={handleAddUser} onViewHistory={toggleHistory} />

      <div className="profile-cards">
        {state.users.map((user) => (
          <ProfileCard
            key={user.id}
            user={user}
            onEdit={(updatedUser) => {
              dispatch({ type: 'UPDATE_USER', payload: updatedUser });
              setEditHistory([...editHistory, updatedUser]);
            }}
            onDelete={(userId) => dispatch({ type: 'DELETE_USER', payload: userId })}
          />
        ))}
      </div>

      {historyVisible && (
        <div className="history-div">
          <button className="close-btn" onClick={toggleHistory}>X</button>
          <h2>History</h2>
          {editHistory.length === 0 ? (
            <p>No history yet.</p>
          ) : (
            <ul>
              {editHistory.map((user, index) => (
                <li key={index}>
                  <strong>{user.name}</strong> - {user.email} - {user.bio}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {isAddingUser && (
        <div className="add-user-form">
          <div className="form-title">
            <h2>{newUser.id ? 'Edit User' : 'Add New User'}</h2>
            <button className="close-btn" onClick={handleCloseAddUser}>X</button>
          </div>
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <textarea
            placeholder="Bio"
            value={newUser.bio}
            onChange={(e) => setNewUser({ ...newUser, bio: e.target.value })}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <button className="save-btn" onClick={handleSaveUser}>
            {newUser.id ? 'Update User' : 'Save User'}
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
