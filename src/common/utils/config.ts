import moment from 'moment'

/**
 * 计算传入时间与当前时间相差的时间间隔
 * @param {*} time :当前时间，单位毫秒
 * @returns
 */
 export const getTimeDiff = (time:number )=> {
    const minutes = moment().diff(moment(time), 'minute')
    if (minutes === 0) return '刚刚'
    const day = Math.floor(minutes / 1440)
    if (day) return `${day}天前`
    const hour = Math.floor(minutes / 60)
    const mm = minutes % 60
    if (hour === 0) {
      return `${mm}分前`
    }
  
    return `${hour}时${mm}分前`
  }

