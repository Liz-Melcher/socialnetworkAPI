// utils/data.ts

export const users = [
  {
    username: 'coolcoder',
    email: 'coolcoder@example.com',
  },
  {
    username: 'devqueen',
    email: 'devqueen@example.com',
  },
  {
    username: 'node_ninja',
    email: 'ninja@node.io',
  },
];

export const thoughts = [
  {
    thoughtText: 'What do you think about REST APIs?',
    username: 'coolcoder',
    reactions: [
      {
        reactionBody: 'Love them!',
        username: 'devqueen',
      },
      {
        reactionBody: 'Can be tricky...',
        username: 'node_ninja',
      },
    ],
  },
  {
    thoughtText: 'MongoDB is flexible but kind of wild.',
    username: 'devqueen',
    reactions: [
      {
        reactionBody: 'Agreed — schemas are optional chaos.',
        username: 'coolcoder',
      },
    ],
  },
];

// Simple friend mapping (usernames)
export const friendsMap: Record<string, string[]> = {
  coolcoder: ['devqueen'],
  devqueen: ['coolcoder', 'node_ninja'],
  node_ninja: ['devqueen'],
};
