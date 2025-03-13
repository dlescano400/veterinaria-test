import { Router } from "express";
import { ConsultationController } from "../controllers/consultation.controller";
const router = Router();
const consultationController = new ConsultationController();

// Create a new consultation
/**
 * @swagger
 * /consultations:
 *   post:
 *     summary: Create a new consultation
 *     tags: [Consultations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               diagnosis:
 *                 type: string
 *               treatment:
 *                 type: string
 *               cost:
 *                 type: number
 *               appointmentId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Consultation created successfully
 */
router.post("/", (req, res) => consultationController.create(req, res));

// Get all consultations
/**
 * @swagger
 * /consultations:
 *   get:
 *     summary: Get all consultations
 *     tags: [Consultations]
 *     responses:
 *       200:
 *         description: List of consultations
 */
router.get("/", (req, res) => consultationController.findAll(req, res));

// Get consultation by ID
/**
 * @swagger
 * /consultations/{id}:
 *   get:
 *     summary: Get consultation by ID
 *     tags: [Consultations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Consultation found
 */
router.get("/:id", (req, res) => consultationController.findById(req, res));

// Update consultation
/**
 * @swagger
 * /consultations/{id}:
 *   put:
 *     summary: Update consultation by ID
 *     tags: [Consultations]
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
 *               diagnosis:
 *                 type: string
 *               treatment:
 *                 type: string
 *               cost:
 *                 type: number
 *     responses:
 *       200:
 *         description: Consultation updated successfully
 */
router.put("/:id", (req, res) => consultationController.update(req, res));

// Delete consultation
/**
 * @swagger
 * /consultations/{id}:
 *   delete:
 *     summary: Delete consultation by ID
 *     tags: [Consultations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Consultation deleted successfully
 */
router.delete("/:id", (req, res) => consultationController.delete(req, res));

export default router;
