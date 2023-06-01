import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/watchers.css';
import user1 from '../sources/user1.png';
import user2 from '../sources/user2.png';

const Issuewatchers = ({ issueId }) => {
  const [watchers, setWatchers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://apiadra4.fly.dev/issues/${issueId}/watchers`, {
          headers: {
            Accept: 'application/json',
            Authorization: '3b77389e887d6a4689ecdcb2f009ab5d',
          },
        });
        setWatchers(response.data);
        //console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [issueId]);

  const handleDeleteWatcher = async (watcherId) => {
    try {
      await axios.delete(`https://apiadra4.fly.dev/watchers/${watcherId}`, {
        headers: {
          Accept: 'application/json',
          Authorization: '3b77389e887d6a4689ecdcb2f009ab5d',
        },
      });

      setWatchers((prevWatchers) => prevWatchers.filter((watcher) => watcher.id !== watcherId));
    } catch (error) {
      console.error(error);
    }
  };

  if (!Array.isArray(watchers)) {
    return (
      <div>
      <span>No watchers for the moment</span>
      </div>
      ); // or you can render a loading indicator
  }

  return (
    <div>
      {watchers.map((watcher) => {
        let userName = '';
        let userPhoto = '';

        if (watcher.user_id === 1) {
          userName = 'Raul Bometon';
          userPhoto = user1;
        } else if (watcher.user_id === 2) {
          userName = 'Adria Espinoza';
          userPhoto = user2;
        }

        return (
          <article key={watcher.id}>
            <div className="watcher-container">
              <div className="wathcer-user">
                {userPhoto && <img src={userPhoto} alt="Avatar" className="watcher-avatar" />}
                <span className="watcher-name">{userName}</span>
              </div>
              <button onClick={() => handleDeleteWatcher(watcher.id)} className="delete-button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="delete-button">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default Issuewatchers;
