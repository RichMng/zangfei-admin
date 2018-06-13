import Common from '../../config/common'

class PaymentAattribute {
  static show(options) {
    return Common.ajax.get('api/erp/user/paymentAccount/attribute',options)
  }
}

export default PaymentAattribute;
