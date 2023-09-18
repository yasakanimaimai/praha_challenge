const BLOOD_TYPES = ["a", "b", "o", "ab"] as const
type BloodType = (typeof BLOOD_TYPES)[number]

export default class Blood {
  private value: BloodType

  constructor(blood: string) {
    if (!BLOOD_TYPES.includes(blood as BloodType)) {
      // @ts-ignore
      throw new DomainException("Invalid blood")
    }
    this.value = blood as BloodType
  }
}
