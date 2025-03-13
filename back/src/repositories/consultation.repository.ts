import { DataSource } from "typeorm";
import { BaseRepository } from "./base.repository";
import { Consultation } from "../entities/consultation.entity";

export class ConsultationRepository extends BaseRepository<Consultation> {
    constructor(dataSource: DataSource) {
        super(Consultation, dataSource);
    }
}