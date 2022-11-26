// 反変性の確認
class Food {
  constructor(){}
}

class AnimalFood extends Food {
  constructor(){
    super()
  }
}

abstract class Animal {
  name: string

  constructor(name: string) {
    this.name = name
  }

  abstract speak(): void

  eat(food: AnimalFood): void {
    console.log(`${this.name} eats ${food.constructor.name}`)
  }
}

class Dog extends Animal {
  speak(): void {
    console.log(`${this.name} barks`)
  }

  // AnimalではAnimalFoodを引数にするが、子クラスではより抽象的なFoodクラスを受け取れる
  eat(food: Food): void {
    console.log(`${this.name} eats ${food.constructor.name}`)
  }
}

class Cat extends Animal {
  speak(): void {
    console.log(`${this.name} meows`)
  }
}


interface AnimalShelter {
  adopt(name: string): Animal
}

class DogShelter implements AnimalShelter {
  // 親のadoptと同様にAnimalクラスを返す
  adopt(name: string): Animal {
    return new Dog(name)
  }
}

class CatShelter implements AnimalShelter {
  // 親のadoptではAnimalクラスを返すが、子クラスではより範囲の狭いCatクラスを返す(共変性)
  adopt(name: string): Cat {
    return new Cat(name)
  }
}

const catShelter = new CatShelter()
const cat = catShelter.adopt('ミケ')
const catFood = new AnimalFood()
cat.speak() // ミケ meows
cat.eat(catFood) // 

const dogShelter = new DogShelter()
const dog = dogShelter.adopt('ポチ')
const banana = new Food()
dog.speak() // ポチ barks
dog.eat(banana)

// 「共変性に違反する」とは、子クラスのadoptメソッドでAnimalより抽象的な型を返すこと
// 「反変性に違反する」とは、子クラスのeatメソッドでAnimalFoodより具体的な型を返すこと
// まとめると、子クラスの振る舞いは、親よりも入口は広く、結果は狭くすべき。
