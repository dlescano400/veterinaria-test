import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { AppointmentRepository } from "../repositories/appointment.repository";

export class AppointmentController {
    private repository: AppointmentRepository;

    constructor() {
        this.repository = new AppointmentRepository(AppDataSource);
    }

    async create(req: Request, res: Response) {
        try {
            const appointment = await this.repository.create(req.body);
            return res.status(201).json(appointment);
        } catch (error: any) {
            return res.status(500).json({
                message: "Error creating appointment",
                error: error.message || 'Unknown error'
            });
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const appointments = await this.repository.findAll();
            return res.json(appointments);
        } catch (error: any) {
            return res.status(500).json({
                message: "Error fetching appointments",
                error: error.message || 'Unknown error'
            });
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const appointment = await this.repository.findById(id);
            if (!appointment) {
                return res.status(404).json({ message: "Appointment not found" });
            }
            return res.json(appointment);
        } catch (error: any) {
            return res.status(500).json({
                message: "Error fetching appointment",
                error: error.message || 'Unknown error'
            });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const appointment = await this.repository.update(id, req.body);
            if (!appointment) {
                return res.status(404).json({ message: "Appointment not found" });
            }
            return res.json(appointment);
        } catch (error: any) {
            return res.status(500).json({
                message: "Error updating appointment",
                error: error.message || 'Unknown error'
            });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const success = await this.repository.delete(id);
            if (!success) {
                return res.status(404).json({ message: "Appointment not found" });
            }
            return res.status(204).send();
        } catch (error: any) {
            return res.status(500).json({
                message: "Error deleting appointment",
                error: error.message || 'Unknown error'
            });
        }
    }
}