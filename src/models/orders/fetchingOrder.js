import Common from '../../config/common'

class FetchingOrder {
  static show(options) {
    return Common.ajax.get(`api/orders/fetchingOrder/${options}`)
  }

  static list(options) {
    return Common.ajax.get(`api/orders/fetchingOrder/list${options}`)
  }

  static create(options) {
    return Common.ajax.post(`api/orders/fetchingOrder/save${options}`)
  }

  static update(options) {
    return Common.ajax.patch(`api/orders/fetchingOrder/update${options}`)
  }
}

export default FetchingOrder;
