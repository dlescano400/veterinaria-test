import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { VeterinarianRepository } from "../repositories/veterinarian.repository";

export class VeterinarianController {
    private repository: VeterinarianRepository

    constructor() {
        this.repository = new VeterinarianRepository(AppDataSource);
    }

    async create(req: Request, res: Response){
        try {
            const veterinarian = await this.repository.create(req.body);
            return res.status(201).json(veterinarian);
        } catch (error: any) {
            return res.status(500).json({
                message: "Error creating veterinarian",
                error: error.message || 'Unknown error'
            });
        }

    }

    async findById(req: Request, res: Response){
        try {
            const veterinarian = await this.repository.findById(req.params.id);
            if (!veterinarian) {
                return res.status(404).json({ message: "Pet not found" });
            }
            return res.json(veterinarian)
        } catch (error: any) {
            return res.status(500).json({
                message: "Error fetching veterinarians",
                error: error.message || 'Unknown error'
            });
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const veterinarians = await this.repository.findAll();
            return res.json(veterinarians);
        } catch (error: any) {
            return res.status(500).json({
                message: "Error fetching veterinarians",
                error: error.message || 'Unknown error'
            });
        }
    }

    async findByEmail(req: Request, res: Response) {
        try {
            const veterinarian = await this.repository.findByEmail(req.params.email);
            if (!veterinarian) {
                return res.status(404).json({ message: "Veterinarian not found" });
            }

            return res.json(veterinarian);
        } catch (error: any) {
            return res.status(500).json({
                message: "Error fetching veterinarian",
                error: error.message || 'Unknown error'
            });
        }
    }
    
    async update(req: Request, res: Response) {
        try {
            const veterinarian = await this.repository.update(req.params.id, req.body);
            if (!veterinarian) return res.status(404).json({ message: "Veterinarian not found" });
            return res.status(200).json(veterinarian);
        } catch (error: any) {
            return res.status(500).json({
                message: "Error updating veterinarian",
                error: error.message || 'Unknown error'
            });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const veterinarian = await this.repository.delete(req.params.id);
            if (!veterinarian) return res.status(404).json({ message: "Veterinarian not found" });
            return res.status(200).json(veterinarian);
        } catch (error: any) {
            return res.status(500).json({
                message: "Error deleting veterinarian",
                error: error.message || 'Unknown error'
            });
        }
    }
}
