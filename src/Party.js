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
        <EditParty id={this.state.editPartyId} callback={this.updatePartyState}/>
      )}/>

    }

    return (
      <div>
        <p>Name: {this.props.name}</p>
        <p>Size: {this.props.size}</p>
        <p>Estimated Wait: {this.props.estWait}</p>
        <p>Time Checked In: {this.props.checkedIn}</p>
        <p>Notes: {this.props.notes}</p>
        <input onClick={(event) => this.setState({editParty:true, editPartyId:event.target.id})} type='button' value='edit' id={this.props.id}/>
        <input onClick={(event) => this.props.onDeleteProp(event)} type='button' value='delete' id={this.props.id}/>
      </div>
    )
  }
}

export default Party
