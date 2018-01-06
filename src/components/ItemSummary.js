import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class ItemSummary extends React.Component {
  static propTypes = {
    summary: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired
  }

  render() {
    const { summary, type } = this.props

    return (
      <ul>
        {summary.map(data => (
          <li key={data.id}>
            <div className="summary-title">
              {type === 'posts' &&
                <Link to={{
                  pathname: '/posts/'.concat(data.id)
                }}
                  className="summary-link"
                  >{data.title}
                </Link>
              }
            </div>
            <div className="summary-details">
              by {data.author}, with {data.commentCount} comments and score {data.voteScore}
            </div>
          </li>
        ))}
      </ul>
    )
  }
}

export default ItemSummary
