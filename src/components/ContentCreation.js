import React, { useState } from 'react';
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
  const [templateFile, setTemplateFile] = useState(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      prompt,
      numImages,
      contentType,
      platforms,
      templateFile: templateFile ? templateFile.name : 'No file chosen',
    });
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
              <option value="informative">Informative</option>
              <option value="inspirational">Inspirational</option>
              <option value="promotional">Promotional</option>
              <option value="educational">Educational</option>
            </select>
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
          </div>
          <div className="form-group">
            <label htmlFor="templateFile">Choose Template</label>
            <input
              type="file"
              id="templateFile"
              onChange={(e) => setTemplateFile(e.target.files[0])}
            />
            <span className="file-name">
              {templateFile ? templateFile.name : 'No file chosen'}
            </span>
          </div>
          <button type="submit" className="post-button">Post</button>
        </form>
      </div>
    </div>
  );
};

export default ContentCreation;