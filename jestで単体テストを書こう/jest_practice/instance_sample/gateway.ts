export interface Driver {
  fetch: () => string;
}

export class Gateway {
  constructor(private driver: Driver) {};

  fetch() {
    const text = this.driver.fetch();
    return text;
  }
}

// driverインターフェイスを実装したtest driver
class TestDriver implements Driver {
  fetch() {
    return 'text';
  }
}

const driver = new TestDriver();
const gateway = new Gateway(driver);
gateway.fetch();