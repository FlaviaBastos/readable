import React from 'react'
import * as API from '../utils/api'
import PropTypes from 'prop-types'
import ItemSummary from './ItemSummary'

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
        <ItemSummary
          summary={this.props.data}
          type={this.props.type}
          onPostClicked={(postId) =>
            this.postClicked(postId)
          }
        />
        {/* <DeleteItem /> */}
        {/* <EditItem /> */}
      </div>
    )
  }
}

export default ItemsList
