import { Router } from "express";
import { InvoiceController } from "../controllers/invoice.controller";

const router = Router();
const invoiceController = new InvoiceController();

// Create a new invoice
/**
 * @swagger
 * /invoices:
 *   post:
 *     summary: Create a new invoice
 *     tags: [Invoices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               consultationId:
 *                 type: string
 *               total:
 *                 type: number
 *     responses:
 *       201:
 *         description: Invoice created successfully
 */
router.post("/", (req, res) => invoiceController.create(req, res));

// Get all invoices
/**
 * @swagger
 * /invoices:
 *   get:
 *     summary: Get all invoices
 *     tags: [Invoices]
 *     responses:
 *       200:
 *         description: List of invoices
 */
router.get("/", (req, res) => invoiceController.findAll(req, res));

// Get invoice by ID
/**
 * @swagger
 * /invoices/{id}:
 *   get:
 *     summary: Get invoice by ID
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Invoice found
 *       404:
 *         description: Invoice not found
 */
router.get("/:id", (req, res) => invoiceController.findById(req, res));

/* 
* @swagge
* /invoices/{id}:
*   put:
*     summary: Update invoice by ID
*     tags: [Invoices]
*     parameters:
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               consultationId:
*                 type: string
*               total:
*                 type: number
*     responses:
*       200:
*         description: Invoice updated successfully
*       404:
*         description: Invoice not found
*   
*/

router.put("/:id", (req, res) => invoiceController.update(req, res));

// Delete invoice
/**
 * @swagger
 * /invoices/{id}:
 *   delete:
 *     summary: Delete invoice by ID
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Invoice deleted successfully
 *       404:
 *         description: Invoice not found
 */
router.delete("/:id", (req, res) => invoiceController.delete(req, res));

export default router;
