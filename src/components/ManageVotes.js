import React from 'react'
import { connect } from 'react-redux'
import { changeVote } from '../actions'

class ManageVotes extends React.Component {
  handleVotes = (id, forType, voteOption) => {
    const values = { id: id, type: forType, option: voteOption }
    this.props.dispatch(changeVote(values))
  }

  render() {
    const { id, type } = this.props

    return (
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

export default connect()(ManageVotes)
