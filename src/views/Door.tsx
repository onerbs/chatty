import React, {useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import * as validate from '../lib/validators'
import * as users from '../lib/users'
import {dispatch} from '../lib/reducer'
import {Routes} from '../Chatty'
import state from '../lib/state'

type props = {
  text: {
    button: string
    link: string
    route: string
  }
}

export default function Door({ text }: props) {
  const history = useHistory()
  const [disabled, setDisabled] = useState(false)
  const [data, setData] = useState({
    persistent: state.persistent,
    username: '',
    password: '',
  })

  useEffect(() => {
    if (state.hash) {
      history.push(Routes.CHAT)
    }
  }, [])

  function onInputChange(event: any) {
    const { name, value } = event.target
    setData(prevState => ({ ...prevState, [name]: value }))
  }

  function onCheckboxChange() {
    setData(prevState => ({
      ...prevState,
      persistent: !prevState.persistent
    }))
  }

  async function onSubmit(ev: any) {
    ev.preventDefault()
    const { username, password } = data
    if (
      validate.username(username) &&
      validate.password(password)
    ) {
      state.persistent = data.persistent
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
  }

  // todo: 1) Display validation info.
  return (
    <div className='Door'>
      <form onSubmit={onSubmit}>
        <h1>Chatty</h1>
        <label>Username {/* 1 */}
          <input
            type="text"
            name="username"
            value={data.username}
            onChange={onInputChange}
            disabled={disabled}
          />
        </label>
        <label>Password {/* 1 */}
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={onInputChange}
            disabled={disabled}
          />
        </label>
        <label>
          <input
            type="checkbox"
            checked={data.persistent}
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
