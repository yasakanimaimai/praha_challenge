// オープンクローズドの原理に則している例
class calculateFeeServiceCorrenct {

  private BASE_SHIPPING_FEE = 100;

  // ユーザランクが増えたときも既存コードの修正が不要
  // ランクごとにUserインターフェースを実装したクラスを用意すればOK
  calculateFee(user: User, accountingFee: number): number {
    const shippingFee = user.getShippingFee(this.BASE_SHIPPING_FEE);
    return shippingFee + accountingFee;
  }
}

// 
interface User {
  getShippingFee: (baseShippingFee: number) => number;
}

class NormalUser implements User {
  getShippingFee = (baseShippingFee: number) => baseShippingFee;
}

class MemberUser implements User {
  getShippingFee = (baseShippingFee: number) => baseShippingFee * 0.8;
}

class VipUser implements User {
  getShippingFee = (baseShippingFee: number) => baseShippingFee * 0.5;
}

(function main() {

  const accountingFee = 500;
  const service = new calculateFeeServiceCorrenct();

  const normalUser = new NormalUser();
  const memberUser = new MemberUser();
  const vipUser = new VipUser();
  
  const normalUserFee = service.calculateFee(normalUser, accountingFee);
  const memberUserFee = service.calculateFee(memberUser, accountingFee);
  const vipUserFee = service.calculateFee(vipUser, accountingFee);
  
  console.log(`通常ユーザの料金: ${normalUserFee}`);
  console.log(`会員ユーザの料金: ${memberUserFee}`);
  console.log(`特別ユーザの料金: ${vipUserFee}`);
})();


