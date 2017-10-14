import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import AllTables from './AllTables.js'
import AvailableTables from './AvailableTables.js'
import AllTableHistory from './AllTableHistory.js'
import TablesVertMenu from './TablesVertMenu'

class Tables extends Component {
  constructor (props) {
    super (props)
    this.state = {
      menuItem: 'all'
    }
    this.getActiveMenuItem = this.getActiveMenuItem.bind(this)
  }

  getActiveMenuItem (activeMenuItem) {
    console.log('Input = ' + activeMenuItem)
    this.setState({
      menuItem: activeMenuItem
    })
  }

  render () {
    return (
      <Router>
        <Grid>
          <Grid.Row>
            <Grid.Column width={3}>
              <TablesVertMenu getActiveMenuItem={this.getActiveMenuItem}/>
            </Grid.Column>

            <Grid.Column width={8}>
              <Route path='/all_tables' render={() => (
                <AllTables user_id={this.props.user_id} token={this.props.token} />
              )} />

              <Route path='/available_tables' render={() => (
                <AvailableTables user_id={this.props.user_id} token={this.props.token} />
              )} />

              <Route path='/all_table_history' render={() => (
                <AllTableHistory user_id={this.props.user_id} token={this.props.token} />
              )} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Router>
    )
  }
}

export default Tables
