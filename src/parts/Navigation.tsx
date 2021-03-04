import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {input} from 'daniela'
import Avatar from './Avatar'
import Icon from './Icon'
import Menu from './Menu'
import {dispatch} from '../lib/reducer'
import * as rooms from '../lib/rooms'
import * as accounts from '../lib/accounts'
import * as validate from '../lib/validators'
import {getState} from '../lib/state'
import {Routes} from '../Chatty'

type props = {
  room: string
  setRooms(callback: (prevState: string[]) => string[]): void
  closeRoom(): void
}

export default function Navigation({ room, setRooms, closeRoom }: props) {
  const [isMenuActive, setMenuActive] = useState(false)
  const showMenu = () => setMenuActive(() => true)
  const hideMenu = () => setMenuActive(() => false)

  const state = getState()
  const history = useHistory()

  async function joinRoom() {
    input('Join a room', 'Name', validate.roomname).then(async room => {
      await rooms.join(room).then(dispatch)
      setRooms(prevState => ([ ...prevState, room ]))
    })
  }

  async function closeSession() {
    await accounts.logout()
    history.push(Routes.HOME)
  }

  return (<>
    {isMenuActive && <Menu room={room} close={hideMenu}/>}
    <div className="Navbar">
      <div className="spread left-side">
        <Icon name="menu" title="Hi, I'm useless :)"/>
        <div className="middle">
          <Icon name="add" title="Join a room" onClick={joinRoom}/>
          <Icon name="exit_to_app" title="Log out" onClick={closeSession}/>
        </div>
      </div>
      <div className="spread right-side">
        <span className="middle">
          {room && <Icon name="more_vert" title="Menu" onClick={showMenu}/>}
          &nbsp;
          <b>{room}</b>
        </span>
        <span className="middle">
          {room && <Icon name="close" title="Close" onClick={closeRoom}/>}
          <Avatar to={state.username}/>
        </span>
      </div>
    </div>
  </>)
}
