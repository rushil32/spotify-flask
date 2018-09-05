import React from 'react';

const Comment = ({ body, author, date, primary=false }) => {
  return (
    <li className={`comment ${primary ? 'primary' : 'default'}`}>
      <img src={author.img} />
      <div>
        <p><span className="comment__author">{author.name}</span>{body}</p>
        <p className="comment__date">{date}</p>
      </div>
    </li>
  );
};
 
export default Comment;