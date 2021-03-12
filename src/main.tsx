import { detectCurrentTheme } from './lib/theme'
detectCurrentTheme()

import { isValidSession } from './lib/state'
console.assert(isValidSession(), 'The session has expired.')

import React, { StrictMode } from 'react'
import { render } from 'react-dom'

import 'nushi.sass'
import 'daniela.scss'
import 'chatty.sass'

import Chatty from './Chatty'

render(
  <StrictMode>
    <Chatty/>
  </StrictMode>,
  document.getElementById('chatty'),
)
