import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { PetRepository } from "../repositories/pet.repository";

interface PetBody {
    name?: string;
    species?: string;
    breed?: string;
    age?: number;
    userId?: string;
}

export class PetController {
    private petRepository: PetRepository;

    constructor() {
        this.petRepository = new PetRepository(AppDataSource);
    }

    private validatePet(data: PetBody): string | null {
        if (!data.name || data.name.trim().length < 2) {
            return "El nombre debe tener al menos 2 caracteres";
        }

        if (!data.species) {
            return "Debes seleccionar una especie";
        }

        if (data.age === undefined || data.age === null || data.age < 0) {
            return "La edad debe ser un número positivo";
        }

        if (!data.userId) {
            return "Debes seleccionar un dueño";
        }

        return null;
    }

    private formatPet(data: PetBody): PetBody {
        return {
            name: data.name?.trim().charAt(0).toUpperCase() + data.name?.trim().slice(1).toLowerCase(),
            species: data.species?.trim().toLowerCase(),
            breed: data.breed?.trim().charAt(0).toUpperCase() + data.breed?.trim().slice(1).toLowerCase(),
            age: data.age,
            userId: data.userId,
        };
    }

    async create(req: Request, res: Response) {
        try {
            const validationError = this.validatePet(req.body);
            if (validationError) {
                return res.status(400).json({ message: validationError });
            }

            const formattedData = this.formatPet(req.body);
            const pet = await this.petRepository.create(formattedData);
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
            const pets = await this.petRepository.findWithOwner();
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
            const validationError = this.validatePet(req.body);
            if (validationError) {
                return res.status(400).json({ message: validationError });
            }

            const formattedData = this.formatPet(req.body);
            const pet = await this.petRepository.update(req.params.id, formattedData);
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