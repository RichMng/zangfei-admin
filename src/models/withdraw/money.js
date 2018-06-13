import Common from '../../config/common'

class WithdrawMoney {
  static show(options) {
    return Common.ajax.get(`api/erp/user/paymentAccount/${options}`)
  }
  static create(options) {
    return Common.ajax.post('api/erp/user/paymentAccount',options)
  }
}

export default WithdrawMoney;

