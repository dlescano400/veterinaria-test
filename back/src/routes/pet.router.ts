import { Router } from "express";
import { PetController } from "../controllers/pet.controller";

const router = Router();
const petController = new PetController();

// Create a new pet
/**
 * @swagger
 * /pets:
 *   post:
 *     summary: Create a new pet
 *     tags: [Pets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               species:
 *                 type: string
 *               breed:
 *                 type: string
 *               age:
 *                 type: number
 *               userId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Pet created successfully
 */
router.post("/", (req, res) => petController.create(req, res));

// Get all pets
/**
 * @swagger
 * /pets:
 *   get:
 *     summary: Get all pets
 *     tags: [Pets]
 *     responses:
 *       200:
 *         description: List of pets
 */
router.get("/", (req, res) => petController.findAll(req, res));

// Get pet by ID
/**
 * @swagger
 * /pets/{id}:
 *   get:
 *     summary: Get pet by ID
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pet found
 */
router.get("/:id", (req, res) => petController.findById(req, res));

// Update pet
/**
 * @swagger
 * /pets/{id}:
 *   put:
 *     summary: Update pet by ID
 *     tags: [Pets]
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
 *               name:
 *                 type: string
 *               species:
 *                 type: string
 *               breed:
 *                 type: string
 *               age:
 *                 type: number
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Pet updated successfully
 */
router.put("/:id", (req, res) => petController.update(req, res));

// Delete pet
/**
 * @swagger
 * /pets/{id}:
 *   delete:
 *     summary: Delete pet by ID
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pet deleted successfully
 */
router.delete("/:id", (req, res) => petController.delete(req, res));

// Get pets by user ID
/**
 * @swagger
 * /pets/user/{userId}:
 *   get:
 *     summary: Get pets by user ID
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of pets
 */
router.get("/user/:userId", (req, res) => petController.findByUserId(req, res));

export default router;
