import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import dateToDisplay from '../utils/helpers'
import { fetchPost, editPost, changeVote } from '../actions'
import serializeForm from 'form-serialize'

class ItemsList extends React.Component {
  constructor() {
    super()
    this.state = {
      idToEdit: ''
    }
    this.handleEditPost = this.handleEditPost.bind(this)
    this.handleVotes = this.handleVotes.bind(this)
  }

  showPost (postId) {
    this.props.dispatch(fetchPost(postId))
  }

  onEditPost (id) {
    this.setState((state) => ({
      idToEdit: id
    }))
  }

  handleEditPost = (e) => {
    e.preventDefault()
    const edited = serializeForm(e.target, { hash: true })
    const idToEdit = this.state.idToEdit
    const toEdit = this.props.posts.find(post => post.id === idToEdit)
    const values = Object.assign(toEdit, edited)
    values.type = 'posts'
    this.setState({ idToEdit: '' })
    this.props.dispatch(editPost(values))
  }

  handleVotes = (id, forType, voteOption) => {
    const values = { id: id, type: forType, option: voteOption }
    this.props.dispatch(changeVote(values))
  }

  render() {
    const { posts } = this.props
    const { idToEdit } = this.state

    return (
      <div>
        {posts &&
          <div>
            <div>
              <ul className="collection">
                {posts.map(item => (
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
                        <div className="votes">
                          <a className="btn-floating" onClick={() => this.handleVotes(item.id, 'posts', 'upVote')}>
                            <i className="material-icons">arrow_upward</i>
                          </a>
                          <a className="btn-floating" onClick={() => this.handleVotes(item.id, 'posts', 'downVote')}>
                            <i className="material-icons">arrow_downward</i>
                          </a>
                        </div>
                        <div className="info">
                          <Link to={`${item.category}/${item.id}`}
                            className="title"
                            onClick={() => this.showPost(item.id)}
                          >{item.title}
                          </Link>
                          <p>by <strong>{item.author}</strong>, <i>{item.category}</i>, with {item.commentCount} {item.commentCount > 1 ? 'comments' : 'comment'} and score {item.voteScore}, on {dateToDisplay(item.timestamp)}</p>
                        </div>
                        <div>
                          <a className="btn-floating" onClick={() => this.onEditPost(item.id)}><i className="material-icons">mode_edit</i></a>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="add-link">
              <div className="fixed-action-btn">
                <Link to="/add_content" className="btn-floating">
                  <i className="material-icons">add</i>
                </Link>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}

function mapStateToProps (state) {
  const { posts } = state.posts
  return { posts }
}

export default connect(mapStateToProps)(ItemsList)
