import { DataSource } from "typeorm";
import { BaseRepository } from "./base.repository";
import { Pet } from "../entities/pet.entity";

export class PetRepository extends BaseRepository<Pet> {
    constructor(dataSource: DataSource) {
        super(Pet, dataSource);
    }

    async findByUserId(userId: string): Promise<Pet[]> {
        return this.repository.find({
            where: { userId },
            relations: ['appointments']
        });
    }

    async findWithAppointments(id: string): Promise<Pet | null> {
        return this.repository.findOne({
            where: { id },
            relations: ['appointments', 'user']
        });
    }
}