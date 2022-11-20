abstract class Animal {
  abstract eat(): void
  abstract sleep(): void
  move = () => console.log('move');
  
}


class Cat extends Animal {
  eat = (): void => console.log('cat eat')
  sleep = (): void => console.log('cat sleep')
  // Cat独自メソッド
  run = (): void => console.log('cat original run') 
}


class Bird extends Animal {
  eat = (): void => console.log('bird eat')
  sleep = (): void => console.log('bird sleep')
  // Bird独自メソッド
  fly = (): void => console.log('bird original fly')
}


class Main {
  execute() {
    // 親クラスのメソッド：交換可能
    const cat1: Cat = new Cat();
    cat1.move(); // 動く
    const bird1: Bird = new Bird();
    bird1.move(); // 動く

    // 親クラスの抽象メソッド：交換可能
    cat1.sleep();
    bird1.sleep();

    // 子クラスの独自メソッド：交換不可
    cat1.run();
    bird1.fly();
  }
}

const main = new Main();
main.execute();

