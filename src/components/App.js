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
import { addContent, receiveContent, selectedCategory, goFetchContent } from '../actions'

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
  }

  componentDidMount() {
    const { dispatch, selectedCategory } = this.props
    dispatch(goFetchContent(selectedCategory))
  }

  render() {
    console.log('Props ', this.props)
    const { selectedCategory, posts, isFetching } = this.props

    return (
      <div>
        <p>Boom!</p>
        {isFetching && posts.length === 0 && <h2>Loading....</h2>}
        {!isFetching && posts.length === 0 && <h2>Empty :(</h2>}
        {posts.length > 0 &&
          <div>
            <p>Thing here....</p>
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

export default connect(mapStateToProps)(App);
