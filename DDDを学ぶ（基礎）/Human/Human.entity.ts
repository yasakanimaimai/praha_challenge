import HumanId from "./HumanId"
import Blood from "./Blood"
import BirthDay from "./BirthDay"
import HumanName from "./HumanName"

export default class Human {
  private constructor(
    private id: HumanId,
    private blood: Blood,
    private birthDay: BirthDay,
    private name: HumanName
  ) {}

  public static create(blood: string, birthDay: string, name: string): Human {
    return new Human(
      new HumanId(),
      new Blood(blood),
      new BirthDay(birthDay),
      new HumanName(name)
    )
  }
}
