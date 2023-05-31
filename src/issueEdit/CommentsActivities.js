import React, { useState } from 'react';
import './styles/comments.css'
import './styles/activities.css'

const CommentsActivities = () => {
  const [showComments, setShowComments] = useState(true);
  const [showActivities, setShowActivities] = useState(false);

  const handleCommentsButtonClick = () => {
    setShowComments(true);
    setShowActivities(false);
  };

  const handleActivitiesButtonClick = () => {
    setShowComments(false);
    setShowActivities(true);
  };

  return (
    <div>
      <div className="comments-activitties-buttons">
        <button id="comments-button" className="comments-button" onClick={handleCommentsButtonClick}>
          Comments
        </button>
        <button
          id="activities-button"
          className="activities-button"
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

      <div id="activities" className="activity-container" style={{ display: showActivities ? 'block' : 'none' }}>
        ACTIVITIES GET
      </div>
    </div>
  );
};

export default CommentsActivities;
