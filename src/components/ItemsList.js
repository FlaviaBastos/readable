import React from 'react'
import PropTypes from 'prop-types'
import AddContent from './AddContent'
import ManageVotes from './ManageVotes'
import DeleteContent from './DeleteContent'
import { Link } from 'react-router-dom'

class ItemsList extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
    onItemClicked: PropTypes.func.isRequired
  }

  postClicked(id) {
    this.props.onItemClicked(id)
  }

  // sendPostID = (id) => {
  //   this.props.onPostClicked(id)
  // }

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

  onEditingPost = () => {
    console.log('ON EDITING POST')
  }

  render() {
    console.log('PROPS IN MATCH ITEMLIST: ', this.props)
    const { data, type } = this.props

    return (
      <div>
        <div>
          <ul className="collection">
            {data.map(item => (
              <li className="collection-item avatar" key={item.id}>
                <ManageVotes id={item.id} type='posts'/>
                <div className="info">
                  <Link to={`${item.category}/${item.id}`}
                    className="title"
                    onClick={() => this.postClicked(item.id)}
                    >{item.title}
                  </Link>
                  <p>by <strong>{item.author}</strong>, with {item.commentCount} {item.commentCount > 1 ? 'comments' : 'comment'} and score {item.voteScore}, on {this.findDate(item.timestamp)}</p>
                  </div>
                <div>
                  <a className="btn-floating" onClick={() => this.onEditingPost()}><i className="material-icons">mode_edit</i></a>
                </div>
                <DeleteContent id={item.id} type='posts'/>
              </li>
            ))}
          </ul>
        </div>
        <div className="add-link">
          <div className="fixed-action-btn">
            <Link to="/add_post" className="btn-floating">
              <i className="material-icons">add</i>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default ItemsList
