import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import axios from 'axios'

import AllTables from './AllTables.js'
import AvailableTables from './AvailableTables.js'
import AllTableHistory from './AllTableHistory.js'
import TablesVertMenu from './TablesVertMenu'

class Tables extends Component {
  constructor (props) {
    super (props)
    this.state = {
      menuItem: 'AllTables'
    }
    this.getActiveMenuItem = this.getActiveMenuItem.bind(this)
  }

  getActiveMenuItem (activeMenuItem) {
    this.setState({
      menuItem: activeMenuItem
    })
  }

  updateState (data) {
    this.setState({
      tablesArray: data
    })
  }

  // deleteTable (event) {
  //   event.preventDefault()
  //   const tableId = event.target.id
  //   axios({
  //     url: `http://localhost:4741/tables/${tableId}`,
  //     method: 'DELETE',
  //     headers: {
  //       'content-type': 'application/json',
  //       'Authorization': 'Token token=' + this.props.token
  //     }
  //   })
  //     .then(() => this.getAllTables())
  //     .then((response) => this.props._addNotification('success', 'Table Removed From the Dining Area'))
  //     .catch((error) => this.props._addNotification('error', 'Unauthorized'))
  // }

  render () {
    // has user_id in props
    return (
      <Router>
        <Grid divided relaxed='very'>
          <Grid.Row>
            <Grid.Column computer={4} tablet={6} mobile={16}>
              <TablesVertMenu getActiveMenuItem={this.getActiveMenuItem}/>
            </Grid.Column>

            <Grid.Column computer={12} tablet={10} mobile={16}>
              <Route path='/all_tables' render={() => (
                <AllTables user_id={this.props.user_id} token={this.props.token} _addNotification={this.props._addNotification}/>
              )} />

              <Route path='/available_tables' render={() => (
                <AvailableTables user_id={this.props.user_id} token={this.props.token} _addNotification={this.props._addNotification}/>
              )} />

              <Route path='/all_table_history' render={() => (
                <AllTableHistory user_id={this.props.user_id} token={this.props.token} _addNotification={this.props._addNotification}/>
              )} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Router>
    )
  }
}

export default Tables
