import { Repository } from './repository';

export class UseCase {
  constructor (private repository: Repository) {}

  async execute(id: string, name: string, age: number): Promise<void> {
    const user = await this.repository.find(id);

    if (!user) {
      const newUser = {
        id,
        name,
        age
      };
      await this.repository.insert(newUser);
      return;
    }

    await this.repository.update({
      id,
      name,
      age
    });


  }

}