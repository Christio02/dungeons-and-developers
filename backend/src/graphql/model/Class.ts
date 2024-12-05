import { model, Schema } from 'mongoose';

/**
 *
 * Schema for the class in the backend database
 */

const ClassSchema = new Schema({
  index: { type: String, required: true },
  name: { type: String, required: true },
  hit_die: { type: Number, required: true },
  skills: [{ type: String }],
});

export default model('Class', ClassSchema);
