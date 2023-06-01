import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/activities.css';
import user1 from '../sources/user1.png';
import user2 from '../sources/user2.png';

const IssueActivities = ({ issueId }) => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://apiadra4.fly.dev/issues/${issueId}/activities`, {
          headers: {
            Accept: 'application/json',
            Authorization: '3b77389e887d6a4689ecdcb2f009ab5d',
          },
        });
        setActivities(response.data);
        //console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [issueId]);

  if (!Array.isArray(activities)) {
    return (
      <div>
      <span>No activities for the moment</span>
      </div>
      ); // or you can render a loading indicator
  }

  return (
    <div>
      {activities.map((activity) => {
        let userName = '';
        let userPhoto = '';

        if (activity.user_id === 1) {
          userName = 'Raul Bometon';
          userPhoto = user1;
        } else if (activity.user_id === 2) {
          userName = 'Adria Espinoza';
          userPhoto = user2;
        }

        return (
          <article key={activity.id}>
            <div className="activity-container">
              {userPhoto && <img src={userPhoto} alt="Avatar" className="activity-avatar" />}
              <div className="activity-main">
                <div className="activity-data">
                  <span className="activity-creator">{userName}</span>
                  <span className="activity-date">{new Date(activity.created_at).toLocaleDateString('en-US',
                    { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
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
    </div>
  );
};

export default IssueActivities;
