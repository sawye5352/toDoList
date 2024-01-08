import React from 'react'

export default function checkAllRemaining({checkAll, todosRemaining}) {
  return (
    <div className="check-all-container">
          <div>
            <div className="button" onClick={() => checkAll()}>Check All</div>
          </div>

          <span>{todosRemaining} item{todosRemaining > 1 ? 's' : ''} remaining</span>
    </div>
  )
}
