import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'

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

  render () {

    return (
      <Router>
        <Grid divided relaxed='very'>
          <Grid.Row>
            <Grid.Column computer={4} tablet={6} mobile={16}>
              <TablesVertMenu getActiveMenuItem={this.getActiveMenuItem}/>
            </Grid.Column>

            <Grid.Column computer={12} tablet={10} mobile={16}>
              <Route path='/all_tables' render={() => (
                <AllTables user_id={this.props.user_id} token={this.props.token} handleMessage={this.props.handleMessage}/>
              )} />

              <Route path='/available_tables' render={() => (
                <AvailableTables user_id={this.props.user_id} token={this.props.token} handleMessage={this.props.handleMessage}/>
              )} />

              <Route path='/all_table_history' render={() => (
                <AllTableHistory user_id={this.props.user_id} token={this.props.token} handleMessage={this.props.handleMessage}/>
              )} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Router>
    )
  }
}

export default Tables
