import { DataSource } from "typeorm";
import { User } from "../entities/user.entity";
import { BaseRepository } from "./base.repository";

export class UserRepository extends BaseRepository<User> {
    constructor(dataSource: DataSource) {
        super(User, dataSource);
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.repository.findOneBy({ email });
    }

    async findWithPets(): Promise<User[]> {
        return await this.repository.find({
            relations: {
                pets: true
            }
        });
    }
}
