import { DataSource } from "typeorm";
import { BaseRepository } from "./base.repository";
import { Invoice } from "../entities/invoice.entity";

export class InvoiceRepository extends BaseRepository<Invoice> {
    constructor(dataSource: DataSource) {
        super(Invoice, dataSource);
    }
}