import React from 'react'
import PropTypes from 'prop-types'
import ItemSummary from './ItemSummary'
import { Link } from 'react-router-dom'
import { Button, Icon } from 'react-materialize'

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
            <Button floating fab='vertical' large className='cyan darken-2' waves='darken' icon='add' />
          </Link>
        </div>
        {/* <DeleteItem /> */}
        {/* <EditItem /> */}
      </div>
    )
  }
}

export default ItemsList
