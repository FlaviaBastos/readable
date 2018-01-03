import React from 'react'

class ManageVotes extends React.Component {
  addVote = () => {
    console.log('vote added!');
  }

  removeVote = () => {
    console.log('vote removed!')
  }
  
  render() {
    return(
      <div>
        <button onClick={() => this.addVote()}>Upvote</button>
        <button onClick={() => this.removeVote()}>Downvote</button>
      </div>
    )
  }
}

export default ManageVotes
