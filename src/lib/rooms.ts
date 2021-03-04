import {Message, arrayUnion, getRoom, getUser, pushMessage} from './firebase'
import {decide} from 'daniela'
import {Action, doNothing, joinRoom} from './actions'
import {getState} from './state'
import * as accounts from './accounts'

export async function join(name: string): Promise<Action> {
  const state = getState()
  if (state.rooms.includes(name)) {
    return doNothing(`Already joined to ${name}`)
  }
  const user = accounts.getUser()
  if (!user) {
    return doNothing(`There's no active user 🤔`)
  }
  const room = await getRoom(name)
  return room.get().then(async doc => {
    if (!doc.exists) {
      await room.set({
        owner: user.uid,
        members: [user.uid],
        isPublic: await decide('Make it public? 🌎'),
        $: 0
      })
    }
    await getUser(user.uid).update({
      rooms: arrayUnion(name)
    })
    return joinRoom(name)
  })
}

export async function push(text: string, author: string, room: string) {
  const message: Message = {
    date: new Date(),
    author: author,
    message: text,
  }
  await pushMessage(room, message)
  return doNothing('Message sent')
}
