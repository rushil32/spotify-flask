import React, { Component } from 'react';
import Comment from './Comment';
import { withRouter } from 'react-router'

import { commentOnPost } from '../../util/room';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInput: false,
      comment: '',
    };
  }

  toggleInput = () => {
    this.setState(prevState => ({
      showInput: !prevState.showInput
    }));
  }

  handleKeyPress = async (event) => {
    if(event.key == 'Enter' && this.state.comment.length) {
      const roomId = this.props.match.params.id;
      const postId = this.props.data.id;
      const { comment } = this.state;
      const updatedPosts = await commentOnPost(postId, roomId, comment);

      this.setState({ comment: '' });
      this.props.updatePosts(updatedPosts);
    }
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({ [name]: value });
  }

  render() { 
    if (!this.props.data.id) return (<p>Loading...</p>);

    const { 
      album_cover_md, 
      track_name, 
      artist, 
      body, 
      display_image, 
      full_name, 
      created,
      comments
    } = this.props.data;

    const author = {
      name: full_name,
      img: display_image
    };

    return (
      <li className="post">
        { body && (
          <Comment 
            primary={true}
            body={body}
            author={author}
            date={created}
          />
        )}
        <div className="post__track">
          <div className="post__track__info">
            <img src={album_cover_md} />
            <div>
              <span>{track_name}</span>
              <span>{artist}</span>
            </div>
          </div>
          <div className="post__track__options">
            <i class="material-icons" onClick={this.toggleInput}>mode_comment</i>
            <i class="material-icons">more_horiz</i>
          </div>
        </div>
        <div className="post__comments">
          <ul>
            { comments.length > 0 && comments.map((comment) => (
              <Comment
                body={comment.body}
                author={{
                  img: comment.display_image,
                  name: comment.full_name
                }}
                date={comment.created}
              />
            )) }
          </ul>
          { this.state.showInput && (
            <div className="post__comments__input">
              <input 
                type="text" 
                className="form-control" 
                id="commentInput" 
                name="comment"
                aria-describedby="commentInput" 
                placeholder="Comment on the post" 
                value={this.state.comment}
                onChange={this.handleChange}
                onKeyPress={this.handleKeyPress}
              />
            </div>
          )}
        </div>
      </li>
    );
  }
}
 
export default withRouter(Post);
