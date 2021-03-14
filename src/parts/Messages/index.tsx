import React, { Fragment, useState, useEffect, useRef } from 'react'
import { getMessages, getRoom, Message } from '../../lib/firebase'
import List from './List'
import Icon from '../Icon'
import * as rooms from '../../lib/rooms'
import { dispatch } from '../../lib/reducer'
import state from '../../lib/state'

type props = {
  room: string
}

export default function Messages({ room }: props) {
  if (!room) return <Fragment/>

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [hist, setHist] = useState<Message[]>([])
  const [text, setText] = useState('')
  const [rows, setRows] = useState(1)

  useEffect(() => {
    textareaRef.current?.focus()
    let unsubscribe = () => { }
    if (room) {
      console.log(`🔊 Listening to ${room}`)
      unsubscribe = getRoom(room).onSnapshot(() => (
        getMessages(room).then(setHist)
      ))
    }
    return () => {
      if (room) {
        console.log(`🔈 Stop listening to ${room}`)
        unsubscribe()
      }
    }
  }, [room])

  function sendMessage() {
    if (text.trim() && state.username) {
      setText('')
      setRows(1)
      rooms.push(text.trim(), state.username, room).then(dispatch)
    }
  }

  function onChange(ev: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(ev.target.value)
    setRows(ev.target.value.split('\n').length)
  }

  function onKeyPress(ev: React.KeyboardEvent<HTMLTextAreaElement>) {
    ev.ctrlKey && ev.key === 'Enter' && sendMessage()
  }

  return (
    <div className="Messages">
      <List history={hist}/>
      <span>
        <textarea ref={textareaRef}
          value={text} rows={rows}
          placeholder="Type your message"
          onChange={onChange}
          onKeyPress={onKeyPress}
        />
        <Icon
          name="send"
          title="Use Ctrl+Enter to send"
          onClick={sendMessage}
        />
      </span>
    </div>
  )
}
