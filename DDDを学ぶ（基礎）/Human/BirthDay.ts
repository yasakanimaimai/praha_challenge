export default class BirthDay {
  private value: Date

  constructor(birthDay: string) {
    const birthDate = new Date(birthDay)
    if (this.calculateAge(birthDate) < 20) {
      // @ts-ignore
      throw new DomainException("Invalid birthDay")
    }
    this.value = birthDate
  }

  // 誕生日から現在の年齢を計算する
  private calculateAge(birthDate: Date): number {
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    return age
  }
}
