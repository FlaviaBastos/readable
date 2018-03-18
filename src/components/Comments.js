import React from 'react'
import { connect } from 'react-redux'
import dateToDisplay from '../utils/helpers'
import serializeForm from 'form-serialize'
import { editComment, changeCommentVote, removeComment } from '../actions'

class Comments extends React.Component {
  constructor() {
    super()
    this.state = {
      idToEdit: ''
    }
    this.handleEditComment = this.handleEditComment.bind(this)
    this.handleVotes = this.handleVotes.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  onEditComment (id) {
    this.setState((state) => ({
      idToEdit: id
    }))
  }

  handleEditComment = (e) => {
    e.preventDefault()
    const idToEdit = this.state.idToEdit
    const edited = serializeForm(e.target, { hash: true })
    const comment = this.props.comment
    const values = Object.assign(comment, edited)
    values.timestamp = Date.now()
    values.type = 'comments'
    this.setState({ idToEdit: '' })
    this.props.dispatch(editComment(values))
  }

  handleVotes = (id, forType, voteOption) => {
    const values = { id: id, type: forType, option: voteOption }
    this.props.dispatch(changeCommentVote(values))
  }

  handleDelete = (id, forType) => {
    const values = {id: id, type: forType}
    this.props.dispatch(removeComment(values))
  }

  handleCancel = () => {
    this.setState({ idToEdit: '' })
  }

  render() {
    const { comment } = this.props
    const idToEdit = this.state.idToEdit

    return (
      <div>
        {comment.id === idToEdit && (
          <div>
            <form onSubmit={this.handleEditComment}>
              <div className="row">
                <div className="input-field col s12">
                  <textarea type="textearea" name="body" className="materialize-textarea" defaultValue={comment.body}></textarea>
                  <label className="active" htmlFor="textarea1">Comment</label>
                </div>
              </div>
              <a className="waves-effect waves-teal btn-flat"
                onClick={() => this.handleCancel()}>
                Cancel
              </a>
              <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                <i className="material-icons right">send</i>
              </button>
            </form>
          </div>
        )}

        {comment.id !== idToEdit && (
          <div>
            <div className="info">
              <h6>{comment.body}</h6>
              <p>by <strong>{comment.author}</strong>, with score {comment.voteScore}, on {dateToDisplay(comment.timestamp)}</p>
            </div>
            <div>
              <a className="btn-floating" onClick={() => this.handleVotes(comment.id, 'comments', 'upVote')}>
                <i className="material-icons">arrow_upward</i>
              </a>
              <a className="btn-floating" onClick={() => this.handleVotes(comment.id, 'comments', 'downVote')}>
                <i className="material-icons">arrow_downward</i>
              </a>
              <a className="btn-floating" onClick={() => this.onEditComment(comment.id)}><i className="material-icons">mode_edit</i></a>
            </div>
            <div>
              <a className="btn-floating secondary-content" onClick={() => this.handleDelete(comment.id, 'comments')}>
                <i className="material-icons">delete</i>
              </a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps (state) {
  const { commentsByPost } = state.commentsByPost
  return { commentsByPost }
}

export default connect(mapStateToProps)(Comments)
