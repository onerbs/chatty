import {State} from './firebase'
import Bowser from 'bowser'
import md5 from './md5'

export const getState = () => (
  new ApplicationState()
)

type StateType = Storage & State<string>

class ApplicationState implements State {
  private storage: StateType

  constructor() {
    this.storage = (
      isPersistent(localStorage)
        ? localStorage
        : sessionStorage
    ) as StateType
  }

  get hash() {
    return this.storage.hash || ''
  }

  get rooms() {
    return this.storage.rooms
      ? this.storage.rooms.split(FIELD_DELIMITER)
      : []
  }

  get token() {
    return this.storage.token || ''
  }

  get username() {
    return this.storage.username || ''
  }

  get displayName() {
    return this.storage.displayName || ''
  }

  set hash(hash: string) {
    this.storage.hash = hash
  }

  set rooms(rooms: string[]) {
    this.storage.rooms = rooms.join(FIELD_DELIMITER)
  }

  set token(token: string) {
    this.storage.token = token
  }

  set username(username: string) {
    this.storage.username = username
  }

  set displayName(displayName: string) {
    this.storage.displayName = displayName
  }

  get current(): State {
    return {
      hash: this.hash,
      rooms: this.rooms,
      token: this.token,
      username: this.username,
      displayName: this.displayName,
    }
  }

  /** Update the storage with the provided store */
  update(state: State): void {
    this.hash        = state.hash
    this.rooms       = state.rooms
    this.token       = state.token
    this.username    = state.username
    this.displayName = state.displayName
  }

  /** Clear the storage and return a blank state */
  clear(): void {
    clearStorage(this.storage)
    this.token = genToken()
  }

  get persistent() {
    return isPersistent(this.storage)
  }

  set persistent(persistent: boolean) {
    if (!this.persistent === persistent) {
      const keys = Object.keys(this.storage)
      const oldStorage = this.storage
      const newStorage = this.persistent
        ? sessionStorage
        : localStorage
      for (let key of keys) {
        newStorage.setItem(key, `${oldStorage.getItem(key)}`)
      }
      if (persistent) {
        newStorage.setItem(PERSISTENT, TRUE)
      } else {
        newStorage.removeItem(PERSISTENT)
      }
      oldStorage.clear()
      this.storage = newStorage as StateType
    }
  }
}

/** Check that the session is valid */
export function isValidSession(): boolean {
  const storage = getState()
  const token = genToken()
  if (storage.token) {
    if (storage.token !== token) {
      clearStorage(localStorage)
      clearStorage(sessionStorage)
      storage.token = token
      return false
    }
  } else {
    storage.token = token
  }
  return true
}

/** Check if the specified storage is persistent or not */
function isPersistent(storage: Storage): boolean {
  return storage.getItem(PERSISTENT) === TRUE
}

/** Generate a new session token */
function genToken(): string {
  const browserInfo = Bowser.parse(navigator.userAgent)
  return md5(JSON.stringify(browserInfo))
}

/** Clear the storage */
function clearStorage(storage: Storage): void {
  if (isPersistent(storage)) {
    storage.clear()
    storage.setItem(PERSISTENT, TRUE)
  } else {
    storage.clear()
  }
}

const FIELD_DELIMITER = ';'
const PERSISTENT = 'persistent'
const TRUE = true.toString()
