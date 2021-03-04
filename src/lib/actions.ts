import {State, User} from './firebase'

export type Actions
  = 'DO_NOTHING'
  | 'CLEAR_STATE'
  | 'SAVE_STATE'
  | 'SAVE_USER'
  | 'JOIN_ROOM'

interface Payload {
  room?: string
  reason?: string
  state?: State
  user?: User
}

export interface Action extends Payload {
  type: Actions
}

export function doNothing(reason: string): Action {
  return { type: 'DO_NOTHING', reason }
}

export function clearState(payload: Payload): Action {
  return { type: 'CLEAR_STATE', ...payload }
}

export function saveState(store: State): Action {
  return { type: 'SAVE_STATE', state: store }
}

export function saveUser(user: User): Action {
  return { type: 'SAVE_USER', user }
}

export function joinRoom(room: string): Action {
  return { type: 'JOIN_ROOM', room }
}

export function raise(error: string, emoji = '✋'): Action {
  return clearState({ reason: `${emoji} ${error}` })
}

export function fatal(error: string, emoji = '💥'): Action {
  return raise(`${error}. Please report!`, emoji)
}
