import React, { Component } from 'react'
import axios from 'axios'
import {
  Table as TableUI,
  Button,
  Header,
  Segment,
  Container,
  Form,
  Divider
} from 'semantic-ui-react'
import { Redirect } from 'react-router'

class AddTable extends Component {
  constructor (props) {
    super (props)
    this.state = {
      max_seat: '',
      min_seat: '',
      addedTable: false
    }
    this.createTable = this.createTable.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  createTable (event) {
    event.preventDefault()
    axios({
      url: 'http://localhost:4741/tables',
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Token token=' + this.props.token
      },
      data: {
        table: {
          max_seat: this.state.max_seat,
          min_seat: this.state.min_seat,
          user_id: this.props.user_id
        }
      }
    })
      .then((response) => this.props._addNotification('success', 'Table Added to Dining Area'))
      .then(() => this.setState({addedTable:true}))
      .catch((error) => this.props._addNotification('error', 'Something went wrong'))
  }

  handleChange (event) {
    let attribute = event.target.name
    let value = event.target.value
    this.setState({
      [attribute]: value
    })
  }

  render () {
    if (this.state.addedTable) {
      this.setState({addedTable:false})
      return <Redirect push to='/tables'/>
    }
    return (
      <Container>
        <Header as='h2'>Add a Table to the Dining Area</Header>
        <Form size='medium' onSubmit={this.createTable}>
          <Form.Group widths='equal'>
            <Form.Field
              name='max_seat'
              label='Max Guests'
              control='input'
              placeholder='Max Guests'
              onChange={this.handleChange}
              value={this.state.max_seat}
            />
            <Form.Field
              name='min_seat'
              label='Minimum Guests'
              control='input'
              placeholder='Min Guests'
              onChange={this.handleChange}
              value={this.state.min_seat}
            />
          </Form.Group>
          <Button type='submit' color='teal'>Add Table</Button>
          <Divider hidden />
        </Form>
      </Container>
    )
  }
}

export default AddTable
