import { DataSource } from "typeorm";
import { BaseRepository } from "./base.repository";
import { Appointment } from "../entities/appointment.entity";

export class AppointmentRepository extends BaseRepository<Appointment> {
    constructor(dataSource: DataSource) {
        super(Appointment, dataSource);
    }

    async findAll(): Promise<Appointment[]> {
        return await this.repository.find({
            relations: ['pet', 'pet.user', 'veterinarian'],
        });
    }

    async findById(id: string): Promise<Appointment | null> {
        return await this.repository.findOne({
            where: { id },
            relations: ['pet', 'pet.user', 'veterinarian'],
        });
    }
}