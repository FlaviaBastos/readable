import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ManageVotes from './ManageVotes'
import DeleteContent from './DeleteContent'
import { Collection, CollectionItem } from 'react-materialize'

class ItemSummary extends React.Component {
  static propTypes = {
    summary: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
    onPostClicked: PropTypes.func.isRequired
  }

  sendPostID = (id) => {
    this.props.onPostClicked(id)
  }

  findDate(timestamp) {
    const mths = {'0': 'Jan', '1': 'Fev', '2': 'Mar', '3': 'Apr', '4': 'May', '5': 'Jun',
                  '6': 'Jul', '7': 'Aug', '8': 'Set', '9': 'Oct', '10': 'Nov', '11': 'Dec'}
    let date = new Date(timestamp)
    let dateY = date.getFullYear()
    let dateM = date.getMonth().toString()
    let dateD = date.getDate()
    let exactDate = `${dateD} ${mths[dateM]} ${dateY}`
    return exactDate
  }

  render() {
    const { summary, type } = this.props
    let url

    return (
      <Collection>
        {summary.map(data => (
          url = data.category + '/',
          <CollectionItem key={data.id}>
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
            <div>
              <ManageVotes id={data.id} />
              <div className="">
                by <strong>{data.author}</strong>, with {data.commentCount} comments and score {data.voteScore}, on {this.findDate(data.timestamp)}
                <DeleteContent id={data.id} />
              </div>
            </div>
          </CollectionItem>
        ))}
      </Collection>
    )
  }
}

export default ItemSummary
