import React from 'react'
import PropTypes from 'prop-types'

class ItemDetail extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired
  }

  findDate(timestamp) {
    console.log('HEERE', timestamp)
    let date = new Date(timestamp)
    console.log('Date got: ', date)
    return date
  }

  render() {
    const item = this.props
    // let date = findDate(item.item.timestamp);
    // console.log('Date got: ', date)

    return(
      <div>
        <p>Stuff</p>
        <h2>{item.item.title}</h2>
        <small>In {item.item.category}, by {item.item.author}, on {item.item.timestamp} </small>
        <p>{item.item.body}</p>
        <p>Other stuff</p>
      </div>
    )
  }
}

export default ItemDetail
