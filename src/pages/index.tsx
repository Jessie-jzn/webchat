import React from 'react'
import SessionListBox from './components/session/SessionListBox'
import './index.scss'


const ImWorkBox = () => {
  return (
    <div className='main-warp'>
      <div className='main-box'>
          <SessionListBox/>
        </div>
    </div> 
  )
}

export default ImWorkBox