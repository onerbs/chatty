import React from 'react'

type props = {
  to: string
  size?: number
}
export default function Avatar({to, size=32}: props) {
  // Q: Use a local avatar generator?
  const api = 'https://identicon-api.herokuapp.com'
  const url = `${api}/${to}/${size}?format=png`
  const alt = `${to}'s avatar`
  return <img alt={alt} title={to} src={url}/>
}
