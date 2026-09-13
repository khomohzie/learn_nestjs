import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './interface/user.interface';
import { UserLogger } from './user.logger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userLogger: UserLogger) {}

  private users: User[] = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com' },
  ];

  findAllUsers(name: string = ''): User[] {
    this.userLogger.log('finding all users');

    return this.users.filter((user) =>
      user.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  findUserById(id: number): User {
    this.userLogger.log(`finding user with id: ${id}`);

    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  createUser(user: CreateUserDto): User {
    this.userLogger.log(`creating user`);

    const newUser = { ...user, id: this.users.length + 1 };

    this.users.push(newUser);

    return newUser;
  }

  updateUser(id: number, user: UpdateUserDto): User | null {
    this.userLogger.log(`updating user`);

    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      return null;
    }

    return (this.users[index] = { ...this.users[index], ...user });
  }

  deleteUser(id: number): User | null {
    this.userLogger.log(`deleting user`);

    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      return null;
    }

    return this.users.splice(index, 1)[0];
  }
}
