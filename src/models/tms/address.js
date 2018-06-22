import Common from '../../config/common'

class Address {
  static show(options) {
    return Common.ajax.get("api/tms/address/" + options["id"])
  }

  static list(options) {
    return Common.ajax.get("api/tms/address/list", { params: options })
  }

  static create(options) {
    return Common.ajax.post('api/tms/address/save', options)
  }

  static update(options) {
    return Common.ajax.put('api/tms/address/update', options)
  }
}

export default Address;
