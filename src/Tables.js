import React, { Component } from 'react'

class Tables extends Component {
  constructor (props) {
    super (props)
    this.state = {
      tableNum: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    this.setState({
      tableNum: event.target.value
    })
    // console.log(this.state.tableNum)
  }

  handleSubmit (event) {
    event.preventDefault()
    let base = this
    let tableNum = this.state.tableNum
    fetch(`http://localhost:4741/tables/${tableNum}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
      })
      .catch((error) => console.log('something went wrong', error))
  }

  render () {
    return (
      <div>
        {/* Add navbar with links to:
          All,
          Available,
          Ready to Queue (unavailable but unassigned)
          In Queue (unavailable and assigned),
          History
           */}
        <h3>Table Number:</h3>
        <h3>Max Occupancy:</h3>
        <h3>Min Occupancy:</h3>
        <form onSubmit={this.handleSubmit}>
          <input placeholder='Enter table number' value={this.state.value} onChange={this.handleChange}></input>
          <button>Get Table</button>
        </form>
      </div>
    )
  }
}

export default Tables
