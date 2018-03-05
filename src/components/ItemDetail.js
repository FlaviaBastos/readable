import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import ManageVotes from './ManageVotes'
import DeleteContent from './DeleteContent'
import Comments from './Comments'
import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize'
import { writeComment, writePost, editPost } from '../actions'

//  Might not need access to store state here... I'm not changing state, only displaying it.... (?)
function mapStateToProps (state) {
  const { selectedCategory, contentByCategory, commentsByPost } = state
  const {
    isFetching,
    items: posts
  } = contentByCategory[selectedCategory] || {
    isFetching: true,
    items: []
  }
  return {
    selectedCategory,
    posts,
    isFetching,
    commentsByPost
  }
}

class ItemDetail extends React.Component {
  constructor(props) {
  super(props)
  this.state = {
    editing: false,
    id: this.props.match.params.id
  }
  this.handleEditPost = this.handleEditPost.bind(this)
  }

  findDate (timestamp) {
    let date = new Date(timestamp)
    let dateY = date.getFullYear()
    let dateM = date.getMonth()
    let dateD = date.getDate()
    let dateH = date.getHours()
    let dateMn = date.getMinutes()
    let timeAgo = moment([dateY, dateM, dateD, dateH, dateMn]).fromNow()
    return timeAgo
  }

  sendPostID = (id) => {
    console.log('ON SEND POST ID')
    this.props.onPostDisplayed(id)
  }

  onEditingPost() {
    const { editing } = this.state
    this.setState((state) => ({
      editing: true
    }))
  }

  handleEditPost = (e) => {
    e.preventDefault()
    const edited = serializeForm(e.target, { hash: true })
    const item = this.props.posts
    const values = Object.assign(item[0], edited)
    values.type = 'posts'
    this.props.dispatch(editPost(values))
  }

  render() {
    const { id } = this.state
    const post = this.props.posts.find(post => post.id === id)
    const comm = this.props.commentsByPost
    const comments = comm.comments
    const editing = this.state.editing


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
                <small>In {post.category}, by {post.author}, on {post.timestamp}, this is {this.findDate(post.timestamp)}, with score: {post.voteScore}</small>
                <div>
                  <a className="btn-floating" onClick={() => this.onEditingPost(this)}><i className="material-icons">mode_edit</i></a>
                </div>
                <div>
                  <a className="btn-floating secondary-content" onClick={() => this.handleDelete()}>
                    <i className="material-icons">delete</i>
                  </a>
                </div>
                <ManageVotes id={post.id} type='posts'/>
                <p>{post.body}</p>
                <Link
                  to={`/${post.category}/${post.id}/add_comment`}
                  className="btn-floating"
                  onClick={() => this.sendPostID(post.id)}>
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
        )}
      </div>
    )
  }
}

export default connect(mapStateToProps)(ItemDetail)
