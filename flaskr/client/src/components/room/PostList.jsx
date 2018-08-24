import React from 'react';
import iconBored from '../../assets/icon-bored.svg';

const PostList = ({ posts = [], ready=false }) => {
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
          <li>
            <img src={post.album_cover_md} />
            <div>
              <span>{post.track_name}</span>
              <span>{post.artist}</span>
            </div>
          </li> 
        ))}
      </ul>
    </div>
  );
};
 
export default PostList;