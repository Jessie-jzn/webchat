import React, { useState,useContext} from 'react'
import classNames from 'classnames'
import { ConfigContext } from '../config-provider';
import './style/indentation.less'

export const tuple = <T extends string[]>(...args: T) => args;

const PlacementTypes = tuple('right', 'left');
type placementType = typeof PlacementTypes[number];
type IndentationProps = {
  prefixCls?: string
  defaultFolded?: boolean
  direction?: string
  placement?: placementType
  propsFolded?:boolean
  bodyStyle?:object
  indicatorStyle?:object
  width:number
}

const Indentation: React.FC<IndentationProps> = ({
  children,
  prefixCls:customizePrefixCls,
  propsFolded = false,
  placement='left' as placementType,
  bodyStyle={},
  indicatorStyle={},
  width
}) => {
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('indertation', customizePrefixCls);

  const [isFolded,setIsFolded] = useState(propsFolded) // 是否折叠，默认false
  const renderBody = () => {
    return <div style={{visibility: isFolded ? 'hidden' :'visible', width}}>{children}</div>
  }

  // 切换折叠函数
  const onSwitchFolded = () => {
    setIsFolded(!isFolded)
  }
  
  const getFoldedStyle = () =>{
    const getPushTransform = (_placement:placementType) =>{
      if(_placement === 'left' || _placement === 'right'){
        return `translateX(${_placement === 'left' ? -width : width}px)`;
      }
      return undefined
    }
    return {
      ...bodyStyle,
      transform:isFolded? getPushTransform(placement):undefined,
      width,
      [placement]:0,
    };
  }

  const indicatorsStyle = () => {
    return {
      ...indicatorStyle,
      [placement]: width,
    }
  }


  return (
    <div className={prefixCls}>
      <div
        className={`${prefixCls}-main-box`}
        style={getFoldedStyle()}
      >
        {renderBody()}

        <div className={`${prefixCls}-indicator-box`} style={indicatorsStyle()}>
          <div className={`${prefixCls}-root`}>
            <i className={classNames(`${prefixCls}-line`,`${prefixCls}-line-${placement}`)} />
            <i
              className={classNames(`${prefixCls}-indicator`,
              `${prefixCls}-indicator-${placement}`, 
              {
                [`${prefixCls}-direction`]: isFolded,
                [`${prefixCls}-direction-${placement}`]: isFolded,
              })}
              onClick={onSwitchFolded}
            />
          </div>
        </div>
      </div>
      {!isFolded && <div className={`${prefixCls}-supporter-box`} style={{width}}/>}
    </div>
  )
}

export default Indentation
