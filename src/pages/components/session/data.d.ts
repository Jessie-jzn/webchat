export type SessionItemType = {
    sessionId: number, // 会话id
    createTime: string, // 创建时间
    stick: true | false, // 是否置顶
    stickTime?: string, // 置顶时间
    unreadCount: number, // 未读数
    showNo: number, // 用户id
    name: string,//用户名
    avatar: string,//头像
    lastWord: string, // 最后的消息
    lastTime:string // 最后的消息时间
}