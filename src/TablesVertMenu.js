import React, { Component } from 'react'
import { Input, Label, Menu } from 'semantic-ui-react'

class TablesVertMenu extends Component {
  constructor (props) {
    super (props)
    this.state = {
      activeItem: 'all'
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
        <Menu.Item name='all' active={activeItem === 'all'} onClick={this.handleItemClick}>
          <Label color='teal'>1</Label>
          All Tables
        </Menu.Item>

        <Menu.Item name='available' active={activeItem === 'available'} onClick={this.handleItemClick}>
          <Label>51</Label>
          Avaialable
        </Menu.Item>

        <Menu.Item name='history' active={activeItem === 'history'} onClick={this.handleItemClick}>
          <Label>1</Label>
          All Table History
        </Menu.Item>
        <Menu.Item>
          <Input icon='search' placeholder='Search mail...' />
        </Menu.Item>
      </Menu>
    )
  }
}

export default TablesVertMenu
