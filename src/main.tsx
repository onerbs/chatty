import React, { StrictMode } from 'react'
import { render } from 'react-dom'

import 'nushi.css'
import 'daniela.css'
import 'chatty.css'

import Chatty from './Chatty'

import md5 from './lib/md5'
import {isValidSession} from './lib/state'

console.assert(isValidSession(), 'The session has expired.')
console.assert(
  md5('hello') == '5d41402abc4b2a76b9719d911017c592',
  'The MD5 function is not working properly.'
)

render(
  <StrictMode>
    <Chatty/>
  </StrictMode>,
  document.getElementById('root'),
)
