import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import IssuesList from './IssuesList';
import IssueEdit from './IssueEdit';

const App = () => {
  return (
    <Router>
      <div>
        <Routes> {/* Use Routes instead of Switch */}
          <Route path="/" element={<IssuesList />} />
          <Route path="/issues/:issueId" element={<IssueEdit />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
