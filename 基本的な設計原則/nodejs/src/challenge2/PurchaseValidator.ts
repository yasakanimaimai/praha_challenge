type PurchasableResult = {
  isPurchasable: boolean
  message?: string
}

class PurchaseValidator {
  public constructor(private paymentRecordRepo: PaymentRecordRepo) {}

  public validate(userId: string, productId: string): PurchasableResult {
    const oneYearAgoDate = new Date()
    oneYearAgoDate.setFullYear(oneYearAgoDate.getFullYear() - 1)

    const purchasesWithinPeriod =
      this.paymentRecordRepo.getPurchasesByUserIdAfterDate(
        userId,
        oneYearAgoDate
      )

    const pastPurchase = purchasesWithinPeriod.find(
      (p) => p.productId === productId
    )

    if (pastPurchase) {
      return {
        isPurchasable: false,
        message: "この商品はおひとりさま一品限定です！",
      }
    }
    return { isPurchasable: true }
  }
}
