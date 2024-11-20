import { model, Schema, Types } from 'mongoose';

const playerSchema = new Schema({
  userName: { type: String, required: true },
  class: { type: Types.ObjectId, ref: 'Class' },
  race: { type: Types.ObjectId, ref: 'Race' },
  abilityScores: [
    {
      ability: { type: Schema.Types.ObjectId, ref: 'Ability Score' },
      score: { type: Number, required: true },
    },
  ],
  equipments: [{ type: Schema.Types.ObjectId, ref: 'Equipment' }],
  favoritedMonsters: [{ type: Types.ObjectId, ref: 'Monster' }],
  dungeonName: { type: String, default: 'My Dungeon' },
});

export default model('User', playerSchema);

