import React, { useState } from 'react';
import './styles/comments.css'
import './styles/activities.css'
import IssueActivities from './IssueActivities.js'

const CommentsActivities = ({issueId}) => {
  const [showComments, setShowComments] = useState(true);
  const [showActivities, setShowActivities] = useState(false);
  const [isActiveButton, setIsActiveButton] = useState(true);

  const handleCommentsButtonClick = () => {
    setShowComments(true);
    setShowActivities(false);
    setIsActiveButton(true);
  };

  const handleActivitiesButtonClick = () => {
    setShowComments(false);
    setShowActivities(true);
    setIsActiveButton(false);
  };

  return (
    <div>
      <div className="comments-activitties-buttons">
        <button
          id="comments-button"
          className={`comments-button ${isActiveButton ? 'button-active' : ''}`} // Aplicar la clase CSS si el botón está activo
          onClick={handleCommentsButtonClick}
        >
          Comments
        </button>
        <button
          id="activities-button"
          className={`activities-button ${isActiveButton ? '' : 'button-active'}`} // Aplicar la clase CSS si el botón está inactivo
          style={{ marginLeft: '5px' }}
          onClick={handleActivitiesButtonClick}
        >
          Activities
        </button>
      </div>

      <div id="comments" style={{ display: showComments ? 'block' : 'none' }}>
        <div>
          COMMENTS POST
        </div>
        <div>
          COMMENTS GET
        </div>
      </div>

      <div id="activities" style={{ display: showActivities ? 'block' : 'none' }}>
        <IssueActivities issueId = {issueId}/>
      </div>
    </div>
  );
};

export default CommentsActivities;
