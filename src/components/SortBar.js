import React from 'react'
import PropTypes from 'prop-types'

class SortBar extends React.Component {
  static propTypes = {
    onChangeView: PropTypes.func.isRequired
  }

  constructor(props) {
  super(props);
  this.state = {
    value: ''
  }
  this.changeView = this.changeView.bind(this);
}

  changeView = (e) => {
    this.setState({value: e.target.value})
    this.props.onChangeView(e.target.value)
  }

  render() {
    return (
      <div>
        <form>
            <select value={this.state.value} onChange={(e) => this.changeView(e)}>
              <option value="" disabled>Sort by...</option>
              <option value="recent">Most recent</option>
              <option value="comments">Most commented</option>
              <option value="popular">Highest Score</option>
            </select>
        </form>
      </div>
    )
  }
}

export default SortBar
