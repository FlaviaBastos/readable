import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ManageVotes from './ManageVotes'
import DeleteContent from './DeleteContent'

class ItemSummary extends React.Component {
  static propTypes = {
    summary: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
    onPostClicked: PropTypes.func.isRequired
  }

  sendPostID = (id) => {
    this.props.onPostClicked(id)
  }

  render() {
    const { summary, type } = this.props
    let url

    return (
      <ul>
        {summary.map(data => (
          url = data.category + '/',
          <li key={data.id}>
            <div className="summary-title">
              {type === 'posts' &&
                <Link to={{
                  pathname: url.concat(data.id)
                  }}
                  className="summary-link"
                  onClick={() => this.sendPostID(data.id)}
                  >{data.title}
                </Link>
              }
            </div>
            <div className="summary-details">
              by {data.author}, with {data.commentCount} comments and score {data.voteScore}
              <ManageVotes id={data.id} />
              <DeleteContent id={data.id} />
            </div>
          </li>
        ))}
      </ul>
    )
  }
}

export default ItemSummary
