// オープンクローズドの原理に則している例
// ユーザのランクに応じて送料を計算するコード
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

class calculateFeeServiceCorrenct {
  private BASE_SHIPPING_FEE = 100;
  calculateFee(user: User, accountingFee: number): number {
    const shippingFee = user.getShippingFee(this.BASE_SHIPPING_FEE);
    return shippingFee + accountingFee;
  }
}

function main() {
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
};

main()


