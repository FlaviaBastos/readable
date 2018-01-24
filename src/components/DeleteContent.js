import React from 'react'
import * as API from '../utils/api'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addContent, receiveContent, selectCategory, selectedCategory, goFetchContent, writePost, removePost } from '../actions'

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

class DeleteContent extends React.Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }

  static propTypes = {
    id: PropTypes.string.isRequired
  }

  handleDelete = (id) => {
    console.log('ID TO DELETE: ', id)
    this.props.dispatch(removePost(id))
  }

  render() {
    return (
      <div>
        <button onClick={() => this.handleDelete(this.props.id)}>Delete post</button>
      </div>
    )
  }
}

export default connect(mapStateToProps)(DeleteContent)
