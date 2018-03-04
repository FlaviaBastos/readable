import React from 'react'
import { connect } from 'react-redux'
import ManageVotes from './ManageVotes'
import DeleteContent from './DeleteContent'
import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize'
import { writeComment, writePost } from '../actions'

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
    this.id = this.props.id
    this.body = this.props.body
    this.author = this.props.author
    this.voteScore = this.props.voteScore
    this.timestamp = this.props.timestamp
    // this.handleSubmitPost = this.handleSubmitPost.bind(this)
  }


  // sendPostID = (id) => {
  //   console.log('ON SEND POST ID')
  //   this.props.onPostDisplayed(id)
  // }
  //
  onEditComment (id) {
    // const { editing } = this.state
    console.log('ON EDITING COMMENT', id)
    this.setState((state) => ({
      idToEdit: id
    }))
  }
  //
  // handleSubmitPost = (e) => {
  //   e.preventDefault()
  //   const item = this.props.posts
  //   const body = document.getElementById('post_body').value;
  //   const title = document.getElementById('post_title').value;
  //   const edited = {title: title, body: body}
  //   const values = Object.assign(item[0], edited)
  //   values.type = 'posts'
  //   this.props.dispatch(writePost(values))
  // }

  render() {
    const idToEdit = this.state.idToEdit
    const { id, author, body, voteScore, timestamp } = this.props
    console.log('PROPS IN COMM: ', id, author, voteScore, timestamp)

    return (
      <div>
        {id === idToEdit && (
          <div>
            <p>will edit this comment: {idToEdit}</p>
            {/* <form onSubmit={this.handleSubmitPost}>
              <div className="row">
                <div className="input-field col s6">
                  <input defaultValue={item[0].title} id="post_title" type="text" className="validate" />
                  <label className="active" htmlFor="post_title">Title</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <textarea id="post_body" className="materialize-textarea" defaultValue={item[0].body}></textarea>
                  <label className="active" htmlFor="textarea1">Post content</label>
                </div>
              </div>
              <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                <i className="material-icons right">send</i>
              </button>
            </form> */}
          </div>
        )}
        {id !== idToEdit && (
          <div>
            <ManageVotes id={id} type='comments' />
            <div className="info">
              <h6>{body}</h6>
              <p>by <strong>{author}</strong>, with score {voteScore}, on {timestamp}</p>
            </div>
            <div>
              <a className="btn-floating" onClick={() => this.onEditComment(id)}><i className="material-icons">mode_edit</i></a>
            </div>
            <DeleteContent id={id} type='comments' />
          </div>
        )}
      </div>
    )
  }
}

export default connect(mapStateToProps)(Comments)
