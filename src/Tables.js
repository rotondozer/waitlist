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
      // redirect: false
    }
    this.getActiveMenuItem = this.getActiveMenuItem.bind(this)
  }

  getActiveMenuItem (activeMenuItem) {
    console.log('Input = ' + activeMenuItem)
    this.setState({
      menuItem: activeMenuItem
    })
  }

  // componentWillMount () {
  //   this.setState({ redirect: true })
  // }
  //
  // componentDidMount () {
  //   this.setState({ redirect: false })
  // }

  render () {
    // if (this.state.redirect) {
    //   <Redirect to='all_tables' />
    // }
    return (
      <Router>
        <Grid divided relaxed='very'>
          <Grid.Row>
            <Grid.Column computer={3} tablet={5} mobile={16}>
              <TablesVertMenu getActiveMenuItem={this.getActiveMenuItem}/>
            </Grid.Column>

            <Grid.Column computer={10} tablet={8} mobile={16}>
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
