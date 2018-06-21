import Common from '../../config/common'

class Package {
  static show(options) {
    return Common.ajax.get("api/orders/package/" + options["id"])
  }

  static list(options) {
    return Common.ajax.get("api/orders/package/list", options)
  }

  static create(options) {
    return Common.ajax.post('api/orders/package/save', options)
  }

  static update(options) {
    return Common.ajax.put('api/orders/package/update', options)
  }
}

export default Package;
