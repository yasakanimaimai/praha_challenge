// @ts-nocheck
import { v4 as uuidv4 } from "uuid"
import type { v4 as uuidv4Type } from "uuid/interfaces"

export default class HumanId {
  private value: uuidv4Type

  constructor() {
    this.value = uuidv4()
  }
}
