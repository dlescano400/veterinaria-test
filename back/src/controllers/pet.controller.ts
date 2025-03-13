import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { PetRepository } from "../repositories/pet.repository";

export class PetController {
    private petRepository: PetRepository;

    constructor() {
        this.petRepository = new PetRepository(AppDataSource);
    }

    async create(req: Request, res: Response) {
        try {
            const pet = await this.petRepository.create(req.body);
            return res.status(201).json(pet);
        } catch (error: any) {
            return res.status(500).json({
                message: "Error creating pet",
                error: error.message || 'Unknown error'
            });
        }
    }
    
    async findAll(req: Request, res: Response) {
        try {
            const pets = await this.petRepository.findAll();
            return res.json(pets);
        } catch (error: any) {
            return res.status(500).json({
                message: "Error fetching pets",
                error: error.message || 'Unknown error'
            });
        }
    }

    async findById(req: Request, res: Response) {    
        try {
            const pet = await this.petRepository.findById(req.params.id);
            if (!pet) {
                return res.status(404).json({ message: "Pet not found" });
            }
            return res.json(pet);
        } catch (error: any) {
            return res.status(500).json({
                message: "Error fetching pet",
                error: error.message || 'Unknown error'
            });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const pet = await this.petRepository.update(req.params.id, req.body);
            if (!pet) return res.status(404).json({ message: "Pet not found" });
            return res.status(200).json(pet);
        } catch (error: any) {
            return res.status(500).json({
                message: "Error updating pet",
                error: error.message || 'Unknown error'
            });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const pet = await this.petRepository.delete(req.params.id);
            if (!pet) return res.status(404).json({ message: "Pet not found" });
            return res.status(200).json(pet);
        } catch (error: any) {
            return res.status(500).json({
                message: "Error deleting pet",
                error: error.message || 'Unknown error'
            });
        }
    }

    async findByUserId(req: Request, res: Response) {
        try {
            const pets = await this.petRepository.findByUserId(req.params.userId);
            return res.json(pets);
        } catch (error: any) {
            return res.status(500).json({
                message: "Error fetching pets",
                error: error.message || 'Unknown error'
            });
        }
    }
}   