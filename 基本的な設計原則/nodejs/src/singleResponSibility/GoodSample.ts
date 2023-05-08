// 割引きクラスで使用する定価クラス
class RegularPrice {
  private static readonly MIN_AMOUNT = 0
  readonly amount: number

  constructor(amount: number) {
    if (amount < RegularPrice.MIN_AMOUNT) {
      throw new IllegalArgumentException()
    }

    this.amount = amount
  }

  add(price: RegularPrice): RegularPrice {
    return new RegularPrice(this.amount + price.amount)
  }
}

// 通常割引きクラス
class RegularDiscountManager {
  private static readonly DISCOUNT_RATE = 0.04
  readonly amount: number

  constructor(regularPrice: RegularPrice) {
    this.amount = regularPrice.amount * (100 - RegularDiscountManager.DISCOUNT_RATE)
  }
}

// 夏季割引きクラス
class SummerDiscountManager {
  private static readonly MIN_AMOUNT = 0
  private static readonly DISCOUNT_AMOUNT = 300
  readonly amount: number

  constructor(price: RegularPrice) {
    let discountedAmount = price.amount - SummerDiscountManager.DISCOUNT_AMOUNT
    if (discountedAmount < SummerDiscountManager.MIN_AMOUNT) {
      this.amount = discountedAmount
    }
  }
}

// 通常割引商品が貼りる買い物かご
class RegularDiscountShoppingCart {
  private static readonly MAX_PRODUCTS_COUNT = 10
  private readonly products: List<Product>

  // 商品を追加する
  add(product: Product): boolean {
    if (this.products.length() < RegularDiscountShoppingCart.MAX_PRODUCTS_COUNT) {
      this.products.add(product)
      return true
    }
    return false
  }

  // 商品を削除する
  remove(product: Product): boolean {
    const index = this.products.indexOf(product)
    if (index >= 0) {
      this.products.splice(index, 1)
    }
  }
}

// 矩形を表現するクラス
class Rectangle {
  private readonly location: Location
  private readonly size: Size
  private readonly angle: Angle

  draw(): void {
    // location, size, angleを使った矩形描画処理
  }
}