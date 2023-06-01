import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/watchers.css';
import user1 from '../sources/user1.png';
import user2 from '../sources/user2.png';

const IssueNewWatcher = ({issueId}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIssueNewWatcher = () => {
    setIsOpen(!isOpen);
  };
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

  const handlePostWatcher = async (user_id) => {
    try {
      await axios.post(`https://apiadra4.fly.dev/issues/${issueId}/watchers`, {
          user_id: user_id,
          issue_id: issueId
        },
        {
          headers: {
            Accept: 'application/json',
            Authorization: '3b77389e887d6a4689ecdcb2f009ab5d'
          }
      });
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="add-watchers-container">
    <button onClick={toggleIssueNewWatcher} className="add-watchers-button">Add Watchers</button>
    {isOpen && (
      <div className="new-watcher-container">
        <div className="new-watcher">
          {watchers.length === 2 ? (
            <h1>All users are watching this issue</h1>
          ) : (
            <>
              <h1>Add your watchers</h1>
              {!watchers.some(watcher => watcher.user_id === 1) && (
                <div className="watcher-container">
                  <div className="wathcer-user">
                    {user1 && <img src={user1} alt="Avatar" className="watcher-avatar" />}
                    <span className="watcher-name">Raul Bometon</span>
                  </div>
                  <button onClick={() => handlePostWatcher(1)} className="add-button" value="ADD">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </button>
                </div>
              )}
              {!watchers.some(watcher => watcher.user_id === 2) && (
                <div className="watcher-container">
                  <div className="wathcer-user">
                    {user2 && <img src={user2} alt="Avatar" className="watcher-avatar" />}
                    <span className="watcher-name">Adria Espinoza</span>
                  </div>
                  <button onClick={() => handlePostWatcher(2)} className="add-button" value="ADD">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </button>
                </div>
              )}
            </>
          )}
          <button onClick={toggleIssueNewWatcher}>Close</button>
        </div>
      </div>
    )}
  </div>
  );

};

export default IssueNewWatcher;
