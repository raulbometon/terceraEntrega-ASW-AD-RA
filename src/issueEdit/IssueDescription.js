import React, { useState } from 'react';

const IssueDescription = ({ issueId, description }) => {
  const [desc_active, setDescActive] = useState(false);
  const [desc_send, setDescSend] = useState('');
  const [desc, setDesc] = useState(description); // Set initial value of `desc` to `description`

  const handleClick = () => {
    setDescActive(true);
  };

  const handleChange = (e) => {
    setDesc(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDescSend(desc);
    setDescActive(false);
    setDesc('');
  };

  return (
    <div className="">
      {desc_active ? (
        <form onSubmit={handleSubmit}>
          <input type="text" value={desc} onChange={handleChange} />
          <button type="submit">Enviar</button>
        </form>
      ) : (
        <div onClick={handleClick}>
          {desc_send ? (
            <div>{desc_send}</div>
          ) : (
            <div className="description-placeholder">
              {description || 'Empty space is so boring... go on, be descriptive...'}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default IssueDescription;
