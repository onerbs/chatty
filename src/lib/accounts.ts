//
// Firebase `auth` wrapper functions.
//

import {auth} from './firebase'

export function signup(email: string, password: string) {
  return auth.createUserWithEmailAndPassword(email, password)
}

export function login(email: string, password: string) {
  return auth.signInWithEmailAndPassword(email, password)
}

export function logout() {
  return auth.signOut()
}

export function getUser() {
  return auth.currentUser
}
