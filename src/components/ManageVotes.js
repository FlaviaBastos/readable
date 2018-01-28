import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { changeVote } from '../actions'

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

class ManageVotes extends React.Component {
  constructor(props) {
    super(props)
    this.handleVotes = this.handleVotes.bind(this)
  }

  static propTypes = {
    id: PropTypes.string.isRequired,
  }

  handleVotes = (id, voteOption) => {
    const values = {id: id, option: voteOption}
    this.props.dispatch(changeVote(values))
  }

  render() {
    return(
      <div className="votes">
        <a className="btn-floating" onClick={() => this.handleVotes(this.props.id, 'upVote')}>
          <i className="material-icons">arrow_upward</i>
        </a>
        <a className="btn-floating" onClick={() => this.handleVotes(this.props.id, 'downVote')}>
          <i className="material-icons">arrow_downward</i>
        </a>
      </div>
    )
  }
}

export default connect(mapStateToProps)(ManageVotes)
