import React from 'react'
import PropTypes from 'prop-types'

class ItemSummary extends React.Component {
  static propTypes = {
    posts: PropTypes.array.isRequired
  }

  render() {
    const posts = this.props.posts

    return (
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <div className="post-title">
              <a href={post.id}>
                {post.title}
              </a>
            </div>
            <div className="post-details">
              by {post.author}, with {post.commentCount} comments and score {post.voteScore}
            </div>
          </li>
        ))}
      </ul>
    )
  }
}

export default ItemSummary
