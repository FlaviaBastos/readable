import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { changeVote } from '../actions'
import { Button, Icon } from 'react-materialize'

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
      <div>
        <Button class="btn" onClick={() => this.handleVotes(this.props.id, 'upVote')}>
          <Icon>arrow_upward</Icon>
        </Button>
        <Button class="btn" onClick={() => this.handleVotes(this.props.id, 'downVote')}>
          <Icon>arrow_downward</Icon>
        </Button>
      </div>
    )
  }
}

export default connect(mapStateToProps)(ManageVotes)
