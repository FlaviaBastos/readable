import React from 'react'
import * as API from '../utils/api'
import PropTypes from 'prop-types'
import ItemSummary from './ItemSummary'
import ManageVotes from './ManageVotes'

class ItemsList extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     posts: []
  //   }
  // }

  // componentDidMount() {
  //   API.getAll().then((posts) => {
  //     this.setState({ posts })
  //   })
  // }

  static propTypes = {
    data: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired
  }

  render() {
    return (
      <div>
        Boom!
        <ItemSummary
          summary={this.props.data}
          type={this.props.type}
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
