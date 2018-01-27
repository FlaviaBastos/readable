import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { removePost } from '../actions'
import { Button, Icon } from 'react-materialize'

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
        <Button waves='light' onClick={() => this.handleDelete(this.props.id)}>
          <Icon>delete</Icon>
        </Button>
      </div>
    )
  }
}

export default connect(mapStateToProps)(DeleteContent)
