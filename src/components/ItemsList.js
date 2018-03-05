import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import AddContent from './AddContent'
import ManageVotes from './ManageVotes'
import DeleteContent from './DeleteContent'
import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize'
import { editPost } from '../actions'

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

class ItemsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {idToEdit: ''}
    this.handleEditPost = this.handleEditPost.bind(this)
  }

  static propTypes = {
    data: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
    onItemClicked: PropTypes.func.isRequired
  }

  postClicked(id) {
    this.props.onItemClicked(id)
  }

  findDate(timestamp) {
    const mths = {'0': 'Jan', '1': 'Fev', '2': 'Mar', '3': 'Apr', '4': 'May', '5': 'Jun',
                  '6': 'Jul', '7': 'Aug', '8': 'Set', '9': 'Oct', '10': 'Nov', '11': 'Dec'}
    let date = new Date(timestamp)
    let dateY = date.getFullYear()
    let dateM = date.getMonth().toString()
    let dateD = date.getDate()
    let exactDate = `${dateD} ${mths[dateM]} ${dateY}`
    return exactDate
  }

  onEditPost (id) {
    console.log('ID TO EDIT: ', id)
    this.setState((state) => ({
      idToEdit: id
    }))
  }

  handleEditPost = (e) => {
    e.preventDefault()
    const edited = serializeForm(e.target, { hash: true })
    const idToEdit = this.state.idToEdit
    const toEdit = this.props.data.find(post => post.id === idToEdit)
    const values = Object.assign(toEdit, edited)
    values.type = 'posts'
    this.props.dispatch(editPost(values))
  }

  render() {
    const { data, type } = this.props
    const idToEdit = this.state.idToEdit

    return (
      <div>
        <div>
          <ul className="collection">
            {data.map(item => (
              <li className="collection-item avatar" key={item.id}>
                {item.id === idToEdit && (
                  <div>
                    <form onSubmit={this.handleEditPost}>
                      <div className="row">
                        <div className="input-field col s6">
                          <input defaultValue={item.title} name="title" type="text" className="validate" />
                          <label className="active" htmlFor="post_title">Title</label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="input-field col s12">
                          <textarea type="textearea" name="body" className="materialize-textarea" defaultValue={item.body}></textarea>
                          <label className="active" htmlFor="textarea1">Post</label>
                        </div>
                      </div>
                      <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                        <i className="material-icons right">send</i>
                      </button>
                    </form>
                  </div>
                )}
                {item.id !== idToEdit && (
                  <div>
                    <ManageVotes id={item.id} type='posts'/>
                    <div className="info">
                      <Link to={`${item.category}/${item.id}`}
                        className="title"
                        onClick={() => this.postClicked(item.id)}
                        >{item.title}
                      </Link>
                      <p>by <strong>{item.author}</strong>, with {item.commentCount} {item.commentCount > 1 ? 'comments' : 'comment'} and score {item.voteScore}, on {this.findDate(item.timestamp)}</p>
                      </div>
                    <div>
                      <a className="btn-floating" onClick={() => this.onEditPost(item.id)}><i className="material-icons">mode_edit</i></a>
                    </div>
                    <DeleteContent id={item.id} type='posts'/>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="add-link">
          <div className="fixed-action-btn">
            <Link to="/add_post" className="btn-floating">
              <i className="material-icons">add</i>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(ItemsList)
