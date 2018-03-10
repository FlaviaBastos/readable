import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// import ManageVotes from './ManageVotes'
// import DeleteContent from './DeleteContent'
import dateToDisplay from '../utils/helpers'

class ItemsList extends React.Component {
  render() {
    const { posts } = this.props

    return (
      <div>
        {posts &&
          <div>
            <div>
              <ul className="collection">
                {posts.map(item => (
                  <li className="collection-item avatar" key={item.id}>
                    <div>
                      {/* <ManageVotes id={item.id} type='posts' /> */}
                      <div className="info">
                        <Link to={`${item.category}/${item.id}`}
                          className="title"
                          onClick={() => this.showPost(item.id)}
                        >{item.title}
                        </Link>
                        <p>by <strong>{item.author}</strong>, with {item.commentCount} {item.commentCount > 1 ? 'comments' : 'comment'} and score {item.voteScore}, on {dateToDisplay(item.timestamp)}</p>
                      </div>
                      <div>
                        <a className="btn-floating" onClick={() => this.onEditPost(item.id)}><i className="material-icons">mode_edit</i></a>
                      </div>
                      {/* <DeleteContent id={item.id} type='posts' /> */}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="add-link">
              <div className="fixed-action-btn">
                <Link to="/add_content" className="btn-floating">
                  <i className="material-icons">add</i>
                </Link>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}

function mapStateToProps (state) {
  const { posts } = state.posts
  return { posts }
}

export default connect(mapStateToProps)(ItemsList)
