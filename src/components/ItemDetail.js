import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import ManageVotes from './ManageVotes'
import DeleteContent from './DeleteContent'

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
    // console.log('Date got: ', date, dateY, dateM, dateD, dateH, dateMn)
    let timeAgo = moment([dateY, dateM, dateD, dateH, dateMn]).fromNow()
    // console.log('TIME AGO: ', timeAgo)
    return timeAgo
  }

  render () {
    const item = this.props.posts
    console.log('ITEM: ', item[0])
    const comm = this.props.commentsByPost
    const comments = comm.comments
    console.log('COMMENTS: ', comments) // this is an array

    return (
      <div>
        { item.map(data => (
          <div key={data.id}>
            <h4>{data.title}</h4>
            <small>In {data.category}, by {data.author}, on {data.timestamp}, this is {this.findDate(data.timestamp)}</small>
            <p>{data.body}</p>
          </div>
        ))}
        <h4>Comments</h4>
        { comments && comments.length === 0 && <p>This post has no comments yet...</p>}
        { comments && comments.length > 0 && (
          <ul className="collection">
            { comments.map(comment => (
              <li className="collection-item avatar" key={comment.id}>
                <ManageVotes id={comment.id} />
                <div className="info">
                  <h6>{comment.body}</h6>
                  <p>by <strong>{comment.author}</strong>, with score {comment.voteScore}, on {this.findDate(comment.timestamp)}</p>
                </div>
                <DeleteContent id={comment.id} />
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default connect(mapStateToProps)(ItemDetail)
