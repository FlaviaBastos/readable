import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

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
    let date = new Date(timestamp)
    let dateY = date.getFullYear()
    let dateM = date.getMonth()
    let dateD = date.getDate()
    let dateH = date.getHours()
    let dateMn = date.getMinutes()
    //console.log('Date got: ', date, dateY, dateM, dateD, dateH, dateMn)
    let timeAgo = moment([dateY, dateM, dateD, dateH, dateMn]).fromNow()
    //console.log('TIME AGO: ', timeAgo)
    return timeAgo
  }

  render() {
    const item = this.props.posts

    return (
      <div>
        { item.map(data => (
          <div key={data.id}>
            <h2>{data.title}</h2>
            <small>In {data.category}, by {data.author}, on {data.timestamp}, this is {this.findDate(data.timestamp)}</small>
            <p>{data.body}</p>
            <p>Other stuff</p>
          </div>
        ))}
      </div>
    )
  }
}

export default connect(mapStateToProps)(ItemDetail)
