import React, { useState } from 'react';

const IssueNewWatcher = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIssueNewWatcher = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={toggleIssueNewWatcher}>Add Watchers</button>
      {isOpen && (
        <div className="new-watcher-container">
          <div className="new-watcher">
            <h1>IssueNewWatcher Content</h1>
            <p>This is a pop-up example using React!</p>
            <button onClick={toggleIssueNewWatcher}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueNewWatcher;
