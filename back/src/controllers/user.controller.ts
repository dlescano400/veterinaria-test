import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { UserRepository } from "../repositories/user.repository";

export class UserController {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository(AppDataSource);
    }

    async create(req: Request, res: Response) {
        try {
            const user = await this.userRepository.create(req.body);
            return res.status(201).json(user);
        } catch (error: any) {
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
            const user = await this.userRepository.update(req.params.id, req.body);
            if (!user) return res.status(404).json({ message: "User not found" });
            return res.status(200).json(user);
        } catch (error: any) {
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
