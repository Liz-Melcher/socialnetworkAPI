import { Router } from 'express';
import {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} from '../../controllers/thoughtController.js';

const router = Router();

// /api/thoughts
router.route('/')
  .get(getAllThoughts)     // GET all thoughts
  .post(createThought);    // POST create a new thought

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
  .get(getThoughtById)     // GET one thought
  .put(updateThought)      // PUT update a thought
  .delete(deleteThought);  // DELETE a thought

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
  .post(addReaction);      // POST add a reaction

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction); // DELETE a reaction

export default router;
