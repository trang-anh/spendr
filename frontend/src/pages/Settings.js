import React, { useState } from 'react';
import '../styles/Settings.css';

function Settings({ user, setUser }) {
  const [profileImage, setProfileImage] = useState(user.profileImage || '/default-profile.png'); // Default image fallback
  const [username, setUsername] = useState(user.username);
  const [error, setError] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        setError('Please upload a valid image (JPG, PNG, or GIF).');
        return;
      }

      // Validate file size (2MB max)
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        setError('File size exceeds 2MB. Please upload a smaller image.');
        return;
      }

      // Read and preview the image
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result); // Display preview
        setError(''); // Clear error if any
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    // Update user data
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
          <img
            src={profileImage}
            alt="Profile"
            className="profile-image"
          />
        </div>
        <input
          type="file"
          id="profile-image"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

      {/* Display Error Message */}
      {error && <p className="error-message">{error}</p>}

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
