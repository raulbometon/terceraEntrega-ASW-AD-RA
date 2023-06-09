import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import './App.css'
import IssuesList from "./IssuesList";
import IssueEdit from "./IssueEdit";
import NewIssue from "./NewIssue";
import BulkInsert from "./BulkInsert";

const App = () => {
  return (
    <Router>
      <div>
      <div className="improve-issues">
         <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"  target="_blank" rel="noopener noreferrer">
          Improve The Performance
        </a>
      </div>

        <Link to="/new">
          {" "}
          <button> + New Issue </button>{" "}
        </Link>
        <Link to="/bulk">
          {" "}
          <button> Bulk </button>{" "}
        </Link>
        <Routes>
          {" "}
          {/* Use Routes instead of Switch */}
          <Route path="/" element={<IssuesList />} />
          <Route path="/issues/:issueId" element={<IssueEdit />} />
          <Route path="/new" element={<NewIssue />} />
          <Route path="/bulk" element={<BulkInsert />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
