import React, { Component } from 'react'
import { Redirect } from 'react-router'
import Table from './Table.js'
import TablesVertMenu from './TablesVertMenu'
import EditTable from './EditTable'
import axios from 'axios'

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

  redirectToActiveMenuItem () {
    console.log('render ' + this.state.menuItem)
  }

  render () {
    this.redirectToActiveMenuItem()
    return (
      <div>
        <TablesVertMenu getActiveMenuItem={this.getActiveMenuItem}/>
        {/* state is one behind click on menu item */}
        {this.state.menuItem}
      </div>
    )
  }
}

export default Tables
