import React, { Component } from 'react'
import { Redirect } from 'react-router'
import Table from './Table.js'
import EditTable from './EditTable'
import axios from 'axios'

class Tables extends Component {
  constructor (props) {
    super (props)
    console.log(props)
    this.state = {
      tablesArray: [{id: 'placeholder'},{id: 'placeholder'}]
    }
    // this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getAllTables = this.getAllTables.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
    this.deleteTable = this.deleteTable.bind(this)
  }

  updateState (data) {
    this.setState({
      tablesArray: data
    })
  }

  handleOnClick (event) {
    console.log('handleOnClick ' + event.target.name)
    this.setState({
      [event.target.name]: true
    })
  }

  deleteTable (event) {
    event.preventDefault()
    const tableId = event.target.id
    console.log('calling deleteTable with id ' + tableId)
    axios({
      url: 'http://localhost:4741/tables/' + tableId,
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(() => this.getAllTables())
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
  }

  getAllTables () {
    const self = this
    axios({
      url: 'http://localhost:4741/tables',
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then((response) => {
        console.log(response.data.tables)
        self.updateState(response.data.tables)
      })
      .catch((error) => console.log(error))
  }

  componentDidMount () {
    this.getAllTables()
  }

  // handleChange (event) {
  //   this.setState({
  //     tableNum: event.target.value
  //   })
  //   // console.log(this.state.tableNum)
  // }

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
    if (this.state.addTable) {
      return <Redirect push to='/add_tables' />
    }
    const self = this
    if (this.state.tablesArray.length > 0) {
      const tables = this.state.tablesArray.map((table, index) => <Table
        id={table.id}
        key={index}
        max_seat={table.max_seat}
        min_seat={table.min_seat}
        onDeleteTable={this.deleteTable}
        onGetAllTables={this.getAllTables}
      />)
      return (
        <div>
          <h2>Tables</h2>

          <input name='addTable' onClick={this.handleOnClick} type='button' value={'Add Table'} />

          {tables}
        </div>
      )
    } else {
      return (
        <div>
          <h2>Tables</h2>
          <input name='addTable' onClick={this.handleOnClick} type='button' value={'Add Table'} />

          <p>"You haven't created any tables yet!"</p>
        </div>
      )
    }
  }
}

export default Tables
