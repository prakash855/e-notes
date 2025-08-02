import {
  archiveNotes,
  createNotes,
  deleteNotes,
  getNotes,
  getNotesById,
  pinNotes,
  updateNotes,
} from "../controllers/notes";
import router from "../routes/notes";

/**
 * @swagger
 * /notes:
 *   get:
 *     summary: Get all notes
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of notes
 *       401:
 *         description: Unauthorized - No token
 */

router.get("/notes", getNotes);

/**
 * @swagger
 * /notes:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - user
 *             properties:
 *               title:
 *                 type: string
 *                 example: Test
 *               content:
 *                 type: string
 *                 example: this is the test swagger created
 *               isArchived:
 *                 type: boolean
 *                 example: false
 *               backgroundColor:
 *                 type: string
 *                 example: green.300
 *               isPinned:
 *                 type: boolean
 *                 example: false
 *               user:
 *                 type: string
 *                 description: MongoDB ObjectId of the user
 *                 example: 67fbda3a824d57237c0f6180
 *     responses:
 *       201:
 *         description: Note created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized - Missing or invalid token
 */

router.post("/notes", createNotes);

/**
 * @swagger
 * /notes/{id}:
 *   get:
 *     summary: Get a note by ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the note
 *         example: 67fbda3a824d57237c0f6180
 *     responses:
 *       200:
 *         description: Note retrieved successfully
 *       401:
 *         description: Unauthorized - No token
 *       404:
 *         description: Note not found
 */

router.get("/notes/:id", getNotesById);

/**
 * @swagger
 * /notes/{id}:
 *   delete:
 *     summary: Delete a note by ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the note
 *         example: 67fbda3a824d57237c0f6180
 *     responses:
 *       200:
 *         description: Note deleted successfully
 *       401:
 *         description: Unauthorized - No token
 *       404:
 *         description: Note not found
 */

router.delete("/notes/:id", deleteNotes);

/**
 * @swagger
 * /notes/{id}/archive:
 *   patch:
 *     summary: Archive a note by Id
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the note
 *         example: 67fbda3a824d57237c0f6180
 *     responses:
 *       200:
 *         description: Note archived successfully
 *       401:
 *         description: Unauthorized - No token
 *       404:
 *         description: Note not found
 */

router.put("/notes/:id/archive", archiveNotes);

/**
 * @swagger
 * /notes/{id}/pin:
 *   patch:
 *     summary: Pin a note by Id
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the note
 *         example: 67fbda3a824d57237c0f6180
 *     responses:
 *       200:
 *         description: Note pinned successfully
 *       401:
 *         description: Unauthorized - No token
 *       404:
 *         description: Note not found
 */

router.patch("/notes/:id/pin", pinNotes);

/**
 * @swagger
 * /notes/{id}:
 *   patch:
 *     summary: Update a note by ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the note
 *         example: 67fbda3a824d57237c0f6180
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Test
 *               content:
 *                 type: string
 *                 example: this is the test swagger created
 *               isArchived:
 *                 type: boolean
 *                 example: false
 *               backgroundColor:
 *                 type: string
 *                 example: green.300
 *               isPinned:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Note updated successfully
 *       401:
 *         description: Unauthorized - No token
 *       404:
 *         description: Note not found
 */
router.patch("/notes/:id", updateNotes);
