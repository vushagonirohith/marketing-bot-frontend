import React, { useState } from 'react';
import axios from 'axios';
import './ContentCreation.css';

const ContentCreation = ({ user }) => {
  const [prompt, setPrompt] = useState('');
  const [numImages, setNumImages] = useState('');
  const [contentType, setContentType] = useState('');
  const [platforms, setPlatforms] = useState({
    instagram: false,
    x: false,
    linkedin: false,
  });
  const [errors, setErrors] = useState({});
  const [responseMessage, setResponseMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handlePlatformChange = (e) => {
    const { name, checked } = e.target;
    setPlatforms((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSelectAll = () => {
    setPlatforms({
      instagram: true,
      x: true,
      linkedin: true,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!prompt.trim()) {
      newErrors.prompt = 'Marketing theme is required';
    }
    if (!numImages) {
      newErrors.numImages = 'Please select the number of images';
    }
    if (!contentType) {
      newErrors.contentType = 'Please select a content type';
    }
    if (!platforms.instagram && !platforms.x && !platforms.linkedin) {
      newErrors.platforms = 'Please select at least one platform';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const payload = {
          prompt,
          numImages,
          contentType,
          platforms,
        };

        const token = localStorage.getItem('token');

        const response = await axios.post('http://13.233.45.167:5000/content/generate', payload, {  // Updated EC2 IP
        
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        setResponseMessage('Content generated successfully!');
        setIsError(false);
        console.log('Backend Response:', response.data);

        setErrors({});
      } catch (err) {
        setResponseMessage(err.response?.data?.error || 'Failed to generate content.');
        setIsError(true);
      }
    }
  };

  return (
    <div className="content-creation-container">
      <div className="content-creation-box">
        <h1 className="content-creation-header">CraftingBrain Marketing Bot</h1>
        <h2 className="content-creation-subheader">Create Social Media Content</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="prompt">Marketing Theme</label>
            <input
              type="text"
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="E.g., Promote a new eco-friendly product"
              required
            />
            {errors.prompt && <span className="error-message">{errors.prompt}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="numImages">Number of Images</label>
            <select
              id="numImages"
              value={numImages}
              onChange={(e) => setNumImages(e.target.value)}
              required
            >
              <option value="" disabled>Choose number of images</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
            {errors.numImages && <span className="error-message">{errors.numImages}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="contentType">Content Type</label>
            <select
              id="contentType"
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              required
            >
              <option value="" disabled>Choose content type</option>
              <option value="Informative">Informative</option>
              <option value="Inspirational">Inspirational</option>
              <option value="Promotional">Promotional</option>
              <option value="Educational">Educational</option>
            </select>
            {errors.contentType && <span className="error-message">{errors.contentType}</span>}
          </div>
          <div className="form-group">
            <label>Platforms</label>
            <div className="platform-checkboxes">
              <label>
                <input
                  type="checkbox"
                  name="instagram"
                  checked={platforms.instagram}
                  onChange={handlePlatformChange}
                />
                Instagram
              </label>
              <label>
                <input
                  type="checkbox"
                  name="x"
                  checked={platforms.x}
                  onChange={handlePlatformChange}
                />
                X
              </label>
              <label>
                <input
                  type="checkbox"
                  name="linkedin"
                  checked={platforms.linkedin}
                  onChange={handlePlatformChange}
                />
                LinkedIn
              </label>
              <button
                type="button"
                className="select-all-button"
                onClick={handleSelectAll}
              >
                All
              </button>
            </div>
            {errors.platforms && <span className="error-message">{errors.platforms}</span>}
          </div>
          <button type="submit" className="post-button">Post</button>
        </form>
        {responseMessage && (
          <p className={isError ? 'response-error' : 'response-success'}>
            {responseMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default ContentCreation;
