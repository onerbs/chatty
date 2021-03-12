import {Action, clearState, saveUser, fatal, raise, doNothing} from './actions'
import {User, getUser} from './firebase'
import * as accounts from './accounts'
import {md5} from '@onerbs/hashy'

export async function signup(email: string, password: string): Promise<Action> {
  const username = email.split('@')[0]
  // Q: subscribe to the `Chatty` room for info and announcements?
  const candidate: User = {
    displayName: username,
    hash: md5.hash(email),
    rooms: [],
    username,
  }
  try {
    const userCredential = await accounts.signup(email, password)
    const uid = userCredential.user?.uid
    if (uid) {
      try {
        await getUser(uid).set(candidate)
        return saveUser(candidate)
      } catch (ex) {
        console.error(ex.message)
        return raise('The user was not created')
      }
    } else return fatal('UID failure')
  } catch (ex) {
    let {message} = ex
    if (message.includes('already in use')) {
      message = 'The username is taken'
    }
    return raise(message)
  }
}

export async function login(email: string, password: string): Promise<Action> {
  try {
    const credentials = await accounts.login(email, password)
    if (!credentials.user) {
      return raise(`Can't read user credentials`)
    }
    const {uid} = credentials.user
    const snapshot = await getUser(uid).get()
    if (!snapshot.exists) {
      return fatal(`The user's document does not exist`)
    }
    const user = snapshot.data()
    if (user) {
      return saveUser(user)
    } else {
      return raise('Got no data')
    }
  } catch (ex) {
    let {message} = ex
    if (message.includes('no user record')) {
      message = 'The user does not exist'
    }
    if (message.startsWith('The password is invalid')) {
      message = 'Wrong password'
    }
    if (message.includes('network error')) {
      return raise('Network error', '🌐')
    }
    return raise(message)
  }
}

export async function logout(): Promise<Action> {
  return accounts.logout()
    .then(() => clearState({ reason: 'Good bye! 👋' }))
    .catch(({ message }) => doNothing(message))
}
