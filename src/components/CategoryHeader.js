import React from 'react'
import * as API from '../utils/api'
import PropTypes from 'prop-types'

class CategoryHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    }
  }

  componentDidMount() {
    API.getCats().then((categories) => {
      this.setState({ categories: categories.categories })
    })
  }

  render() {
    const { categories } = this.state

    return (
      <div className='cat'>
        <ul>
          <li key="all">All</li>
          {categories.map(data => (
            <li key={data.name}>
              <a href={data.path}>
                {data.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default CategoryHeader
