import Common from '../../config/common'

class Goods {
  static show(options) {
    return Common.ajax.get("api/orders/goods/" + options["id"])
  }

  static list(options) {
    return Common.ajax.get("api/orders/goods/list", options)
  }

  static create(options) {
    return Common.ajax.post('api/orders/goods/save', options)
  }

  static update(options) {
    return Common.ajax.put('api/orders/goods/update', options)
  }
}

export default Goods;
