import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect, Route } from 'react-router-dom'
import dateToDisplay from '../utils/helpers'
import { fetchPost, fetchComments, changePostVote, removeSinglePost } from '../actions'
import Comments from './Comments'
import NotFound from './NotFound'
import serializeForm from 'form-serialize'
import { editPost } from '../actions'

class ItemDetail extends React.Component {
  constructor() {
    super()
    this.state = {
      editing: false,
      redir_home: false
    }
    this.handleEditPost = this.handleEditPost.bind(this)
    this.handleVotes = this.handleVotes.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount () {
    this.props.dispatch(fetchPost(this.props.match.params.id))
    this.props.dispatch(fetchComments(this.props.match.params.id))
  }

  onEditingPost (id) {
    const { editing } = this.state
    this.setState((state) => ({
      editing: true
    }))
  }

  handleEditPost = (e) => {
    e.preventDefault()
    const { editing } = this.state
    const edited = serializeForm(e.target, { hash: true })
    const item = this.props.posts
    const values = Object.assign(item, edited)
    values.type = 'posts'
    this.setState({ editing: false })
    this.props.dispatch(editPost(values))
  }

  handleVotes = (id, forType, voteOption) => {
    const values = { id: id, type: forType, option: voteOption }
    this.props.dispatch(changePostVote(values))
  }

  handleDelete = (id, forType) => {
    const values = {id: id, type: forType}
    this.props.dispatch(removeSinglePost(values))
    this.setState({ redir_home: true })
  }

  render () {
    const posts = this.props.posts
    const comments = this.props.commentsByPost
    const editing = this.state.editing
    const { redir_home } = this.state

    if (Object.keys(posts).length === 0) {
      return (<Route component={NotFound} />)
    }

    if (redir_home) {
      return (<Redirect to="/" />)
    }

    return (
      <div>
        {editing && (
          <div>
            <form onSubmit={this.handleEditPost}>
              <div className="row">
                <div className="input-field col s6">
                  <input defaultValue={posts.title} name="title" type="text" className="validate" />
                  <label className="active" htmlFor="post_title">Title</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <textarea name="body" className="materialize-textarea" defaultValue={posts.body}></textarea>
                  <label className="active" htmlFor="textarea1">Post content</label>
                </div>
              </div>
              <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                <i className="material-icons right">send</i>
              </button>
            </form>
          </div>
        )}
        {!editing && (
          <div>
            <div className="votes">
              <a className="btn-floating" onClick={() => this.handleVotes(posts.id, 'posts', 'upVote')}>
                <i className="material-icons">arrow_upward</i>
              </a>
              <a className="btn-floating" onClick={() => this.handleVotes(posts.id, 'posts', 'downVote')}>
                <i className="material-icons">arrow_downward</i>
              </a>
            </div>
            <div key={posts.id}>
              <h4>{posts.title}</h4>
              <small>In {posts.category}, by {posts.author}, on {dateToDisplay(posts.timestamp)}, with score: {posts.voteScore}</small>
              <div>
                <a className="btn-floating" onClick={() => this.onEditingPost(posts.id)}><i className="material-icons">mode_edit</i></a>
              </div>
              <p>{posts.body}</p>
              <Link
                to={`/${posts.category}/${posts.id}/add_comment`}
                className="btn-floating"
                onClick={() => this.sendPostID(posts.id)}>
                <i className="material-icons">add</i>
              </Link>
              <div>
                <a className="btn-floating secondary-content" onClick={() => this.handleDelete(posts.id, 'posts')}>
                  <i className="material-icons">delete</i>
                </a>
              </div>
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
