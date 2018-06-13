import Common from '../../config/common'

class PaymentAattribute {
  static show(options) {
    return Common.ajax.get(`/api/erp/report/${options}`)
  }
  static showdetail(options) {
    return Common.ajax.get(`/api/erp/report/detail/${options}`)
  }
  static finish(options) {
    return Common.ajax.post('/api/erp/report', options)
  }
}

export default PaymentAattribute;
