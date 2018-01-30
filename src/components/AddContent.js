import React from 'react'
import PropTypes from 'prop-types'
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
    this.handleSubmitPost = this.handleSubmitPost.bind(this)
    this.handleSubmitComm = this.handleSubmitComm.bind(this)
  }

  static propTypes = {
    type: PropTypes.string.isRequired
  }

  handleSubmitPost = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })
    values.id = cuid()
    values.timestamp = Date.now()
    values.type = 'posts'
    this.props.dispatch(writePost(values))
  }

  handleSubmitComm = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })
    values.id = cuid()
    values.timestamp = Date.now()
    values.type = 'comments'
    // add parentID here
    this.props.dispatch(writePost(values))
  }

  render() {
    const { id, type } = this.props
    console.log('ID: ', id)

    return (
      <div>
        { type === 'posts' && (
          <Row>
            <form onSubmit={this.handleSubmitPost}>
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
        )}
        { type === 'comments' && (
          <Row>
            <form onSubmit={this.handleSubmitComm}>
              <Input type="text" name="author" label="Author" />
              <textarea type="textearea" name="body" placeholder="Post content" />
              <Button type="submit">+ Add comment</Button>
            </form>
          </Row>
        )}
      </div>
    )
  }
}

export default connect(mapStateToProps)(AddContent)
