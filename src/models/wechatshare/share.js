import Common from '../../config/common'

class WechatShare {
  static show( options={} ) {
    return Common.ajax.get('api/share/weChat', { params: options })
  }
}

export default WechatShare;
