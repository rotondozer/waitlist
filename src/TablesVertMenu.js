import React, { Component } from 'react'
import { Input, Label, Menu } from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class TablesVertMenu extends Component {
  constructor (props) {
    super (props)
    this.state = {
      activeItem: 'AllTables'
    }
    this.handleItemClick = this.handleItemClick.bind(this)
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    this.props.getActiveMenuItem(name)
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu vertical>
        <Menu.Item as={Link} to='/all_tables' name='AllTables' active={activeItem === 'AllTables'} onClick={this.handleItemClick}>
          <Label color='teal'>1</Label>
          All Tables
        </Menu.Item>

        <Menu.Item as={Link} to='/available_tables' name='AvailableTables' active={activeItem === 'AvailableTables'} onClick={this.handleItemClick}>
          <Label>51</Label>
          Avaialable
        </Menu.Item>

        <Menu.Item as={Link} to='/all_table_history' name='AllTableHistory' active={activeItem === 'AllTableHistory'} onClick={this.handleItemClick}>
          <Label>1</Label>
          All Table History
        </Menu.Item>

      </Menu>
    )
  }
}

export default TablesVertMenu
