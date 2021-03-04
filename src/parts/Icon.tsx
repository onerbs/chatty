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

export default function Icon({ name, title, small = false, onClick }: props) {
  return (
    <i
      className={getClassName(small)}
      onClick={onClick}
      title={title}
    >
      {name}
    </i>
  )
}

function getClassName(small: boolean): string {
  return small ? 'icon small' : 'icon'
}
