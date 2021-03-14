import React, { useEffect, useState, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import * as validate from '../lib/validators'
import * as users from '../lib/users'
import { dispatch } from '../lib/reducer'
import { Routes } from '../Chatty'
import { modalHTML } from '@onerbs/daniela'
import Icon from '../parts/Icon'
import state from '../lib/state'

type props = {
  text: {
    button: string
    link: string
    route: string
  }
}

export default function Door({ text }: props) {
  const [data, setData] = useState({
    username: '',
    password: '',
  })
  const [attempts, setAttempts] = useState({
    username: 0,
    password: 0,
  })
  const [disabled, setDisabled] = useState(false)
  const [persistent, setPersistent] = useState(state.persistent)
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const history = useHistory()

  useEffect(() => {
    if (state.hash) {
      history.push(Routes.CHAT)
    }
  }, [])

  function onInputChange(event: any) {
    const { name, value } = event.target
    setData(prev => ({ ...prev, [name]: value }))
    switch(name) {
      case 'username':
        usernameRef.current?.classList.remove('error')
        break
      case 'password':
        passwordRef.current?.classList.remove('error')
        break
    }
  }

  function onCheckboxChange() {
    setPersistent(!persistent)
  }

  async function onSubmit(ev: any) {
    ev.preventDefault()
    const { username, password } = data

    if (validate.username(username)) {
      setAttempts(prev => ({ ...prev, username: 0 }))
      usernameRef.current?.classList.remove('error')
    } else {
      setAttempts(prev => ({ ...prev, username: prev.username + 1 }))
      usernameRef.current?.classList.add('error')
      return
    }

    if (validate.password(password)) {
      setAttempts(prev => ({ ...prev, password: 0 }))
      passwordRef.current?.classList.remove('error')
    } else {
      setAttempts(prev => ({ ...prev, password: prev.password + 1 }))
      passwordRef.current?.classList.add('error')
      return
    }

    state.persistent = persistent
    const email = `${username}@chatty.app`
    const operation = text.route === Routes.SIGN_UP
      ? users.login
      : users.signup
    setDisabled(true)
    if (await operation(email, password).then(dispatch)) {
      history.push(Routes.CHAT)
    } else {
      setDisabled(false)
    }
  }

  return (
    <div className='Door'>
      <form onSubmit={onSubmit}>
        <h1>Chatty</h1>
        <label>Username {attempts.username > 0 && <HelpUsername />}
          <input
            type="text"
            name="username"
            value={data.username}
            onChange={onInputChange}
            disabled={disabled}
            ref={usernameRef}
          />
        </label>
        <label>Password {attempts.password > 0 && <HelpPassword />}
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={onInputChange}
            disabled={disabled}
            ref={passwordRef}
          />
        </label>
        <label>
          <input
            type="checkbox"
            checked={persistent}
            onChange={onCheckboxChange}
            disabled={disabled}
          />
          Remember my session
        </label>
        <button disabled={disabled}>{text.button}</button>
        <span>or <Link replace to={text.route}>{text.link}</Link></span>
      </form>
    </div>
  )
}

function HelpUsername() {
  return <HelpIcon action={async () => {
    await modalHTML('A valid username', `
<ul>
  <li>Starts with a letter</li>
  <li>Does not contain white spaces</li>
  <li>Is at least 4 characters long</li>
  <li>Contain only lowercase english letters or underscore</li>
</ul>`)
  }} />
}

function HelpPassword() {
  return <HelpIcon action={async () => {
    await modalHTML('A valid password', `
<ul>
  <li>Is at least 8 characters long</li>
</ul>`)
  }} />
}

function HelpIcon({ action }: { action(): void }) {
  return (
    <Icon
      name="help_outline"
      title="Get validation info"
      onClick={() => action()}
    />
  )
}
