// 元コード：https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgAoFcoIBZwM4oDeAUMsugVAJIAmAXMnmFKAOanIAOUA9jegjC0GTFiHZlmcEHkRhgPEAxJkyeAUgg0tDZuggcyCHgFtOAGwiQaAQTAMAInEgcAvsXfFQkWIhSo4AE8TCHAAJQhjKBoIzh5kFWRWKwwsXAI8ACFAhgAKCmhhRmY2AEpkAF4APjRMHHwIAG0AXQ9iYgRzfDxatIaAZWgAN2AkBI5OdAAjc1HkYxk9QR4oXO5gIecUTiCQ8MiVmIg4hgDg0LAIqKO48sJPMkmZucm+gnzKItE2ABouXn4gi+JXEd0M80UTGQcHM5lS9QylWQYGwwDwADodud9tdYjx0ckwPD0hAsoEPoUaKVwQsoTsmMSGkiYXC6iSMTBQDRcmtytUuJiAQIhDRKhUKv8+MLaMgAGSygVSGRyBQgdHqBCabRU8HAGDINb4Ilshpg1SqFG8ADuyBAEBtAFEoLxVgByQDKDIA7BkAYqqAQZVAPYMgCkGQBODIALBkAUQyAVQZAH4MgAA5X2ABTTAFnagHMGQCaDIBAf9d1PND1UAHp88hAD8xgFNFQDSRoAs30AsgyAawZAEwJgACGNweIA
interface Purchase {
  userId: string
  productId: string
  transaction: {
    // succeededがtrueなら購入不可ということなら、そのロジックは別に用意されているはず
    succeeded: true
    completedAt: Date
  }
}

interface PaymentRecordRepo {
  getPurchasesBy: (userId: string) => Purchase[];
  // getPurchasesByの取得結果に対してuserIdとproductIdで絞理、そのtransaction.succeededを返す
  isUserCanPurchase: (userId: string, productId: string) => boolean;
}

class PurchaseService {
  public constructor(private paymentRecordRepo: PaymentRecordRepo) {}

  public purchase(userId: string, productId: string) {
    const canPurchase = this.paymentRecordRepo.isUserCanPurchase(userId, productId);
    if (!canPurchase) {
      throw new Error('この商品はおひとりさま一品限定です！')
    }

    // 購入手続きに進む
  }
}