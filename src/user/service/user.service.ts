import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../dtos/schema/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(user: User) {
    const newUser = {
      email: user.email,
      username: user.username,
      password: user.password,
      bannerColor: '#8E4EF5',
      perfilColor: '#8E4EF5',
    };
    const createdUser = new this.userModel(newUser);
    await createdUser.save();
    return createdUser;
  }

  async createUserNext(user: User) {
    const newUser = {
      email: user.email,
      username: user.username,
      bannerColor: '#8E4EF5',
      perfilColor: '#8E4EF5',
    };
    const createdUser = new this.userModel(newUser);
    await createdUser.save();
    return createdUser;
  }

  async update(id: string, updatedFields: Partial<User>) {
    const userUpdate = this.userModel.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });
    return userUpdate;
  }

  async delete(id: string) {
    const userDelete = this.userModel.findByIdAndDelete(id);
    return userDelete;
  }

  async findByEmail(email: string) {
    const theUser = await this.userModel.findOne({ email });
    return theUser;
  }

  async findAllUsers(users: string[]) {
    const allUsers = await this.userModel.find({ _id: { $in: users } });
    return allUsers;
  }

  async logar(user: User) {
    const userExist = await this.userModel.findOne({ email: user.email });

    if (!userExist) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(
      user.password,
      userExist.password,
    );

    if (!isPasswordValid) {
      return null;
    }

    return userExist;
  }
}
