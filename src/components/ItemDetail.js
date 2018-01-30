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
    this.props.onPostDisplayed(id)
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
            <small>In {data.category}, by {data.author}, on {data.timestamp}, this is {this.findDate(data.timestamp)}</small>
            <p>{data.body}</p>
            <h4>Comments</h4>
            <Link
              to={{ pathname: '/addcomment/' }}
              className="btn-floating"
              onClick={() => this.sendPostID(data.id)}>
              <i className="material-icons">add</i>
            </Link>
          </div>
        ))}
        { comments && comments.length === 0 && <p>This post has no comments yet...</p>}
        { comments && comments.length > 0 && (
          <ul className="collection">
            { comments.map(comment => (
              <li className="collection-item avatar" key={comment.id}>
                <ManageVotes id={comment.id} type='comments' />
                <div className="info">
                  <h6>{comment.body}</h6>
                  <p>by <strong>{comment.author}</strong>, with score {comment.voteScore}, on {this.findDate(comment.timestamp)}</p>
                </div>
                <DeleteContent id={comment.id} type='comments' />
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default connect(mapStateToProps)(ItemDetail)
