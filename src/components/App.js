import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as API from '../utils/api'
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import CategoryHeader from './CategoryHeader'
import SortBar from './SortBar'
import ItemsList from './ItemsList'
import ItemDetail from './ItemDetail'
import { connect } from 'react-redux'
import { addContent, receiveContent, selectCategory, selectedCategory, goFetchContent } from '../actions'

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

class App extends Component {
  constructor(props) {
    super(props)
    this.showPost = this.showPost.bind(this)
  }

  componentDidMount() {
    const { dispatch, selectedCategory } = this.props
    dispatch(goFetchContent(selectedCategory))
  }

  loadCategory(category) {
    if (category === 'all') {
      this.props.dispatch(selectCategory(category))
      this.props.dispatch(receiveContent(category, this.state.contentByCategory))
    } else {
      API.getForCat(category).then((data) => {
        this.props.dispatch(selectCategory(category))
        this.props.dispatch(receiveContent(category, data))
      })
    }
  }

  changeFilter(filterName) {
    switch (filterName) {
      case 'recent':
        const newest = this.props.posts.sort((a, b) =>
          a.timestamp > b.timestamp ? -1 : 1)
        this.props.dispatch(selectCategory('recent'))
        this.props.dispatch(receiveContent('recent', newest))
        console.table(newest)
        break
      case 'comments':
        const mostCommented = this.props.posts.sort((a, b) =>
          a.commentCount > b.commentCount ? -1 : 1)
        this.props.dispatch(selectCategory('comments'))
        this.props.dispatch(receiveContent('comments', mostCommented))
        console.table(mostCommented)
        break
      case 'popular':
        const mostVoted = this.props.posts.sort((a, b) =>
          a.voteScore > b.voteScore ? -1 : 1)
        this.props.dispatch(selectCategory('popular'))
        this.props.dispatch(receiveContent('popular', mostVoted))
        console.table(mostVoted)
        break
      default:
        this.props.dispatch(selectCategory('all'))
        this.props.dispatch(receiveContent('all', this.state.contentByCategory))
    }
  }

  showPost(postId) {
    let singlePost = this.props.posts.filter(item => item.id === postId)
    this.props.dispatch(selectCategory('single'))
    this.props.dispatch(receiveContent('single', singlePost))
  }

  render() {
    console.log('Props ', this.props)
    const { selectedCategory, posts, isFetching } = this.props

    return (
      <div>
        <CategoryHeader
          onChangeCategory={(category) =>
          this.loadCategory(category)
        } />
        {isFetching && posts.length === 0 && <h2>Loading....</h2>}
        {!isFetching && posts.length === 0 && <h2>There are no posts for your selection :(</h2>}
        {posts.length > 0 &&
          <div>
            <Route exact path='/' render={() => (
              // display all posts
              <div>
                <SortBar
                  onChangeView={(byFilter) =>
                  this.changeFilter(byFilter)
                } />
                <ItemsList
                  data={posts}
                  type='posts'
                  onItemClicked={(id) =>
                  this.showPost(id)
                } />
              </div>
            )} />
            <Route path='/([^\/]+?)' render={() => (
              // display posts for one category
              <div>
                <SortBar
                  onChangeView={(byFilter) =>
                  this.changeFilter(byFilter)
                } />
                <ItemsList
                  data={posts}
                  type='posts'
                  onItemClicked={(id) =>
                    this.showPost(id)
                } />
              </div>
            )} />
            <Route path='/([^\/]+?)/([^\/]+?)' render={() => (
              <ItemDetail
                item={posts}
              />
            )} />
          </div>}
      </div>
    )
  }
}

App.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(App)
