import React from 'react'
import { connect } from 'react-redux'
import dateToDisplay from '../utils/helpers'

class Comments extends React.Component {
  render() {
    const { comment } = this.props

    return (
      <div>
        <div>
          <div className="info">
            <h6>{comment.body}</h6>
            <p>by <strong>{comment.author}</strong>, with score {comment.voteScore}, on {dateToDisplay(comment.timestamp)}</p>
          </div>
          <div>
            <a className="btn-floating" onClick={() => this.onEditComment(comment.id)}><i className="material-icons">mode_edit</i></a>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const { commentsByPost } = state.commentsByPost
  return { commentsByPost }
}

export default connect(mapStateToProps)(Comments)
