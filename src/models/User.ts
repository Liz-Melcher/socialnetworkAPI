import { Schema, model, Document, ObjectId } from 'mongoose';

// TypeScript interface for a User document
export interface IUser extends Document {
  username: string;
  email: string;
  thoughts: ObjectId[];
  friends: ObjectId[];
  friendCount?: number; // virtual
}

// Schema to create User model
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must be a valid email address'], //email validation
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Virtual to get friend count
userSchema.virtual('friendCount').get(function (this: IUser) {
  return this.friends.length;
});

// Initialize our User model
const User = model<IUser>('User', userSchema);

export default User;
