import React, {Fragment, useState} from 'react'
import {Link} from 'react-router-dom'
import ToggleDarkMode from '../parts/ToggleDarkMode'
import {Routes} from '../Chatty'
import * as users from '../lib/users'
import state from '../lib/state'
import { dispatch } from '../lib/reducer'

// todo: Write a proper description 🤪
export default function Home() {
  const [isLoggedIn, setLoggedIn] = useState(!!state.hash)

  async function closeSession() {
    if (!(await users.logout().then(dispatch))) {
      setLoggedIn(false)
    }
  }

  return (
    <Fragment>
      <nav>
        <h1>Chatty</h1>
        <ul>
          <Links isLoggedIn={isLoggedIn} closeSession={closeSession}/>
          <li><ToggleDarkMode/></li>
        </ul>
      </nav>
      <main>
        <h2>A room-based chat app</h2>
        <p>
          {/* 3 */}
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Aliquid blanditiis ea hic impedit libero maxime,
          nostrum optio repellat repellendus sint sit voluptas voluptate.
          Aliquid, amet dolor necessitatibus nemo officiis recusandae<i>!</i>
        </p>
        <br/>
        <small>
          Copyright &copy; 2020&ndash;2021 Alejandro El&iacute;<br/>
          Released under the MIT License<br/>Review the source code on 
          <a href="https://github.com/onerbs/chatty" target="_blank">GitHub</a>.
        </small>
      </main>
      <footer>
        Created with <span style={{color: "var(--color-link)"}}>&hearts;</span> 
        by <a href="https://github.com/onerbs" target="_blank">@onerbs</a>
      </footer>
    </Fragment>
  )
}

type props = {
  isLoggedIn: boolean
  closeSession(): void
}

function Links({isLoggedIn, closeSession}: props) {
  return isLoggedIn
    ? (
      <Fragment>
        <li><Link to="#" onClick={closeSession}>Log Out</Link></li>
        <li><Link to={Routes.CHAT}>Open the chat</Link></li>
      </Fragment>
    )
    : (
      <Fragment>
        <li><Link to={Routes.LOG_IN}>Log In</Link></li>
        <li><Link to={Routes.SIGN_UP}>Sign Up</Link></li>
      </Fragment>
    )
}
