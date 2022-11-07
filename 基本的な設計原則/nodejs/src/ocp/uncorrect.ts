// オープンクローズドの原理に違反している例
class calculateFeeServiceUncorrenct {

  private BASE_SHIPPING_FEE = 100;

  // ユーザランクが増えたとき拡張(コード追加)だけでは対応できず、既存コードの修正が必要
  calculateFee(userRank: string, accountingFee: number): number {
    switch (userRank) {
      case 'normal':
        return this.BASE_SHIPPING_FEE + accountingFee;
      case 'member':
        return this.BASE_SHIPPING_FEE * 0.8 + accountingFee;
      case 'vip':
        return this.BASE_SHIPPING_FEE * 0.5 + accountingFee;
      default:
        return this.BASE_SHIPPING_FEE + accountingFee;
    }
  }
}

(function main() {
  const accountingFee = 500;
  const service = new calculateFeeServiceUncorrenct();
  
  const normalUserFee = service.calculateFee('normal', accountingFee);
  const memberUserFee = service.calculateFee('member', accountingFee);
  const vipUserFee = service.calculateFee('vip', accountingFee);
  
  console.log(`通常ユーザの料金: ${normalUserFee}`);
  console.log(`会員ユーザの料金: ${memberUserFee}`);
  console.log(`特別ユーザの料金: ${vipUserFee}`);
})();