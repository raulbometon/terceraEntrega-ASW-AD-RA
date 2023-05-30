import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './styles/issuesEdit.css'

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
      {/*MAIN*/}
      <div class="main-detail">
        {/*HEADER*/}
        <div class="detail-header">
          <div class="detail-title-wrapper">
            <h2>
              <div class="detail-ref">#{issue.id} </div>
              <div class="detail-subject">{issue.subject}</div>
            </h2>
          </div>
          <div class="detail-project">
            <div class="section-name">Issue</div>
          </div>

        {/*SUBHEADER*/}
          <div>
          Created by
          </div>
        </div>
        <div>Separacion</div>
        {/*DESCRIPTION*/}



        {/*Activities + Comments*/}

    </div>
  </div>
  );
};

export default IssueEdit;
