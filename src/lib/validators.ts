import {toast} from '@onerbs/daniela'

/**
 * Validate a password.
 *
 * A valid password:
 * - Is at least 8 characters long
 *
 * In `strong` mode, the password must have at least:
 * - One numeric character
 * - One capital letter
 *
 * @param text - The password to validate
 * @param strong - Enable the `strong` mode (false by default)
 * @todo: Require password to have a symbol in strong mode.
 */
export function password(text: string, strong = false) {
  const fail = (reason: string) => _fail(`The password ${reason}`)
  if (!text) {
    return fail('is required 🤗')
  }
  if (text.length < 8) {
    return fail('is too short 🙄')
  }
  if (strong) {
    if (!/\d/.test(text)) {
      return fail('must contains a number 🤓')
    }
    if (!/[A-Z]/.test(text)) {
      return fail('must contains a capital letter 🤭')
    }
  }
  return true
}

/**
 * Validate a room name.
 *
 * A valid room name:
 * - Starts and ends with a letter
 * - May contain white spaces
 * - Is at least 4 characters long
 * - Contain only alphanumeric characters or underscore
 *
 * @param text - The room name to validate
 */
export function roomname(text: string) {
  const fail = (reason: string) => _fail(`The room name is ${reason}`)
  if (!text) {
    return fail('required 🤗')
  }
  if (text.length < 4) {
    return fail('too short 🙄')
  }
  if (!/^[A-Za-z][A-Za-z0-9 _]+[A-Za-z]$/.test(text)) {
    return fail('not valid 😅')
  }
  return true
}

/**
 * Validate an username.
 *
 * A valid username:
 * - Starts with a letter
 * - Does not contain white spaces
 * - Is at least 4 characters long
 * - Contain only lowercase english letters or underscore
 *
 * @param text - The username to validate
 */
export function username(text: string) {
  const fail = (reason: string) => _fail(`The username is ${reason}`)
  if (!text) {
    return fail('required 🤗')
  }
  if (text.length < 4) {
    return fail('too short 🙄')
  }
  if (!/^[a-z][a-z_]+$/.test(text)) {
    return fail('not valid 😅')
  }
  return true
}

function _fail(message: string) {
  toast(`${message}`)
  return false
}
