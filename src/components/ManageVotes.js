import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

function mapStateToProps(state) {
  const { selectedCategory, contentByCategory, manageVotes } = state
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

class ManageVotes extends React.Component {
  // static propTypes = {
  //   id: PropTypes.string.isRequired,
  // }

  addVote = () => {
    console.log('vote added for post id: ', this.props.id)
  }

  removeVote = () => {
    console.log('vote removed for post id: ', this.props.id)
  }

  render() {
    return(
      <div>
        <button onClick={() => this.addVote()}>Upvote</button>
        <button onClick={() => this.removeVote()}>Downvote</button>
      </div>
    )
  }
}

export default connect(mapStateToProps)(ManageVotes)
