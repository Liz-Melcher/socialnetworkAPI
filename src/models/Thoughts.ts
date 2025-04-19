import { Schema, model, Document, Types } from 'mongoose';

// Reaction Subdocument Interface
interface IReaction {
  reactionId: Types.ObjectId; //unique ID for each reaction
  reactionBody: string; // content of the reaction 
  username: string; //user who created the reaction 
  createdAt: Date; //Timestamp 
}

// Thought Interface
export interface IThought extends Document {
  thoughtText: string; //main contents of the thought 
  createdAt: Date; // time stamps 
  username: string; // user who created the though 
  reactions: IReaction[]; //array of reaction sub-documents for the thoughts 
  reactionCount?: number; // virtual; optional for the total number of reactions 
}

// Reaction Schema (Subdocument Only, used inside Thought)
const reactionSchema = new Schema<IReaction>(
  {
    reactionId: { 
        //generate a unique object ID by default 
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280, //Max character length from insturctions 
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
        // Set default to current date and time 
      type: Date,
      default: Date.now,
      //format the timestamp when it's queried 
      get: ((timestamp: Date) => timestamp.toLocaleString()) as any,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// Thought Schema; includes an array of reactions 
const thoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280, // from the instructions 
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: ((timestamp: Date) => timestamp.toLocaleString()) as any,
      // same date format at the reaction schema 
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema], //embed an array of reaction subdocuments 
  },
  {
    toJSON: {
      virtuals: true, //include viruatls when converting to JSON
      getters: true, // Also included getters; getter is date formatting in this code
    },
    id: false, // don't include the default virtual 'id' 
  }
);

// Virtual to get reaction count
// Returns the number of reactions for a thought 
thoughtSchema.virtual('reactionCount').get(function (this: IThought) {
  return this.reactions.length;
});

//compile the model from the schema and export it 
const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;
