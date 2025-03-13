import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { ConsultationRepository } from "../repositories/consultation.repository";

export class ConsultationController {
    private repository: ConsultationRepository;

    constructor() {
        this.repository = new ConsultationRepository(AppDataSource);
    }

    async create(req: Request, res: Response) {
        try {
            const consultation = await this.repository.create(req.body);
            return res.status(201).json(consultation);
        } catch (error) {
            return res.status(500).json({ message: "Error creating consultation", error });
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const consultations = await this.repository.findAll();
            return res.json(consultations);
        } catch (error) {
            return res.status(500).json({ message: "Error fetching consultations", error });
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const consultation = await this.repository.findById(req.params.id);
            if (!consultation) {
                return res.status(404).json({ message: "Consultation not found" });
            }
            return res.json(consultation);
        } catch (error) {
            return res.status(500).json({ message: "Error fetching consultation", error });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const consultation = await this.repository.update(req.params.id, req.body);
            if (!consultation) {
                return res.status(404).json({ message: "Consultation not found" });
            }
            return res.json(consultation);
        } catch (error) {
            return res.status(500).json({ message: "Error updating consultation", error });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const success = await this.repository.delete(req.params.id);
            if (!success) {
                return res.status(404).json({ message: "Consultation not found" });
            }
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ message: "Error deleting consultation", error });
        }
    }
}
