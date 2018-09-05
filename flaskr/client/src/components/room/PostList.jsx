import React from 'react';
import iconBored from '../../assets/icon-bored.svg';

import Post from './Post';

const PostList = ({ posts = [], ready=false, updatePosts }) => {
  if (!ready) {
    return (<div className="spinner-1"></div>);
  }

  if (!posts.length) {
    return (
      <div className="post-list__message">
        <img src={iconBored} alt="No Tracks available"/>
        <p>Looks like this playlist is empty, try adding some tracks</p>
      </div>
    );
  }

  return (
    <div className="post-list">
      <ul>
        {posts.map(post => (
          <div key={post.id}>
            <Post data={post} updatePosts={updatePosts} />
          </div>
        ))}
      </ul>
    </div>
  );
};
 
export default PostList;