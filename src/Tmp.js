import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { Input, Menu, Segment } from 'semantic-ui-react'

import Tables from './Tables'
import Waitlist from './Waitlist'

export default class MenuExampleTabularOnTop extends Component {
  state = { activeItem: 'Tables' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu attached='top' tabular>

          <Menu.Item as={Link} to='/tables' name='Tables' active={activeItem === 'Tables'} onClick={this.handleItemClick} />

          <Menu.Item as={Link} to='/waitlist' name='Waitlist' active={activeItem === 'Waitlist'} onClick={this.handleItemClick} />
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input transparent icon={{ name: 'search', link: true }} placeholder='Search users...' />
            </Menu.Item>
          </Menu.Menu>
        </Menu>

        <Segment attached='bottom'>
          <img src='/assets/images/wireframe/paragraph.png' />
          <p>Boooooooooogerrrzzzzzz</p>
          <Route path='/tables' render={() => (
            <Tables user_id={this.state.user_id} token={this.state.token} />
          )} />
          <Route path='/waitlist' render={() => (
            <Waitlist user_id={this.state.user_id} token={this.state.token} />
          )} />
        </Segment>
      </div>
    )
  }
}
