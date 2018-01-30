import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { changeVote } from '../actions'

function mapStateToProps(state) {
  const { selectedCategory, contentByCategory, commentsByPost } = state
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
    isFetching,
    commentsByPost
  }
}

class ManageVotes extends React.Component {
  constructor(props) {
    super(props)
    this.handleVotes = this.handleVotes.bind(this)
  }

  static propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  }

  handleVotes = (id, forType, voteOption) => {
    const values = {id: id, type: forType, option: voteOption}
    this.props.dispatch(changeVote(values))
  }

  render() {
    const { id, type } = this.props
    return(
      <div className="votes">
        <a className="btn-floating" onClick={() => this.handleVotes(id, type, 'upVote')}>
          <i className="material-icons">arrow_upward</i>
        </a>
        <a className="btn-floating" onClick={() => this.handleVotes(id, type, 'downVote')}>
          <i className="material-icons">arrow_downward</i>
        </a>
      </div>
    )
  }
}

export default connect(mapStateToProps)(ManageVotes)
