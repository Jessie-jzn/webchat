import React from 'react'
import './session.scss'
import { Skeleton } from 'antd'
import Indentation from '@components/indentation/index'
import sessionList from './list.json'
import SessionItemBox from './components/SessionItemBox'

const SessionListBox = () => {
  const list = sessionList?.result || []
  const loading = false

  return (
    <>
      <Indentation width={200} placement='left'>
        <>
          <div className='session-box'>
            <div className='session-content-box'>
              <Skeleton avatar loading={loading}>
                {list.map((item) => (
                  <SessionItemBox key={item.sessionId} item={item} />
                ))}
              </Skeleton>
            </div>
          </div>
        </>
      </Indentation>
    </>
  )
}
export default SessionListBox
