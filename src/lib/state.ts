import {State} from './firebase'
import Bowser from 'bowser'
import md5 from './md5'

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

  get persistent(): boolean {
    return isPersistent(this.storage)
  }

  set persistent(persistent: boolean) {
    if (this.persistent !== persistent) {
      const newStorage = persistent
        ? localStorage
        : sessionStorage
      if (persistent) {
        newStorage.PERSIST = true
      } else {
        delete this.storage.PERSIST
      }
      transfer(this.storage, newStorage)
      this.storage = newStorage as StateType
    }
  }
}

const FIELD_DELIMITER = ';'

const state = new ApplicationState()
export default state

/** Check that the session is valid */
export function isValidSession(): boolean {
  const token = genToken()
  if (state.token) {
    if (state.token !== token) {
      clearStorage(localStorage)
      clearStorage(sessionStorage)
      state.token = token
      return false
    }
  } else {
    state.token = token
  }
  return true
}

/** Check if the specified storage is persistent */
function isPersistent(storage: Storage): boolean {
  return storage.PERSIST === 'true'
}

/** Generate a new session token */
function genToken(): string {
  const browserInfo = Bowser.parse(navigator.userAgent)
  return md5(JSON.stringify(browserInfo))
}

/** Clear the storage */
function clearStorage(storage: Storage): void {
  for (const key of getDeletableKeys(storage)) {
    delete storage[key]
  }
}

/** Transfer the data from one Storage to another */
function transfer(source: Storage, destiny: Storage): void {
  for (const key of getDeletableKeys(source)) {
    destiny[key] = source[key]
    delete source[key]
  }
}

/** Get the Object keys in lowercase */
function getDeletableKeys(source: Storage): string[] {
  return Object.keys(source)
    .filter(it => it !== it.toUpperCase())
}
