import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { AppointmentRepository } from '../repositories/appointment.repository';

class AppointmentController {
    private repository: AppointmentRepository;

    constructor() {
        this.repository = new AppointmentRepository(AppDataSource);
    }

    create = async (req: Request, res: Response) => {
        try {
            const appointment = await this.repository.create(req.body);
            return res.status(201).json(appointment);
        } catch (error) {
            return res.status(500).json({ message: 'Error creating appointment', error });
        }
    };

    getAll = async (_req: Request, res: Response) => {
        try {
            const appointments = await this.repository.findAll();
            return res.json(appointments);
        } catch (error) {
            return res.status(500).json({ message: 'Error fetching appointments', error });
        }
    };

    getById = async (req: Request, res: Response) => {
        try {
            const appointment = await this.repository.findById(req.params.id);
            if (!appointment) {
                return res.status(404).json({ message: 'Appointment not found' });
            }
            return res.json(appointment);
        } catch (error) {
            return res.status(500).json({ message: 'Error fetching appointment', error });
        }
    };


    update = async (req: Request, res: Response) => {
        try {
            const appointment = await this.repository.update(req.params.id, req.body);
            if (!appointment) {
                return res.status(404).json({ message: 'Appointment not found' });
            }
            return res.json(appointment);
        } catch (error) {
            return res.status(500).json({ message: 'Error updating appointment', error });
        }
    };

    delete = async (req: Request, res: Response) => {
        try {
            const result = await this.repository.delete(req.params.id);
            if (!result) {
                return res.status(404).json({ message: 'Appointment not found' });
            }
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ message: 'Error deleting appointment', error });
        }
    };
}

export default new AppointmentController();
