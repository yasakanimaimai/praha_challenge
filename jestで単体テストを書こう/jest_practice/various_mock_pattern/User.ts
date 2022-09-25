export default class User {
  private tableName = "user";

  // ここにコンストラクタ

  async createOrUpdate(item, options = {}) {

    if (!this.validateSchema(item)) {
      thwor new Error(this.validateSchema.errors.shift().message)
    }
  }
}