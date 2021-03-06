import {Action} from './actions'
import {toast} from '@onerbs/daniela'
import state from './state'

export function dispatch(action: Action): boolean {
  const prevState = state.current

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
        state.update({...prevState, ...action.user})
        break
      }
      return false

    case 'JOIN_ROOM':
      if (action.room) {
        state.update({...prevState, rooms: [...prevState.rooms, action.room]})
        break
      }
      return false

    case 'DO_NOTHING':
      console.log({ reason: action.reason })
  }
  return true
}
