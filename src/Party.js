import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Route } from 'react-router-dom'
import axios from 'axios'

import EditParty from './EditParty'
import Table from './Table.js'

class Party extends Component {
  constructor (props) {
    super (props)
    this.state = {
      editParty: false,
      editPartyId: '',
      showingTablesMatchingPartySize: false,
      matchingTablesArray: []
    }
    this.updatePartyState = this.updatePartyState.bind(this)
    this.getTablesMatchingPartySize = this.getTablesMatchingPartySize.bind(this)
  }

  updatePartyState () {
    this.setState({
      editParty: false
    })
  }

  updateMatchingTableState (data) {
    this.setState({
      showingTablesMatchingPartySize: !(this.state.showingTablesMatchingPartySize),
      matchingTablesArray: data
    })
  }

  // `this.props` will refer to each instance of a party.
  // this function is specific to each party
  getTablesMatchingPartySize (event) {
    const self = this
    event.preventDefault()
    axios({
      url: 'http://localhost:4741/tables/' + this.props.size + '/match',
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Token token=' + this.props.token
      }
    })
      .then((response) => {
        console.log(response.data.tables)
        self.updateMatchingTableState(response.data.tables)
      })
      .catch((error) => console.log(error))
  }

  render () {
    if (this.state.editParty) {
      return <Route push to='/edit_parties' render={() => (
        <EditParty user_id={this.props.user_id} token={this.props.token} id={this.state.editPartyId} callback={this.updatePartyState} onGetAllParties={this.props.onGetAllParties}/>
      )}/>
    }

    let matchingTables
    if (this.state.showingTablesMatchingPartySize) {
      matchingTables = this.state.matchingTablesArray.map((table, index) => <Table
        id={table.id}
        key={index}
        max_seat={table.max_seat}
        min_seat={table.min_seat}
        onDeleteTable={this.deleteTable}
        onGetAllTables={this.getAllTables}
        token={this.props.token}
      />)
      alert('time to show')
    } else {
      alert('time to hide')
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

        {matchingTables}

        <input onClick={(event) => this.setState({editParty:true, editPartyId:event.target.id})} type='button' value='Edit' id={this.props.id} />

        <input onClick={(event) => this.props.onDeleteProp(event)} type='button' value='Delete' id={this.props.id}/>

        <input onClick={this.getTablesMatchingPartySize} type='button' value='Tbls Matching Party Size' />
        {matchingTables}
      </div>
    )
  }
}

export default Party
