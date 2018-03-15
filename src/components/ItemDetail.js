import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect, Route } from 'react-router-dom'
import dateToDisplay from '../utils/helpers'
import { fetchComments, editPost, changePostVote, removeSinglePost } from '../actions'
import Comments from './Comments'
import NotFound from './NotFound'
import serializeForm from 'form-serialize'

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
    const item = this.props.posts.find(post => post.id === this.props.match.params.id)
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
    const post = posts.find(post => post.id === this.props.match.params.id)

    if (!post) {
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
                  <input defaultValue={post.title} name="title" type="text" className="validate" />
                  <label className="active" htmlFor="post_title">Title</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <textarea name="body" className="materialize-textarea" defaultValue={post.body}></textarea>
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
            <div key={post.id}>
              <h4>{post.title}</h4>
              <small>In <i>{post.category}</i>, by <strong>{post.author}</strong>, on <strong>{dateToDisplay(post.timestamp)}</strong>, with score: <strong>{post.voteScore}</strong></small>
              <div>
                <p>{post.body}</p>
              </div>
              <div>
                <a className="btn-floating" onClick={() => this.handleVotes(post.id, 'posts', 'upVote')}>
                  <i className="material-icons">arrow_upward</i>
                </a>
                <a className="btn-floating" onClick={() => this.handleVotes(post.id, 'posts', 'downVote')}>
                  <i className="material-icons">arrow_downward</i>
                </a>
                <a className="btn-floating" onClick={() => this.onEditingPost(post.id)}><i className="material-icons">mode_edit</i></a>
              </div>
              <div>
                <a className="btn-floating secondary-content" onClick={() => this.handleDelete(post.id, 'posts')}>
                  <i className="material-icons">delete</i>
                </a>
              </div>
            </div>

            {comments && comments.length === 0 && <p>This post has no comments yet...</p>}
            {comments && comments.length > 0 && (
              <div>
                <div className="comments">
                  <h4>{comments.length} Comments</h4>
                  <Link
                    to={`/${post.category}/${post.id}/add_comment`}
                    className="btn-floating">
                    <i className="material-icons">add</i>
                  </Link>
                </div>
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
