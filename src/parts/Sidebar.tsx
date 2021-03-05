import React from 'react'
import Entry from './Entry'

type props = {
  rooms: string[]
  action(uid: string): void
}

export default function Sidebar({ rooms, action }: props) {
  // todo: implement search input.
  return (
    <div className="Sidebar">
      {/*<input type="text" placeholder="Search"/>*/}
      {rooms.map(name => (
        <Entry
          name={name}
          key={`Room+${name}`}
          action={() => action(name)}
        />
      ))}
    </div>
  )
}
