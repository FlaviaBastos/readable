import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import ManageVotes from './ManageVotes'
import DeleteContent from './DeleteContent'
import { Link } from 'react-router-dom'
import { fetchComments, getSinglePost, writePost } from '../actions'
import serializeForm from 'form-serialize'
import cuid from 'cuid'

class ItemDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {isEditing: false, id: this.props.match.params.id}
    this.onEditingPost = this.onEditingPost.bind(this)
    this.handleSubmitPost = this.handleSubmitPost.bind(this)
  }

  // componentDidMount() {
  //   this.props.getSinglePost(this.state.id)
  //   this.props.fetchComments(this.state.id)
  //   // this.props.dispatch(this.state.receiveContent('single', this.state.id))
  //   // this.props.dispatch(this.state.fetchComments(this.state.id))
  // }


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

  // sendPostID = (id) => {
  //   this.props.onPostDisplayed(id)
  // }

  onEditingPost() {
    console.log('EDITING!!!')
    this.setState({...this.state, isEditing: true})
  }

  handleSubmitPost = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })
    values.id = cuid()
    values.timestamp = Date.now()
    values.type = 'posts'
    this.props.dispatch(writePost(values))
  }

  loadPost() {
    console.log('in Load Post')
    const item = this.props.posts.filter(post => post.id === this.state.id)
    const id = this.state.id
    const comm = this.props.commentsByPost
    const comments = comm.comments
    console.log('here: ', this.state.id)

    if (this.state.isEditing) {
      return (
        <p>in the if</p>
      )
    } else {
      return (
        <div>
          {console.log('ITEM NOW: ', item)}
          { item.map(data => (
            <div key={data.id}>
              <h4>{data.title}</h4>
              <small>In {data.category}, by {data.author}, on {data.timestamp}, this is {this.findDate(data.timestamp)}</small>
              <div>
                <a class="btn-floating" onClick={() => this.onEditingPost(this)}><i class="material-icons">mode_edit</i></a>
              </div>
              <p>{data.body}</p>
              <h4>Comments</h4>
              <Link
                to={`/${data.category}/${data.id}/add_comment`}>
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


  render () {
    return (
      <div>
        <p>should load the post</p>
        {this.loadPost()}
      </div>
    )
  }
}

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
    commentsByPost,
    getSinglePost,
    fetchComments
  }
}

export default connect(mapStateToProps)(ItemDetail)
