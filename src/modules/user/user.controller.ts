import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CustomMessage } from '../../common/decorators/custom-message.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { RoleGuard } from './guards/role/role.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @CustomMessage('Users retrieved successfully')
  getUsers(@Query('name') name: string) {
    return this.userService.findAllUsers(name);
  }

  @Get(':id')
  getUsersById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findUserById(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(Number(id), updateUserDto);
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
