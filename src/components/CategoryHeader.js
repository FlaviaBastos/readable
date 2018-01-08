import React from 'react'
import * as API from '../utils/api'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class CategoryHeader extends React.Component {
  static propTypes = {
    onChangeCategory: PropTypes.func.isRequired
  }

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

  changeCategory = (e) => {
    this.props.onChangeCategory(e.target.textContent)
  }

  render() {
    const { categories } = this.state

    return (
      <div className='cat'>
        <ul>
          <li key="all">
            <Link to='/' value='/' onClick={(e) => this.changeCategory(e)}>
              All
            </Link>
          </li>
          {categories.map(data => (
            <li key={data.name}>
              <Link to={data.path} value={data.path} onClick={(e) => this.changeCategory(e)}>
                {data.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default CategoryHeader
