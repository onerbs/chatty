import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {input} from 'daniela'
import Avatar from './Avatar'
import Icon from './Icon'
import Menu from './Menu'
import {dispatch} from '../lib/reducer'
import * as rooms from '../lib/rooms'
import * as users from '../lib/users'
import * as validate from '../lib/validators'
import {Routes} from '../Chatty'
import state from '../lib/state'

type props = {
  room: string
  setRooms(callback: (prevState: string[]) => string[]): void
  closeRoom(): void
}

export default function Navigation({ room, setRooms, closeRoom }: props) {
  const history = useHistory()
  const [isMenuActive, setMenuActive] = useState(false)
  const showMenu = () => setMenuActive(() => true)
  const hideMenu = () => setMenuActive(() => false)

  async function joinRoom() {
    input('Join a room', 'Name', validate.roomname).then(async room => {
      if (room) {
        await rooms.join(room).then(dispatch)
        setRooms(prevState => ([ ...prevState, room ]))
      }
    })
  }

  async function closeSession() {
    if (!await users.logout().then(dispatch)) {
      history.push(Routes.HOME)
    }
  }

  return (<>
    {isMenuActive && <Menu room={room} close={hideMenu}/>}
    <div className="Navigation">
      <div>
        <Icon name="menu" title="Hi, I'm useless :)"/>
        <span>
          <Icon name="add" title="Join a room" onClick={joinRoom}/>
          <Icon name="exit_to_app" title="Log out" onClick={closeSession}/>
        </span>
      </div>
      <div>
        <span>
          {room && <Icon name="more_vert" title="Menu" onClick={showMenu}/>}
          &nbsp;
          <b>{room}</b>
        </span>
        <span>
          {room && <Icon name="close" title="Close" onClick={closeRoom}/>}
          <Avatar to={state.username}/>
        </span>
      </div>
    </div>
  </>)
}
