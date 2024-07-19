import { Request, Response } from 'express';
import { Controller, Get, Param, Res, HttpStatus, Post, Body, Delete, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { FollowDto } from './follow.dto';

@Controller('users')
export class UserController {
  constructor(private user_service: UserService){}

  @Get('get-by-id/:id')
  async get_user_by_id(@Param('id') id: string, @Res() response: Response){
    const user_by_id = await this.user_service.get_user_by_id(id);

    return response
      .status(HttpStatus.ACCEPTED)
      .json({ user: user_by_id });
  }

  @Get('get')
  async get_user(
    @Req() request: Request,
    @Res() response: Response
  ){
    const logged_user = await this.user_service.get_logged_user(request['user'].id);
    
    return response
      .status(HttpStatus.ACCEPTED)
      .json({ logged_user });
  }

  @Get('get_followed_tags')
  async get_followed_tags(@Req() request: Request, @Res() response: Response) {
    const followed_tags = await this.user_service.get_followed_tags(request['user'].id);

    return response.status(HttpStatus.OK).json({ followed_tags });
  }

  @Post('follow_tag')
  async follow_tag(@Body() follow_dto: FollowDto, @Req() request: Request, @Res() response: Response){
    
    const res = await this.user_service.follow_tag(request['user'].id, follow_dto);
    
    if(res.error) return response.status(HttpStatus.BAD_REQUEST).json({ error: res.error });

    return response.status(HttpStatus.ACCEPTED).json({ tag: res.tag });
  }

  @Delete('unfollow_tag')
  async unfollow_tag(@Body() follow_dto: FollowDto, @Req() request: Request, @Res() response: Response){
    const tag = await this.user_service.unfollow_tag(request['user'].id, follow_dto);

    return response.status(HttpStatus.OK).json(tag);
  }
}
