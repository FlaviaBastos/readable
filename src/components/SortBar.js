import React from 'react'
import PropTypes from 'prop-types'
import { Input, Row } from 'react-materialize'

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
        <Row>
            <Input
              s={4} type='select'
              label="Sort by ..."
              value={this.state.value}
              onChange={(e) => this.changeView(e)}>
              <option value="recent">Most recent</option>
              <option value="comments">Most commented</option>
              <option value="popular">Highest Score</option>
            </Input>
        </Row>
      </div>
    )
  }
}

export default SortBar
