import React from 'react'

type props = {
  foreign: boolean
  from: string
  message: string
  time: Date
}

export default function Item({ foreign, from, message, time }: props) {
  return (
    <div>
      {foreign && <small>@{from}</small>}
      <div className={getClassName(foreign)}>
        {message.split('\n').map(line => (
          <p key={`Line+${Math.random()}`}>{line}&nbsp;</p>
        ))}
        <p>{formatTime(time)}</p>
      </div>
    </div>
  )
}

function getClassName(foreign: boolean): string {
  return foreign ? 'foreign' : ''
}

function formatTime(date: Date): string {
  return [date.getHours(), date.getMinutes()].map(withLeftZero).join(':')
}

function withLeftZero(number: number): string {
  return `0${number}`.slice(-2)
}
