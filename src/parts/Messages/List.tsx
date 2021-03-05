import React, {Fragment} from 'react'
import {Message} from '../../lib/firebase'
import Item from './Item'
import state from '../../lib/state'

function List({history}: {history: Message[]}) {
  return (
    <Fragment>
      {history.map(({ author, date, message }) => (
        <Item
          key={getKey(author)}
          foreign={author !== state.username}
          from={author}
          message={message}
          time={date}
        />
      ))}
    </Fragment>
  )
}

function getKey(author: string) {
  return `Item+${author}+${Math.random()}`
}

export default React.memo(List)
