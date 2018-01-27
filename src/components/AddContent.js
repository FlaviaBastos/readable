import React from 'react'
import { connect } from 'react-redux'
import { writePost } from '../actions'
import serializeForm from 'form-serialize'
import cuid from 'cuid'
import { Button, Input, Row} from 'react-materialize'

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

class AddContent extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })
    values.id = cuid()
    values.timestamp = Date.now()
    this.props.dispatch(writePost(values))
  }

  render() {
    return (
      <div>
        <Row>
          <form onSubmit={this.handleSubmit}>
            <Input type="text" name="title" label="Post title" />
            <Input type="text" name="author" label="Author" />
            <Input type="select" label="Category" name="category" >
              <option value="react">react</option>
              <option value="redux">redux</option>
              <option value="udacity">udacity</option>
            </Input>
            <textarea type="textearea" name="body" placeholder="Post content" />
            <Button type="submit">+ Add post</Button>
          </form>
        </Row>
      </div>
    )
  }
}

export default connect(mapStateToProps)(AddContent)
