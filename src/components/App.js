import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter, Switch } from 'react-router-dom'
import * as API from '../utils/api'
import CategoryHeader from './CategoryHeader'
import ItemsList from './ItemsList'
import ItemDetail from './ItemDetail'
import AddContent from './AddContent'
import NotFound from './NotFound'
import { fetchPosts, fetchCategories, loadPosts } from '../actions'

class App extends Component {
  componentWillMount () {
    this.props.dispatch(fetchCategories())
    this.props.dispatch(fetchPosts())
  }

  loadCategory (category) {
    if (category === 'all') {
      this.props.dispatch(fetchPosts())
    } else {
      API.getForCat(category).then((data) => {
        this.props.dispatch(loadPosts(data))
      })
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
        {posts && posts.length === 0 && <h5>There are no posts for your selection :(</h5>}
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
