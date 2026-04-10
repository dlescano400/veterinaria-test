import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { UserRepository } from "../repositories/user.repository";

interface UserBody {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
}

export class UserController {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository(AppDataSource);
    }

    private validateUser(data: UserBody): string | null {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        const phoneRegex = /^[0-9]+$/;

        if (!data.firstName || data.firstName.trim().length < 2) {
            return "El nombre debe tener al menos 2 caracteres";
        }
        if (!nameRegex.test(data.firstName.trim())) {
            return "El nombre solo puede contener letras y espacios";
        }

        if (!data.lastName || data.lastName.trim().length < 2) {
            return "El apellido debe tener al menos 2 caracteres";
        }
        if (!nameRegex.test(data.lastName.trim())) {
            return "El apellido solo puede contener letras y espacios";
        }

        if (!data.email || !emailRegex.test(data.email.trim())) {
            return "El email no es válido";
        }

        if (!data.phone || !phoneRegex.test(data.phone.trim())) {
            return "El teléfono solo puede contener números";
        }

        return null;
    }

    private formatUser(data: UserBody): UserBody {
        return {
            firstName: data.firstName?.trim().charAt(0).toUpperCase() + data.firstName?.trim().slice(1).toLowerCase(),
            lastName: data.lastName?.trim().charAt(0).toUpperCase() + data.lastName?.trim().slice(1).toLowerCase(),
            email: data.email?.trim().toLowerCase(),
            phone: data.phone?.trim(),
        };
    }

    async create(req: Request, res: Response) {
        try {
            const validationError = this.validateUser(req.body);
            if (validationError) {
                return res.status(400).json({ message: validationError });
            }

            const formattedData = this.formatUser(req.body);
            const user = await this.userRepository.create(formattedData);
            return res.status(201).json(user);
        } catch (error: any) {
            if (error.message?.includes("UNIQUE constraint failed")) {
                return res.status(400).json({ message: "El email ya está registrado" });
            }
            return res.status(500).json({
                message: "Error creating user",
                error: error.message || 'Unknown error'
            });
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const users = await this.userRepository.findAll();
            return res.json(users);
        } catch (error: any) {
            return res.status(500).json({
                message: "Error fetching users",
                error: error.message || 'Unknown error'
            });
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const user = await this.userRepository.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.json(user);
        } catch (error: any) {
            return res.status(500).json({
                message: "Error fetching user",
                error: error.message || 'Unknown error'
            });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const validationError = this.validateUser(req.body);
            if (validationError) {
                return res.status(400).json({ message: validationError });
            }

            const formattedData = this.formatUser(req.body);
            const user = await this.userRepository.update(req.params.id, formattedData);
            if (!user) return res.status(404).json({ message: "User not found" });
            return res.status(200).json(user);
        } catch (error: any) {
            if (error.message?.includes("UNIQUE constraint failed")) {
                return res.status(400).json({ message: "El email ya está registrado" });
            }
            return res.status(500).json({
                message: "Error updating user",
                error: error.message || 'Unknown error'
            });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const success = await this.userRepository.delete(req.params.id);
            if (!success) return res.status(404).json({ message: "User not found" });
            return res.status(200).json({ message: "User deleted successfully" });
        } catch (error: any) {
            return res.status(500).json({
                message: "Error deleting user",
                error: error.message || 'Unknown error'
            });
        }
    }
}
