import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

//  Might not need access to store state here... I'm not changing state, only displaying it.... (?)
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

class ItemDetail extends React.Component {
  findDate(timestamp) {
    console.log('HEERE', timestamp)
    let date = new Date(timestamp)
    console.log('Date got: ', date)
    return date
  }

  render() {
    const item = this.props.posts

    return (
      <div>
        { item.map(data => (
          <div key={data.id}>
            <h2>{data.title}</h2>
            <small>In {data.category}, by {data.author}, on {data.timestamp} </small>
            <p>{data.body}</p>
            <p>Other stuff</p>
          </div>
        ))}
      </div>
    )
  }
}

export default connect(mapStateToProps)(ItemDetail)
