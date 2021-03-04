import {Action} from './actions'
import {getState} from './state'
import {toast} from 'daniela'

export function dispatch(action: Action): boolean {
  const state = getState()
  const savedState = state.current

  switch (action.type) {
    case 'CLEAR_STATE':
      if (action.reason) {
        toast(action.reason)
      }
      state.clear()
      return false

    case 'SAVE_STATE':
      if (action.state) {
        state.update(action.state)
        break
      }
      return false

    case 'SAVE_USER':
      if (action.user) {
        state.update({...savedState, ...action.user})
        break
      }
      return false

    case 'JOIN_ROOM':
      if (action.room) {
        state.update({...savedState, rooms: [...savedState.rooms, action.room]})
        break
      }
      return false

    case 'DO_NOTHING':
      if (action.reason) {
        console.info(action.reason)
        return true
      }
      return false
  }

  console.info(`Success: ${action.type}`)
  return true
}
