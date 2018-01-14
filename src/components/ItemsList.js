import React from 'react'
import * as API from '../utils/api'
import PropTypes from 'prop-types'
import ItemSummary from './ItemSummary'
import ManageVotes from './ManageVotes'

class ItemsList extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
    onItemClicked: PropTypes.func.isRequired
  }

  postClicked(id) {
    this.props.onItemClicked(id)
  }

  render() {
    return (
      <div>
        Boom!
        <ItemSummary
          summary={this.props.data}
          type={this.props.type}
          onPostClicked={(postId) =>
            this.postClicked(postId)
          }
        />
        {/* {comment.count} */}
        <ManageVotes />
        {/* <DeleteItem /> */}
        {/* <EditItem /> */}
      </div>
    )
  }
}

export default ItemsList
