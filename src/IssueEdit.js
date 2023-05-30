import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const IssueEdit = () => {
  const [issue, setIssue] = useState(null);
  const { issueId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://apiadra4.fly.dev/issues/${issueId}`, {
          headers: {
            Accept: "application/json",
            Authorization: "3b77389e887d6a4689ecdcb2f009ab5d",
          },
        });
        setIssue(response.data);
        //console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [issueId]);

  if (!issue) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Editar issue</h1>
      <h2>{issue.subject}</h2>
      <p>{issue.description}</p>
      {/* Agrega aquí los campos y lógica de edición */}
    </div>
  );
};

export default IssueEdit;
