import Common from '../../config/common'

class DispatchingOrder {
  static show(options) {
    return Common.ajax.get("api/orders/dispatchingOrder/" + operions["id"], options)
  }

  static list(options) {
    return Common.ajax.get("api/orders/dispatchingOrder/list", options)
  }

  static create(options) {
    return Common.ajax.post('api/orders/dispatchingOrder/save', options)
  }

  static update(options) {
    return Common.ajax.put('api/orders/dispatchingOrder/update', options)
  }
}

export default DispatchingOrder;
