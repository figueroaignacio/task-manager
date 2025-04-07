import bcrypt from "bcryptjs";
import { Repository } from "typeorm";
import { AppDataSource } from "../db/db";
import { User } from "../entities/user-entity";

export class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(userData: { email: string; password: string }): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = this.userRepository.create({
      email: userData.email,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  async validatePassword(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
