import React, { useState } from 'react'
import classNames from 'classnames'
import { ConfigContext } from '../config-provider';
import './style/indentation.less'
type IndentationProps = {
  prefixCls?: string
  defaultFolded?: boolean
  direction?: string
  propsFolded?:boolean
}

const Indentation: React.FC<IndentationProps> = ({
  children,
  prefixCls:customizePrefixCls,
  propsFolded = true,
  direction = 'left'
}) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('indertation', customizePrefixCls);

  const [isFolded,setIsFolded] = useState(propsFolded)
  const renderBody = () => {
    return <div>{children}</div>
  }
  React.useEffect(() => {
    if (!propsFolded) {
      setIsFolded(true);
    }
  }, [propsFolded]);

  const onSwitchFolded = () => {
    setIsFolded(!isFolded)
  }


  return (
    <div className={prefixCls}>
      <div
        className={classNames(`${prefixCls}-main-box`, {
          [`${prefixCls}-folded`]: isFolded
        })}
      >
        111
        {renderBody()}
        <div className={`${prefixCls}-indicator`}>
          <div className={`${prefixCls}-root`}>
            <i className={`${prefixCls}-${direction}`} />
            <i
              className={classNames(`${prefixCls}-indicator`, {
                [`${prefixCls}-direction`]: isFolded
              })}
              onClick={onSwitchFolded}
            />
          </div>
        </div>
      </div>
      {!isFolded && <div className={`${prefixCls}-supporter-box`}/>}
    </div>
  )
}

export default Indentation
