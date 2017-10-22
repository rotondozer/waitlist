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
          {/* Reservations Column - this can be pulled out and made into components */}
          <Grid.Column>
            <Segment>
              <Header as='h2' content='Reservations' />
              <List celled  relaxed='very'>
                <List.Item>
                  <List.Content>
                    <List.Header className='reso-name'><Icon name='quote left' /> John</List.Header>
                    <Icon name='user'/> <span>2</span> <br />
                    <Icon name='clock'/> <span>6:30</span> <br />
                    <Icon name='phone'/> <span>(401) 285-6290</span> <br />
                    <Icon name='payment'/> <span>...3209 9/23</span> <br />
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    {/* TODO wrap icons in divs, text-align left, then text align spans to the right? */}
                    <List.Header className='reso-name'><Icon name='quote left' /> Elisha</List.Header>
                    <Icon name='user'/><span>4</span> <br />
                    <Icon name='clock'/> <span>7:00</span> <br />
                    <Icon name='phone'/> <span>(401) 331-2584</span> <br />
                    <Icon name='payment'/> <span>...9921 1/24</span> <br />
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <List.Header className='reso-name'><Icon name='quote left' /> Anthony</List.Header>
                    <Icon name='user'/> <span>2</span> <br />
                    <Icon name='clock'/> <span>8:00</span> <br />
                    <Icon name='phone'/> <span>(508) 787-0014</span> <br />
                    <Icon name='payment'/> <span>...2360 10/20</span> <br />
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <List.Header className='reso-name'><Icon name='quote left' /> Dahlia</List.Header>
                    <Icon name='user'/> <span>5</span> <br />
                    <Icon name='clock'/> <span>8:15</span> <br />
                    <Icon name='phone'/> <span>(401) 846-5524</span> <br />
                    <Icon name='payment'/> <span>...8054 3/23</span> <br />
                  </List.Content>
                </List.Item>
              </List>
            </Segment>
          </Grid.Column>
          {/* 86 Column */}
          <Grid.Column>
            <Segment>
              <Header as='h2' content='86' />
              <List celled relaxed>
                <List.Item><Icon name='minus circle' />Scallops</List.Item>
                <List.Item><Icon name='minus circle' />Harpoon Summer</List.Item>
                <List.Item><Icon name='minus circle' />Gruyère</List.Item>
              </List>
            </Segment>
          </Grid.Column>
          {/* Additional Notes column */}
          <Grid.Column>
            <Segment>
              <Header as='h2' content='Additional Notes' />
              <List celled relaxed>
                <List.Item><Icon name='info circle' />Someone left their credit card at the bar last night. He'll be by to pick it up tonight</List.Item>
                <List.Item><Icon name='info circle' />The walk-in door gasket is coming loose. Please make sure staff is closing it <em>tightly</em></List.Item>
              </List>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default Home
