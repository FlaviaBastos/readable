import React from 'react'
import * as API from '../utils/api'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addContent, receiveContent, selectCategory, selectedCategory, goFetchContent, writePost } from '../actions'
import serializeForm from 'form-serialize'
import cuid from 'cuid'

function mapStateToProps(state) {
  const { selectedCategory, contentByCategory } = state
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
    isFetching
  }
}

class AddContent extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })
    values.id = cuid()
    values.timestamp = Date.now()
    this.props.dispatch(writePost(values))
  }

  render() {
    return (
      <div>
        <p>Adding stuff.... +++</p>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="title" placeholder="Post title" />
          <input type="text" name="author" placeholder="Author" />
          <select name="category" >
            <option value="react">react</option>
            <option value="redux">redux</option>
            <option value="udacity">udacity</option>
          </select>
          <textarea name="body" placeholder="Post content" />
          <button type="submit">+ Add post</button>
        </form>
      </div>
    )
  }
}

export default connect(mapStateToProps)(AddContent)
