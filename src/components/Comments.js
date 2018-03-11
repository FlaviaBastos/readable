import React from 'react'
import { connect } from 'react-redux'
import dateToDisplay from '../utils/helpers'
import serializeForm from 'form-serialize'
import { editComment } from '../actions'

class Comments extends React.Component {
  constructor() {
    super()
    this.state = {
      idToEdit: ''
    }
    this.handleEditComment = this.handleEditComment.bind(this)
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
    this.setState({idToEdit: ''})
    this.props.dispatch(editComment(values))
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
              <a className="btn-floating" onClick={() => this.onEditComment(comment.id)}><i className="material-icons">mode_edit</i></a>
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
