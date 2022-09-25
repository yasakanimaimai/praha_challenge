export class UserUsecase {
  private repository: UserRepository;
  constructor(repository: UserRepository) {
    this.repository = repository;
  }
  public get(id: string): User {
    return this.repository.get(id);
  }
}

export class User {
  id: string;
  name: string;
}

export interface UserRepository {
  get(id: string): User;
}