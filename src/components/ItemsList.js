import React from 'react'
import * as API from '../utils/api'
import ItemSummary from './ItemSummary'

class ItemsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    API.getAll().then((posts) => {
      this.setState({ posts })
    })
  }

  render() {
    return (
      <div>
        Boom!
        <ItemSummary
          posts={this.state.posts}
        />
        {/* {comment.count} */}
        {/* <ManageVotes /> */}
        {/* <DeleteItem /> */}
        {/* <EditItem /> */}
      </div>
    )
  }
}

export default ItemsList
