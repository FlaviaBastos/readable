import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import dateToDisplay from '../utils/helpers'
import { fetchPost, fetchComments } from '../actions'
import Comments from './Comments'

class ItemDetail extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPost(this.props.match.params.id))
    this.props.dispatch(fetchComments(this.props.match.params.id))
  }

  render () {
    const posts = this.props.posts
    const comments = this.props.commentsByPost

    return (
      <div>
        <div key={posts.id}>
          <h4>{posts.title}</h4>
          <small>In {posts.category}, by {posts.author}, on {dateToDisplay(posts.timestamp)}, with score: {posts.voteScore}</small>
          <div>
            <a className="btn-floating" onClick={() => this.onEditingPost(this)}><i className="material-icons">mode_edit</i></a>
          </div>
          <p>{posts.body}</p>
          <Link
            to={`/${posts.category}/${posts.id}/add_comment`}
            className="btn-floating"
            onClick={() => this.sendPostID(posts.id)}>
            <i className="material-icons">add</i>
          </Link>
        </div>

        {comments && comments.length === 0 && <p>This post has no comments yet...</p>}
        {comments && comments.length > 0 && (
          <div>
            <h4>{comments.length} Comments</h4>
            <ul className="collection">
              {comments.map(comment => (
                <li className="collection-item avatar" key={comment.id}>
                  <Comments comment={comment}/>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps (state) {
  const { posts } = state.posts
  const { commentsByPost } = state.commentsByPost
  return { posts, commentsByPost }
}

export default connect(mapStateToProps)(ItemDetail)
