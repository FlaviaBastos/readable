import React from 'react'
import * as API from '../utils/api'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

class CategoryHeader extends React.Component {
  static propTypes = {
    onChangeCategory: PropTypes.func.isRequired,
  }

  changeCategory = (e) => {
    this.props.onChangeCategory(e.target.textContent)
  }

  render() {
    const { categories } = this.props

    return (
      <div className='cat'>
        <nav>
          <div className="nav-wrapper">
            <a href="#" className="brand-logo right">Readable</a>
            <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
            <ul className="left hide-on-med-and-down">
              <li>
                <NavLink
                  to='/'
                  value='/'
                  onClick={(e) => this.changeCategory(e)}>
                  all
                </NavLink>
              </li>
              {categories && (
                categories.map(data => (
                  <li key={data.name}>
                    <NavLink
                      to={'/' + data.path}
                      value={'/' + data.path}
                      onClick={(e) => this.changeCategory(e)}>
                      {data.name}
                    </NavLink>
                  </li>
                ))
              )}
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

export default CategoryHeader
