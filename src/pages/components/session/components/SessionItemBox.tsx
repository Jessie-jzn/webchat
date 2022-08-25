import type { FC } from 'react'
import React,{useState,useEffect} from 'react'
import type { SessionItemType } from '../data.d'
import './sessionItemBox.scss'
interface SessionItemProps {
  item: SessionItemType
}
interface SessionItemTimeProps{
  time:string
}

const SessionItemBox: FC<SessionItemProps> = props => {
  const { item } = props
  return (
    <div className='flex-row sider-item'>
      <img src={item.avatar} className='avatar-img' />
      <div className='flex-column ml8'>
        <div className='flex-row'>
          <span className='_ellipsis-text'>{item.name}</span>
          <SiderBoxTimeUpdateBox time={item.lastTime} />
        </div>

        <span>{item.lastWord}</span>
      </div>
    </div>
  )
}

export default SessionItemBox

const SiderBoxTimeUpdateBox = ({ time }:SessionItemTimeProps) => {
  const [update, setUpdate] = useState(1)

  // 每分钟更新时间
  useEffect(() => {
    const id = setTimeout(() => {
      setUpdate(update + 1)
    }, 1000)

    return () => {
      clearTimeout(id)
    }
  })

  return (
    <span className='_ellipsis-text sider-user-time'>{getTimeDiff(time)}</span>
  )
}
