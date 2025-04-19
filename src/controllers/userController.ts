import { Request, Response } from 'express';
import { User, Thought } from '../models/index.js';

// GET all users
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get users', details: err });
  }
};

// GET a single user by ID with populated thoughts and friends
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate('thoughts')
      .populate('friends');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to get user', details: err });
  }
};


// POST create new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user', details: err });
  }
};

// PUT update user by ID
export const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(updatedUser);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update user', details: err });
  }
};


// DELETE user by ID;remove associated thoughts
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete all thoughts created by this user
    await Thought.deleteMany({ _id: { $in: user.thoughts } });

    return res.json({ message: 'User and associated thoughts deleted' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to delete user', details: err });
  }
};


// POST add a friend (by pushing friendId into friends array)
export const addFriend = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to add friend', details: err });
  }
};

// DELETE remove a friend
export const removeFriend = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to remove friend', details: err });
  }
};

