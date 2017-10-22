import React, { Component } from 'react'
import {
  Grid,
  Segment,
  Header,
  Icon,
  List
} from 'semantic-ui-react'

class Home extends Component {
  constructor (props) {
    super (props)
  }

  render () {
    return (
      <Grid columns={3} divided>
        <Grid.Row stretched>
          <Grid.Column>
            <Segment>
              <Header as='h2' content='Reservations' />
              <List celled>
                <List.Item>
                  <List.Content>
                    <List.Header className='reso-name'><Icon name='quote left' /> John</List.Header>
                    <Icon name='user'/> 2 <br />
                    <Icon name='clock'/> 6:30 <br />
                    <Icon name='phone'/> (401) 285-6290 <br />
                    <Icon name='payment'/> ...3209 9/23 <br />
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <List.Header className='reso-name'><Icon name='quote left' /> Elisha</List.Header>
                    <Icon name='user'/> 4 <br />
                    <Icon name='clock'/> 7:00 <br />
                    <Icon name='phone'/> (401) 331-2584 <br />
                    <Icon name='payment'/> ...9921 1/24 <br />
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <List.Header className='reso-name'><Icon name='quote left' /> Anthony</List.Header>
                    <Icon name='user'/> 2 <br />
                    <Icon name='clock'/> 8:00 <br />
                    <Icon name='phone'/> (508) 787-0014 <br />
                    <Icon name='payment'/> ...2360 10/20 <br />
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <List.Header className='reso-name'><Icon name='quote left' /> Dahlia</List.Header>
                    <Icon name='user'/> 5 <br />
                    <Icon name='clock'/> 8:15 <br />
                    <Icon name='phone'/> (401) 846-5524 <br />
                    <Icon name='payment'/> ...8054 3/231 <br />
                  </List.Content>
                </List.Item>
              </List>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <Header as='h2' content='86' />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <Header as='h2' content='Additional Notes' />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default Home
