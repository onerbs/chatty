import React, {Fragment} from 'react'
import {Message} from '../../lib/firebase'
import Bubble from '../Bubble'
import state from '../../lib/state'

function List({history}: {history: Message[]}) {
  return (
    <Fragment>
      {history.map(entry => (
        <Bubble
          key={`Message+${entry.author}+${Math.random()}`}
          foreign={entry.author !== state.username}
          from={entry.author}
          message={entry.message}
          time={entry.date}
        />
      ))}
    </Fragment>
  )
}

export default React.memo(List)
