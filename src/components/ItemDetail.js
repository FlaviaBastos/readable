import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import ManageVotes from './ManageVotes'
import DeleteContent from './DeleteContent'
import { Link } from 'react-router-dom'

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
    console.log('ON EDITING POST')
  }

  render () {
    const item = this.props.posts
    const comm = this.props.commentsByPost
    const comments = comm.comments

    return (
      <div>
        { item.map(data => (
          <div key={data.id}>
            <h4>{data.title}</h4>
            <small>In {data.category}, by {data.author}, on {data.timestamp}, this is {this.findDate(data.timestamp)}, with score: {data.voteScore}</small>
            <div>
              <a className="btn-floating" onClick={() => this.onEditingPost(this)}><i className="material-icons">mode_edit</i></a>
            </div>
            <div>
              <a className="btn-floating secondary-content" onClick={() => this.handleDelete()}>
                <i className="material-icons">delete</i>
              </a>
            </div>
            <div className="votes">
              <a className="btn-floating" onClick={() => this.handleVotes()}>
                <i className="material-icons">arrow_upward</i>
              </a>
              <a className="btn-floating" onClick={() => this.handleVotes()}>
                <i className="material-icons">arrow_downward</i>
              </a>
            </div>
            <p>{data.body}</p>
            <Link
              to={`/${data.category}/${data.id}/add_comment`}
              className="btn-floating"
              onClick={() => this.sendPostID(data.id)}>
              <i className="material-icons">add</i>
            </Link>
          </div>
        ))}
        { comments && comments.length === 0 && <p>This post has no comments yet...</p>}
        { comments && comments.length > 0 && (
          <div>
            <h4>{comments.length} Comments</h4>
            <ul className="collection">
              { comments.map(comment => (
                <li className="collection-item avatar" key={comment.id}>
                  <ManageVotes id={comment.id} type='comments' />
                  <div className="info">
                    <h6>{comment.body}</h6>
                    <p>by <strong>{comment.author}</strong>, with score {comment.voteScore}, on {this.findDate(comment.timestamp)}</p>
                  </div>
                  <div>
                    <a className="btn-floating" onClick={() => this.onEditing()}><i className="material-icons">mode_edit</i></a>
                  </div>
                  <DeleteContent id={comment.id} type='comments' />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default connect(mapStateToProps)(ItemDetail)
