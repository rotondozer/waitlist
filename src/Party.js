import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Route } from 'react-router-dom'
import EditParty from './EditParty'

class Party extends Component {
  constructor (props) {
    super (props)
    this.state = {
      editParty: false,
      editPartyId: ''
    }
    this.updatePartyState = this.updatePartyState.bind(this)
  }

  updatePartyState () {
    this.setState({
      editParty: false
    })

  }

  render () {
    if (this.state.editParty) {
      return <Route push to='/edit_parties' render={() => (
        <EditParty user_id={this.props.user_id} token={this.props.token} id={this.state.editPartyId} callback={this.updatePartyState} onGetAllParties={this.props.onGetAllParties}/>
      )}/>

    }

    return (
      <div>
        <div>
          <span className='field'>Name:</span> <span>{this.props.name}</span>
        </div>
        <div>
          <span className='field'>Size:</span> <span>{this.props.size}</span>
        </div>
        <div>
          <span className='field'>Estimated Wait:</span> <span>{this.props.estWait}</span>
        </div>
        <div>
          <span className='field'>Time Checked In:</span> <span>{this.props.checkedIn}</span>
        </div>
        <div>
          <span className='field'>Notes:</span> <span>{this.props.notes}</span>
        </div>

        <input onClick={(event) => this.setState({editParty:true, editPartyId:event.target.id})} type='button' value='Edit' id={this.props.id} />

        <input onClick={(event) => this.props.onDeleteProp(event)} type='button' value='Delete' id={this.props.id}/>
      </div>
    )
  }
}

export default Party
