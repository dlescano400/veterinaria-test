import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { InvoiceRepository } from "../repositories/invoice.entity";

export class InvoiceController {

    private invoiceRepository: InvoiceRepository;

    constructor() {
        this.invoiceRepository = new InvoiceRepository(AppDataSource);
    }

    create = async (req: Request, res: Response) => {
        try {
            const invoice = await this.invoiceRepository.create(req.body);
            res.status(201).json(invoice);
        } catch (error: any) {
            return res.status(500).json({
                message: "Error creating invoice",
                error: error.message || 'Unknown error'
            });
        }
    }

    findAll = async (req: Request, res: Response) => {
        try {
            const invoices = await this.invoiceRepository.findAll();
            res.status(200).json(invoices);
        } catch (error: any) {
            return res.status(500).json({
                message: "Error fetching invoice",
                error: error.message || 'Unknown error'
            });
        }
    }

    findById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const invoice = await this.invoiceRepository.findById(id);
            if (!invoice) {
                res.status(404).json({message: 'Invoice not found'});
            } else {
                res.status(200).json(invoice);
            }
        } catch (error: any) {
            return res.status(500).json({
                message: "Error fetching invoice",
                error: error.message || 'Unknown error'
            });
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const invoice = await this.invoiceRepository.update(id, req.body);
            if (!invoice) {
                res.status(404).json({message: 'Invoice not found'});
            } else {
                res.status(200).json(invoice);
            }
        } catch (error: any) {
            return res.status(500).json({
                message: "Error updating invoice",
                error: error.message || 'Unknown error'
            });
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const invoice = await this.invoiceRepository.delete(id);
            if (!invoice) {
                res.status(404).json({message: 'Invoice not found'});
            } else {
                res.status(200).json({invoice});
            }
        } catch (error: any) {
            return res.status(500).json({
                message: "Error deleting invoice",
                error: error.message || 'Unknown error'
            });
        }
    }
}
