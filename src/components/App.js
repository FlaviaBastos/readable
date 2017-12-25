import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addContent } from '../actions'

class App extends Component {
  doThing = () => {
    this.props.dispatch(addContent({}))
  }
  render() {
    console.log('Props ', this.props)
    return (
      <div>
        ta-daaaaaa {`🎆`}
      </div>
    )
  }
}

function mapStateToProps (content) {
  return {
    content
  }
}

export default connect(mapStateToProps)(App)
