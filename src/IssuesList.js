import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import './styles/issuesList.css'

const IssuesList = () => {
  const [issues, setIssues] = useState([]);
  const navigate = useNavigate();

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("https://apiadra4.fly.dev/issues", {
            headers: {
              Accept: "application/json",
              Authorization: "3b77389e887d6a4689ecdcb2f009ab5d",
            },
          });
          setIssues(response.data);
          //console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
    }, []);

    const handleIssueClick = (issueId) => {
        // Redirigir a la página de edición del issue correspondiente
        navigate(`/issues/${issueId}`);
    };

  return (
    <div>
      <h1>Lista de Issues</h1>
      <ul>
        {issues.map((issue) => (
          <li key={issue.id} onClick={() => handleIssueClick(issue.id)}>
            <div class="issue-container">
            <h2>{issue.subject}</h2>
            <p>{issue.description}</p>
            <p>Due Date: {new Date(issue.due_date).toLocaleString()}</p>
            <p>Blocked: {issue.blocked ? "Yes" : "No"}</p>
            <p>Blocked Reason: {issue.blocked_reason}</p>
            <p>Watchers: {issue.watchers}</p>
            <p>Type: {issue.typeIssue}</p>
            <p>Severity: {issue.severityIssue}</p>
            <p>Priority: {issue.priorityIssue}</p>
            <p>Status: {issue.statusIssue}</p>
            <p>Created By: {issue.createdBy}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IssuesList;