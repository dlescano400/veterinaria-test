import { DataSource } from "typeorm";
import { BaseRepository } from "./base.repository";
import { Veterinarian } from "../entities/veterinarian.entity";

export class VeterinarianRepository extends BaseRepository<Veterinarian> {
    constructor(dataSource: DataSource) {
        super(Veterinarian, dataSource);
    }

    async findWithAppointments(id: string): Promise<Veterinarian | null> {
        return this.repository.findOne({
            where: { id },
            relations: ['appointments']
        });
    }
    async findByEmail(email: string): Promise<Veterinarian | null> {
        return await this.repository.findOneBy({ email });
    }
}
