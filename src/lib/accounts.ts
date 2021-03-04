//
// Firebase `auth` wrapper functions.
//

import {auth} from './firebase'
import {dispatch} from './reducer'
import {clearState} from './actions'

export function signup(email: string, password: string) {
  return auth.createUserWithEmailAndPassword(email, password)
}

export function login(email: string, password: string) {
  return auth.signInWithEmailAndPassword(email, password)
}

export function logout() {
  return auth.signOut().then(() => dispatch(clearState()))
}

export function getUser() {
  return auth.currentUser
}
