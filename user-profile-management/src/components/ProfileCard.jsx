/* eslint-disable react/prop-types */
import { useState } from 'react';

const ProfileCard = ({ user, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveEdit = () => {
    onEdit(editedUser);
    setIsEditing(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditedUser((prevState) => ({ ...prevState, profilePicture: reader.result }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-card">
      {isEditing ? (
        <>
       
          {editedUser.profilePicture && (
            <img src={editedUser.profilePicture} alt="Profile" className="profile-pic" />
          )}
          <input
            type="text"
            value={editedUser.name}
            onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
          />
          <input
            type="email"
            value={editedUser.email}
            onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
          />
          <textarea
            value={editedUser.bio}
            onChange={(e) => setEditedUser({ ...editedUser, bio: e.target.value })}
          />
           <input type="file" accept="image/*" onChange={handleImageUpload} />
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={handleEditToggle}>Cancel</button>
        </>
      ) : (
        <>
          {user.profilePicture && (
            <img src={user.profilePicture} alt="Profile" className="profile-pic" />
          )}
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <p>{user.bio}</p>
          <div className='btn-container'>
          <button onClick={handleEditToggle}>
            <i className="fas fa-edit"></i>
            Edit
          </button>
          <button onClick={() => onDelete(user.id)}>
            <i className="fas fa-trash"></i>
            Delete
          </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileCard;
