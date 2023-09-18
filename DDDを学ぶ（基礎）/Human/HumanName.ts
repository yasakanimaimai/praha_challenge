export default class HumanName {
  private value: string

  constructor(humanName: string) {
    if (humanName.length <= 0 || humanName.length >= 20) {
      // @ts-ignore
      throw new DomainException("Invalid humanName")
    }
    this.value = humanName
  }
}
