import Common from '../../config/common'

class User {
  static show(options) {
    return Common.ajax.get("api/user/user/" + operions["id"], options)
  }

  static list(options) {
    return Common.ajax.get("api/user/user/list", options)
  }

  static create(options) {
    return Common.ajax.post(`api/user/user/save${options}`)
  }

  static update(options) {
    return Common.ajax.patch(`api/user/user/update${options}`)
  }
}

export default User;
