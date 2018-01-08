import React, { Component } from 'react'
import * as API from '../utils/api'
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import CategoryHeader from './CategoryHeader'
import SortBar from './SortBar'
import ItemsList from './ItemsList'
import ItemDetail from './ItemDetail'
import { connect } from 'react-redux'
import { addContent } from '../actions'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      category: [],
      comments: []
    }
  }

  doThing = () => {
    this.props.dispatch(addContent({}))
  }

  componentDidMount() {
    API.getAll().then((data) => {
      console.log('DATA IS: ', data)
      this.setState({ posts: data })
      const DATA = data
    })
  }

  loadCategory(category) {
    API.getForCat(category).then((data) => {
      console.log('Posts for cat', category, data)
      this.setState({ category: data })
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
        <CategoryHeader
          onChangeCategory={(category) =>
          this.loadCategory(category)
        }/>
        <SortBar />
        <Route exact path='/' render={() => (
          <ItemsList
            data={this.state.posts}
            type='posts'
          />
        )}/>
        <Route path='/([^\/]+?)' render={() => (
          <ItemsList
            data={this.state.category}
            type='posts'
          />
        )}/>
        <Route path='/posts/([^\/]+?)' render={() => (
          <ItemDetail />
        )}/>
      </div>
    )
  }
}

function mapStateToProps (content) {
  return {
    content
  }
}

export default withRouter(connect(mapStateToProps)(App));
