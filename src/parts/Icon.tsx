import React from 'react'

//
// Frontend to Material Icons
//

type props = {
  name: string
  title?: string
  small?: boolean
  onClick?(event: any): void
}

export default function Icon({ name, title, onClick }: props) {
  return (
    <i
      className="icon"
      onClick={onClick}
      title={title}
    >
      {name}
    </i>
  )
}
