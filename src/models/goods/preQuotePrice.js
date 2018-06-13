import Common from '../../config/common'

class GoodpreQuotePrice {
  static show(options) {
    return Common.ajax.get(`api/goods/preQuotePrice/${options}`)
  }
}

export default GoodpreQuotePrice;
