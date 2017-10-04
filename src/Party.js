import React, { Component } from 'react'

const Party = props => (
  <div>
    <p>Name: {props.name}</p>
    <p>Size: {props.size}</p>
    <p>Estimated Wait: {props.estWait}</p>
    <p>Time Checked In: {props.checkedIn}</p>
    <p>Notes: {props.notes}</p>
    <input type='button' value='edit' id={props.id}/>
    <input onClick={(event) => props.onDeleteProp(event)} type='button' value='delete' id={props.id}/>
  </div>
)

export default Party
