import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import {md5} from '@onerbs/hashy'

const app = firebase.initializeApp({
  apiKey: 'AIzaSyDcMFlMPQgJmgDQMUPCOBj7CfLFUSwGu7g',
  appId: '1:151018008361:web:4385dd97312e6b8a815138',
  authDomain: 'chatapp-219eb.firebaseapp.com',
  databaseURL: 'https://chatapp-219eb.firebaseio.com',
  messagingSenderId: '151018008361',
  projectId: 'chatapp-219eb',
  storageBucket: 'chatapp-219eb.appspot.com',
})

export const {arrayUnion, arrayRemove} = firebase.firestore.FieldValue
export const auth = app.auth()

type S = string | string[]

export interface State<T extends S = string[]> extends User<T> {
  /** The session token */
  token: string
}

export interface User<T extends S = string[]> {
  /** The User display name */
  displayName: string
  /** The hash of the User email */
  hash: string
  /** The array of rooms the User is watching */
  rooms: T
  /** The User username */
  username: string
}

interface Room {
  /** The unique ID of the room owner */
  owner: string
  /** The array of unique IDs of the room members */
  members: string[]
  /**
   * Whether the room is public or not.
   * Currently does nothing.
   * @todo Implement password access.
   */
  isPublic: boolean
  /** Timestamp of the last activity */
  $: number
}

interface BaseMessage<D> {
  /** The message date */
  date: D,
  /** The message author username */
  author: string,
  /** The message content */
  message: string
}
export type Message = BaseMessage<Date>
export type CloudMessage = BaseMessage<number>

type Data<T> = firebase.firestore.DocumentData & T
type Document<T> = firebase.firestore.DocumentReference<T>
type Collection<T> = firebase.firestore.CollectionReference<Data<T>>

const firestore = app.firestore()

/// Functions

function getCollection<T>(path: string) {
  return firestore.collection(path) as Collection<T>
}

/**
 * Retrieve the specified user document.
 * @param uid - The User unique ID
 */
export function getUser(uid: string): Document<User> {
  return getCollection<User>('users').doc(uid)
}

/**
 * Retrieve the specified room document.
 * @param name - The name of the room
 */
export function getRoom(name: string): Document<Room> {
  return getCollection<Room>('rooms').doc(md5.hash(name))
}

/**
 * @param room - The room name
 * @param name - The collection name
 */
function getRoomCollection<T>(room: string, name: string): Collection<T> {
  return getRoom(room).collection(name) as Collection<T>
}

/**
 * @param room - The room name
 */
function getHistory(room: string): Collection<CloudMessage> {
  return getRoomCollection<CloudMessage>(room, 'history')
}

/**
 * Retrieve the messages of the provided room.
 * @param room - The room name
 * @todo: Implement pagination
 */
export async function getMessages(room: string): Promise<Message[]> {
  const self = await getHistory(room).get()
  return self.docs.map(doc => toMessage(doc.data()))
}

/**
 * Post a message to the specified room.
 * @param room - The room name
 * @param message - The message
 */
export async function pushMessage(room: string, message: Message) {
  const cloudMessage = toCloudMessage(message)
  await (getHistory(room).doc(`${cloudMessage.date}`).set(cloudMessage))
  return getRoom(room).update({$: cloudMessage.date})
}

/**
 * Helper function to convert a `CloudMessage` to a regular `Message`.
 * @param message - The message to be converted
 */
function toMessage(message: Data<CloudMessage>): Message {
  return ({ ...message, date: new Date(message.date) })
}

/**
 * Helper function to convert a regular `Message` to a `CloudMessage`.
 * @param message - The message to be converted
 */
function toCloudMessage(message: Message): CloudMessage {
  return { ...message, date: message.date.getTime() }
}
