import Common from '../../config/common'

class User {
  static show(options) {
    return Common.ajax.get("api/user/user/" + options["id"])
  }

  static login(options) {
    return Common.ajax.post("api/user/user/login", { params: options })
  }

  static list(options) {
    return Common.ajax.get("api/user/user/list", { params: options })
  }

  static create(options) {
    return Common.ajax.post('api/user/user/save', options)
  }

  static update(options) {
    return Common.ajax.put('api/user/user/update', options)
  }
}

export default User;
