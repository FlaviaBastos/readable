import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter, Switch } from 'react-router-dom'
import * as API from '../utils/api'
import CategoryHeader from './CategoryHeader'
import SortBar from './SortBar'
import ItemsList from './ItemsList'
import ItemDetail from './ItemDetail'
import AddContent from './AddContent'
import NotFound from './NotFound'
import { fetchPosts, loadPosts, loadSorted } from '../actions'

class App extends Component {

  loadCategory (category) {
    if (category === 'all') {
      this.props.dispatch(fetchPosts())
    } else {
      API.getForCat(category).then((data) => {
        this.props.dispatch(loadPosts(data))
      })
    }
  }

  changeFilter (filterName) {
    const { posts } = this.props
    switch (filterName) {
      case 'recent':
        const newest = posts.sort((a, b) =>
          a.timestamp > b.timestamp ? -1 : 1)
        this.props.dispatch(loadSorted(newest))
        this.setState({ posts: posts })
        break
      case 'comments':
        const mostCommented = posts.sort((a, b) =>
          a.commentCount > b.commentCount ? -1 : 1)
        this.props.dispatch(loadSorted(mostCommented))
        this.setState({ posts: posts })
        break
      case 'popular':
        const mostVoted = posts.sort((a, b) =>
          a.voteScore > b.voteScore ? -1 : 1)
        this.props.dispatch(loadSorted(mostVoted))
        this.setState({ posts: posts })
        break
      default:
        this.props.dispatch(fetchPosts())
    }
  }

  render() {
    const { categories, posts } = this.props

    return (
      <div>
        <CategoryHeader
          onChangeCategory={(category) => this.loadCategory(category)}
          categories={categories}
        />
        <SortBar
          onChangeView={(byFilter) => this.changeFilter(byFilter)}
        />
        {posts &&
          <div>
            <Switch>
              <Route exact path='/' component={ItemsList} />
              <Route exact path='/add_content' component={AddContent} />
              <Route exact path='/:category' component={ItemsList} />
              <Route exact path='/:category/:id' component={ItemDetail} />
              <Route exact path='/:category/:id/add_comment' component={AddContent} />
              <Route component={NotFound} />
            </Switch>
          </div>
        }
      </div>
    )
  }
}

function mapStateToProps (state) {
  const { categories } = state.categories
  const { posts } = state.posts
  return { categories, posts }
}

export default withRouter(connect(mapStateToProps)(App))
