import { Schema, InferSchemaType, model } from 'mongoose';

const noteSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  text: { type: String },
  title: { type: String, required: true },
}, { timestamps: true });

type Note = InferSchemaType<typeof noteSchema>;

export default model<Note>('Note', noteSchema);
