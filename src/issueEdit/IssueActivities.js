import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/activities.css';
import { useNavigate } from 'react-router-dom';

const IssueActivities = ({ issueId }) => {
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://apiadra4.fly.dev/issues/${issueId}`, {
          headers: {
            Accept: 'application/json',
            Authorization: '3b77389e887d6a4689ecdcb2f009ab5d',
          },
        });
        setActivities(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [issueId]);

  if (!Array.isArray(activities)) {
    return null; // or you can render a loading indicator
  }

  return (
    <>
      {activities.map((activity) => {
        let userName = '';
        let userPhoto = '';

        if (activity.user_id === 1) {
          userName = 'Raul Bometon';
          userPhoto = '../sources/user1.png';
        } else if (activity.user_id === 2) {
          userName = 'Adria Espinoza';
          userPhoto = '../sources/user2.png';
        }

        return (
          <article key={activity.id}>
            <div className="activity-container">
              {userPhoto && <img src={userPhoto} alt="Avatar" className="activity-avatar" />}
              <div className="activity-main">
                <div className="activity-data">
                  <span className="activity-creator">{userName}</span>
                  <span className="activity-date">{activity.created_at}</span>
                </div>
                <div className="activity-text-container">
                  <p>
                    <span className="activity-action">{activity.action}</span>
                    <span className="activity-description">{activity.description}</span>
                  </p>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </>
  );
};

export default IssueActivities;
