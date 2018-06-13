import Common from '../../config/common'

class Store {
  static show(options) {
    return Common.ajax.get(`api/wms/store/${options}`)
  }

  static list(options) {
    return Common.ajax.get(`api/wms/store/list${options}`)
  }

  static create(options) {
    return Common.ajax.post(`api/wms/store/save${options}`)
  }

  static update(options) {
    return Common.ajax.patch(`api/wms/store/update${options}`)
  }
}

export default Store;
