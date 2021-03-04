import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navigation from '../parts/Navigation'
import Sidebar from '../parts/Sidebar'
import Messages from '../parts/Messages'
import {getState} from '../lib/state'
import {Routes} from '../Chatty'

const state = getState()

function Allow() {
  const [room, setRoom] = useState('')
  const [rooms, setRooms] = useState(state.rooms)

  function closeRoom() {
    setRoom('')
  }

  return <>
    <Navigation room={room} setRooms={setRooms} closeRoom={closeRoom}/>
    <div className="chat">
      <Sidebar rooms={rooms} action={setRoom}/>
      <Messages room={room}/>
    </div>
  </>
}

function Deny() {
  return (
    <div className="Door">
      <p>Please, <Link to={Routes.LOG_IN}>login</Link> to view this page.</p>
    </div>
  )
}

export default function Chat() {
  return state.hash ? <Allow/> : <Deny/>
}
