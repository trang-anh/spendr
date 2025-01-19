import React, { useState } from 'react';
import '../styles/Settings.css';

function Settings({ user, setUser }) {
  const [profileImage, setProfileImage] = useState(user.profileImage);
  const [username, setUsername] = useState(user.username);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result); // Display preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    setUser((prevUser) => ({
      ...prevUser,
      profileImage,
      username,
    }));
    alert('Changes saved successfully!');
  };

  return (
    <div className="settings-page">
      <h1>Settings</h1>

      {/* Profile Picture */}
      <div className="form-group">
        <label htmlFor="profile-image">Profile Picture</label>
        <div className="image-preview">
          <img src={profileImage} alt="Profile" />
        </div>
        <input
          type="file"
          id="profile-image"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

      {/* Username */}
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
        />
      </div>

      <div className="button-group">
        <button className="save-button" onClick={handleSaveChanges}>
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default Settings;
