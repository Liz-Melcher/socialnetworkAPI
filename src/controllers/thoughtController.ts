import { Request, Response } from 'express';
import { Thought, User } from '../models/index.js';

// GET all thoughts
export const getAllThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    return res.json(thoughts);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to get thoughts', details: err });
  }
};

// GET a single thought by ID
export const getThoughtById = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);

    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    return res.json(thought);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to get thought', details: err });
  }
};

// POST create a new thought
export const createThought = async (req: Request, res: Response) => {
  try {
    const newThought = await Thought.create(req.body);

    // Push the thought _id to the associated user's `thoughts` array
    await User.findByIdAndUpdate(
      req.body.userId,
      { $push: { thoughts: newThought._id } },
      { new: true }
    );

    return res.status(201).json(newThought);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to create thought', details: err });
  }
};

// PUT update a thought
export const updateThought = async (req: Request, res: Response) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    return res.json(updatedThought);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update thought', details: err });
  }
};

// DELETE a thought
export const deleteThought = async (req: Request, res: Response) => {
  try {
    const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);

    if (!deletedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    return res.json({ message: 'Thought deleted successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to delete thought', details: err });
  }
};

// POST add a reaction to a thought
export const addReaction = async (req: Request, res: Response) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    );

    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    return res.json(updatedThought);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to add reaction', details: err });
  }
};

// DELETE a reaction from a thought
export const removeReaction = async (req: Request, res: Response) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );

    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    return res.json(updatedThought);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to remove reaction', details: err });
  }
};
