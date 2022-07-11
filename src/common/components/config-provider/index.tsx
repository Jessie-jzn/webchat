import React from 'react'
export const defaultPrefixCls = 'miao'

export interface ConfigProviderProps {
  prefixCls?: string // css 前缀
}
export interface ConfigConsumerProps {
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string
}
interface ProviderChildrenProps extends ConfigProviderProps {
  parentContext: ConfigConsumerProps;
}
const defaultGetPrefixCls = (suffixCls?: string, customizePrefixCls?: string) => {
  if (customizePrefixCls) return customizePrefixCls

  return suffixCls ? `miao-${suffixCls}` : 'miao'
}





export const ConfigContext = React.createContext<ConfigConsumerProps>({
  getPrefixCls: defaultGetPrefixCls // 默认的前缀函数
})

export const ConfigConsumer = ConfigContext.Consumer

const ProviderChildren: React.FC<ProviderChildrenProps> = props=>{
  const { 
    children,
    parentContext
  } = props

  const childNode = children;

  const getPrefixCls = React.useCallback((suffixCls?: string, customizePrefixCls?: string) => {
    const { prefixCls } = props;

    if (customizePrefixCls) return customizePrefixCls;

    const mergedPrefixCls = prefixCls || parentContext.getPrefixCls('');

    return suffixCls ? `${mergedPrefixCls}-${suffixCls}` : mergedPrefixCls;
  },[parentContext.getPrefixCls, props.prefixCls])
  
  const config = {
    ...parentContext,
    getPrefixCls,
  };
  
  return <ConfigContext.Provider value={config}>{childNode}</ConfigContext.Provider>;
}

// 高阶组件，接受用户的属性输入，按类别分别给到不同的上下文
const ConfigProvider: React.FC<ConfigProviderProps> & {
  ConfigContext: typeof ConfigContext
} = props => {
  return (
    <ConfigConsumer>
      {context => <ProviderChildren parentContext={context}  {...props} />}
    </ConfigConsumer>
  )
}
ConfigProvider.ConfigContext = ConfigContext;

export default ConfigProvider
