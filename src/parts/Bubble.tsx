import React from 'react'

type props = {
  foreign: boolean
  from: string
  message: string
  time: Date
}

// todo: 1) link to the user's chat.
export default function Bubble({ foreign, from, message, time }: props) {
  return (
    <div>
      {/* 1 */}
      {foreign && <p className="small">@{from}</p>}
      <div className="spread">
        {foreign || <div style={{ minWidth: '20%' }}/>}
        <span className={getClassName(foreign)}>
          {message.split('\n').map(line => (
            <p className="line" key={`Line+${Math.random()}`}>{line}&nbsp;</p>
          ))}
          <p className="time">{formatTime(time)}</p>
        </span>
        {foreign && <div style={{ minWidth: '20%' }}/>}
      </div>
    </div>
  )
}

function getClassName(foreign: boolean): string {
  return foreign ? 'bubble foreign' : 'bubble'
}

function formatTime(date: Date): string {
  return [date.getHours(), date.getMinutes()].map(withLeftZero).join(':')
}

function withLeftZero(number: number): string {
  return `0${number}`.slice(-2)
}
