import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter, Switch } from 'react-router-dom'
import * as API from '../utils/api'
import CategoryHeader from './CategoryHeader'
import ItemsList from './ItemsList'
import ItemDetail from './ItemDetail'
import NewAddContent from './NewAddContent'
import NotFound from './NotFound'
import { fetchPosts, loadPosts } from '../actions'

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

  render() {
    const { categories, posts } = this.props

    return (
      <div>
        <CategoryHeader
          onChangeCategory={(category) => this.loadCategory(category)}
          categories={categories}
        />
        {posts &&
          <div>
            <Switch>
              <Route exact path='/' component={ItemsList} />
              <Route exact path='/add_content' component={NewAddContent} />
              <Route exact path='/:category' component={ItemsList} />
              <Route exact path='/:category/:id' component={ItemDetail} />
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
