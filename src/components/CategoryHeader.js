import React from 'react'
import * as API from '../utils/api'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Navbar } from 'react-materialize'

class CategoryHeader extends React.Component {
  static propTypes = {
    onChangeCategory: PropTypes.func.isRequired,
    selected: PropTypes.string.isRequired
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
    const { selected } = this.props

    return (
      <div className='cat'>
        <Navbar brand='Readable' left>
          <ul>
            <li key="all">
              <NavLink
                to='/'
                value='/'
                activeClassName={selected === 'all' ? "active" : ""}
                onClick={(e) => this.changeCategory(e)}>
                all
              </NavLink>
            </li>
            {categories.map(data => (
              <li key={data.name}>
                <NavLink
                  to={data.path}
                  value={data.path}
                  activeClassName={selected === data.name ? "active" : ""} //not working
                  onClick={(e) => this.changeCategory(e)}>
                {data.name}
              </NavLink>
              </li>
            ))}
          </ul>
        </Navbar>
      </div>
    )
  }
}

export default CategoryHeader
