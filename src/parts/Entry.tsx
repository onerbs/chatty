import React from 'react'
import Avatar from './Avatar'

type entry = {
  name: string;
  action(): void;
};

// todo: 1) unread messages badge.
// todo: 2) last message preview.
export default function Entry({ name, action }: entry) {
  return (
    <div
      title={`Open the "${name}" room`}
      className="middle entry brick"
      onClick={action}
    >
      <Avatar to={name} size={40}/>
      <div className="padded brick">
        <div className="spread">
          <strong>{name}</strong>
          {/* 1 */}
          {/*<div className="badge">N</div>*/}
        </div>
        {/* 2 */}
        {/*<p className="small">Last message...</p>*/}
      </div>
    </div>
  )
}
