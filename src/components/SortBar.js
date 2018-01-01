import React from 'react'

class SortBar extends React.Component {
  render() {
    return (
      <div>
        <form>
          <label>
            Sort by:
            <select>
              <option value="recent">Most recent</option>
              <option value="popular">Highest Score</option>
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default SortBar
