import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { writePost } from '../actions'
import { Input } from 'react-materialize'
import serializeForm from 'form-serialize'
import cuid from 'cuid'

class NewAddContent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      redir_home: false
    }
    this.handleSubmitPost = this.handleSubmitPost.bind(this)
  }

  handleSubmitPost = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })
    values.id = cuid()
    values.timestamp = Date.now()
    values.type = 'posts'
    this.props.dispatch(writePost(values))
    this.setState({ redir_home: true })
  }

  render () {
    const { redir_home } = this.state

    if (redir_home) {
      return (<Redirect to="/" />)
    }

    return (
      <div className="row">
        <form onSubmit={this.handleSubmitPost}>
          <div className="input-field col s6">
            <input name="title" type="text" className="validate" />
            <label className="active" htmlFor="post_title">Title</label>
          </div>
          <div className="input-field col s6">
            <input name="author" type="text" className="validate" />
            <label className="active" htmlFor="post_author">Author</label>
          </div>
          <Input type="select" label="Category" name="category" >
            <option value="react">react</option>
            <option value="redux">redux</option>
            <option value="udacity">udacity</option>
          </Input>
          <textarea type="textearea" name="body" placeholder="Post content" />
          <button className="btn waves-effect waves-light" type="submit" name="action">Add post
            <i className="material-icons right">send</i>
          </button>
        </form>
      </div>
    )
  }
}

export default connect()(NewAddContent)
