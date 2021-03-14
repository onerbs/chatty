import * as React from 'react'
import { base64Svg } from '@onerbs/ident'

type props = {
  value: string,
  size?: number,
}

export default function Avatar({ value, size = 24 }: props) {
  return (
    <img
      src={base64Svg(value, size)}
      alt={`${value}'s avatar`}
    />
  )
}
