import React from 'react'
import { decide } from 'daniela'

type props = {
  room: string,
  close(): void
}

export default function Menu({ room, close }: props) {
  async function leaveRoom() {
    if (await decide(`Are you sure you wanna leave ${room}?`)) {
      // todo: actually leave room.
      console.log(`Leaving ${room}...`)
    }
    close()
  }
  return (
    <div className="contextmenu room">
      <p onClick={leaveRoom}>Leave room</p>
    </div>
  )
}
