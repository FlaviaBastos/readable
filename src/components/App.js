import React, { Component } from 'react'
import * as API from '../utils/api'
import CategoryHeader from './CategoryHeader'
import SortBar from './SortBar'
import ItemsList from './ItemsList'
import ItemDetail from './ItemDetail'
import { connect } from 'react-redux'
import { addContent } from '../actions'

class App extends Component {
  doThing = () => {
    this.props.dispatch(addContent({}))
  }

  // componentDidMount() {
  //   API.getAll().then((data) => {
  //     console.log('DATA IS: ', data)
  //     const DATA = data
  //   })
  // }

  loadCategory(category) {
    API.getForCat(category).then((data) => {
      console.log('Posts for cat', category, data)
    })
  }

  showPost(postId) {
    API.getPost(postId).then((data) => {
      console.log('One post', data)
    })
  }

  showComments(postId) {
    API.getComments(postId).then((data) => {
      console.log('Post comments for post', postId, data)
    })
  }

  showSingleComment(commentId) {
    API.getSingleComment(commentId).then((data) => {
      console.log('One comment: ', data)
    })
  }


  render() {
    console.log('Props ', this.props)

    return (
      <div>
        ta-daaaaaa {`🎆`}
        <div>
          <p>API testing: </p>
          <button onClick={() => this.loadCategory('react')}>Show one category</button>
          <button onClick={() => this.showPost('8xf0y6ziyjabvozdd253nd')}>Show one post</button>
          <button onClick={() => this.showComments('8xf0y6ziyjabvozdd253nd')}>Show all comments for post</button>
          <button onClick={() => this.showSingleComment('8tu4bsun805n8un48ve89')}>Show one comment</button>
        </div>
        <CategoryHeader />
        <SortBar />
        <ItemsList />
        <ItemDetail />
      </div>
    )
  }
}

function mapStateToProps (content) {
  return {
    content
  }
}

export default connect(mapStateToProps)(App)
