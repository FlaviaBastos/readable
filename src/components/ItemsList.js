import React from 'react'
import PropTypes from 'prop-types'
import ItemSummary from './ItemSummary'
import { Link } from 'react-router-dom'

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
        <div className="add-link">
          <Link to='/add/'>
            <div className="fixed-action-btn">
              <a className="btn-floating"><i className="material-icons">add</i></a>
            </div>
          </Link>
        </div>
      </div>
    )
  }
}

export default ItemsList
