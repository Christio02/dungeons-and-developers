import User from '../model/User.ts';
import Monster from '../model/Monsters.ts';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import Race from '../model/Race.js';
import Class from '../model/Class.js';

const SECRET_KEY = process.env.SECRET_KEY || 'secret_key';

interface UserArgs {
  userName: string;
}

export default {
  Query: {
    async user(_: any, { id }: { id: string }) {
      return User.findById(id).populate('race').populate('class').populate('favoritedMonsters');
    },

    async checkUsername(_: any, { userName }: UserArgs) {
      const existingUser = await User.findOne({ userName });
      return !existingUser;
    },
  },

  Mutation: {
    async createUser(_: any, { userName }: UserArgs) {
      const existingUser = await User.findOne({ userName });
      if (existingUser) {
        throw new Error('Username is already taken');
      }

      const defaultRace = await Race.findOne({ index: 'human' });
      const defaultClass = await Class.findOne({ index: 'barbarian' });

      if (!defaultRace || !defaultClass) {
        throw new Error('Default race or class not found in the database'); // Check if defaults exist
      }

      const user = new User({
        userName,
        race: defaultRace._id,
        class: defaultClass._id,
      });

      await user.save();

      const token = jwt.sign({ id: user._id, userName: user.userName }, SECRET_KEY, { expiresIn: '2h' });

      return { user: await user.populate('race class'), token };
    },

    async loginUser(_: any, { userName }: UserArgs) {
      const user = await User.findOne({ userName }).populate('race').populate('class').populate('favoritedMonsters');
      if (!user) throw new Error('User not found');

      const token = jwt.sign({ id: user._id, userName: user.userName }, SECRET_KEY, { expiresIn: '2h' });

      return { user, token };
    },

    async addFavoriteMonster(_: any, { userId, monsterId }: { userId: string; monsterId: string }) {
      const user = await User.findById(userId).populate('favoritedMonsters');
      if (!user) throw new Error('User not found');

      const monsterObjectId = new mongoose.Types.ObjectId(monsterId);

      if (!user.favoritedMonsters.some(fav => fav._id.equals(monsterObjectId))) {
        user.favoritedMonsters.push(monsterObjectId);
        await user.save();
      }

      return user.populate('favoritedMonsters');
    },

    async removeFavoriteMonster(_: any, { userId, monsterId }: { userId: string; monsterId: string }) {
      const user = await User.findById(userId).populate('favoritedMonsters');
      if (!user) throw new Error('User not found');

      const monsterObjectId = new mongoose.Types.ObjectId(monsterId);

      user.favoritedMonsters.pull(monsterObjectId);
      await user.save();

      return user.populate('favoritedMonsters');
    },
  },
};