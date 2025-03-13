import { DataSource } from "typeorm";
import { BaseRepository } from "./base.repository";
import { Appointment } from "../entities/appointment.entity";

export class AppointmentRepository extends BaseRepository<Appointment> {
    constructor(dataSource: DataSource) {
        super(Appointment, dataSource);
    }
}