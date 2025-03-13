import { Router } from "express";
import { VeterinarianController } from "../controllers/veterinarian.controller";

const router = Router();
const veterinarianController =new VeterinarianController()

// Create a new veterinarian
/**
 * @swagger
 * /veterinarians:
 *   post:
 *     summary: Create a new veterinarian
 *     tags: [Veterinarians]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               specialty:
 *                 type: string
 *     responses:
 *       201:
 *         description: Veterinarian created successfully
 */

router.post("/", (req, res) => veterinarianController.create(req, res));
// Get all veterinarians
/**
 * @swagger
 * /veterinarians:
 *   get:
 *     summary: Get all veterinarians
 *     tags: [Veterinarians]
 *     responses:
 *       200:
 *         description: List of veterinarians
 */
router.get("/", (req, res) => veterinarianController.findAll(req, res));

// Get veterinarian by ID
/**
 * @swagger
 * /veterinarians/{id}:
 *   get:
 *     summary: Get veterinarian by ID
 *     tags: [Veterinarians]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Veterinarian found
 */
router.get("/:id", (req, res) => veterinarianController.findById(req, res));

// Update veterinarian
/**
 * @swagger
 * /veterinarians/{id}:
 *   put:
 *     summary: Update veterinarian by ID
 *     tags: [Veterinarians]
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
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Veterinarian updated successfully
 */
router.put("/:id", (req, res) => veterinarianController.update(req, res));

// Delete veterinarian
/**
 * @swagger
 * /veterinarians/{id}:
 *   delete:
 *     summary: Delete veterinarian by ID
 *     tags: [Veterinarians]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Veterinarian deleted successfully
 */
router.delete("/:id", (req, res) => veterinarianController.delete(req, res));

export default router;