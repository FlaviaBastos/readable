import React from 'react'
import { connect } from 'react-redux'
import ManageVotes from './ManageVotes'
import DeleteContent from './DeleteContent'
import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize'
import { editComment } from '../actions'

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

class Comments extends React.Component {
  constructor(props) {
    super(props)
    this.state = {idToEdit: ''}
    this.comment = this.props.comment
    this.handleEditComment = this.handleEditComment.bind(this)
  }

  onEditComment (id) {
    console.log('ON EDITING COMMENT', id)
    this.setState((state) => ({
      idToEdit: id
    }))
  }

  handleEditComment = (e) => {
    e.preventDefault()
    const edited = serializeForm(e.target, { hash: true })
    console.log('VALUES FROM COMMENT: ', edited)
    const comment = this.props.comment
    // const body = document.getElementById('comment_body').value;
    // const edited = {body: body}
    const values = Object.assign(comment, edited)
    values.type = 'comments'
    this.props.dispatch(editComment(values))
  }

  render() {
    const idToEdit = this.state.idToEdit
    const { comment } = this.props

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
            <ManageVotes id={comment.id} type='comments' />
            <div className="info">
              <h6>{comment.body}</h6>
              <p>by <strong>{comment.author}</strong>, with score {comment.voteScore}, on {comment.timestamp}</p>
            </div>
            <div>
              <a className="btn-floating" onClick={() => this.onEditComment(comment.id)}><i className="material-icons">mode_edit</i></a>
            </div>
            <DeleteContent id={comment.id} type='comments' />
          </div>
        )}
      </div>
    )
  }
}

export default connect(mapStateToProps)(Comments)
