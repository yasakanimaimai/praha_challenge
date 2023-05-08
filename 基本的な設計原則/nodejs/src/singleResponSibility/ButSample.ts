// ダメな通常割引クラス
class DiscountManager {
  readonly DISCOUNT: number = 300;

  getDiscountPrice(price: number): number {
    let discountPrice = price - this.DISCOUNT
    if (discountPrice < 0) {
      discountPrice = 0
    }
    return discountPrice;
  }
}

// ダメな夏期割引きクラス
class SummerDiscountManager {
  discountManager: DiscountManager;

  constructor (discountManager: DiscountManager) {
    this.discountManager = discountManager;
  }

  getSummerDiscountPrice(price: number): number {
    let summerDiscountPrice = this.discountManager.getDiscountPrice(price)
    return summerDiscountPrice
  }
}

