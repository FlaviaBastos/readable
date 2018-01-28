import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { removePost } from '../actions'

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
        <a className="btn-floating secondary-content" onClick={() => this.handleDelete(this.props.id)}>
          <i className="material-icons">delete</i>
        </a>
      </div>
    )
  }
}

export default connect(mapStateToProps)(DeleteContent)
