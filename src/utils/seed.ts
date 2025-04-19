// utils/seed.ts

import db from '../config/connection.js';
import { User, Thought } from '../models/index.js';
import { users, thoughts, friendsMap } from './data.js';

const seed = async () => {
  try {
    db.once('open', async () => {
      console.log('Connected to MongoDB');

      await User.deleteMany({});
      await Thought.deleteMany({});

      // Step 1: Insert Users
      const createdUsers = await User.insertMany(users);
      const userMap = new Map(createdUsers.map(user => [user.username, user]));

      console.log(`Inserted ${createdUsers.length} users`);

      // Step 2: Insert Thoughts and Reactions
      for (const thought of thoughts) {
        const user = userMap.get(thought.username);
        if (!user) continue;

        const newThought = await Thought.create({
          thoughtText: thought.thoughtText,
          username: user.username,
          reactions: thought.reactions || [],
        });

        await User.findByIdAndUpdate(user._id, {
          $push: { thoughts: newThought._id },
        });
      }

      // Step 3: Add Friends
      for (const [username, friendUsernames] of Object.entries(friendsMap)) {
        const user = userMap.get(username);
        if (!user) continue;

        const friendIds = friendUsernames
          .map(friendName => userMap.get(friendName)?._id)
          .filter(Boolean); // remove undefined

        await User.findByIdAndUpdate(user._id, {
          $addToSet: { friends: { $each: friendIds } },
        });
      }

      console.log('Seeding complete');
      process.exit(0);
    });
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seed();
