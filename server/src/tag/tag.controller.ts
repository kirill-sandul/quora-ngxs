import { Controller, Post, HttpStatus, Res, Body, Get, Param, Query } from '@nestjs/common';
import { Response } from 'express';
import { TagService } from './tag.service';
import { AddTagDto } from './add-tag.dto';

@Controller('tag')
export class TagController {
  constructor(private tag_service: TagService){}

  @Get('get_all')
  async get_all(@Res() response: Response){
    const tags = await this.tag_service.get_all();

    return response.status(HttpStatus.OK).json({ tags });
  }

  @Get('get/:name')
  async get_by_name(@Param('name') name: string, @Res() response: Response){
    const tag = await this.tag_service.get_by_name(name);
  
    return response.status(HttpStatus.OK).json({ tag });
  }

  @Get('select_tags')
  async select_tags(
    @Query('start_index') start_index: number,
    @Query('last_index') last_index: number,
    @Res() response: Response
  ){
    const selected = await this.tag_service.select_tags(start_index, last_index);

    return response.status(HttpStatus.OK).json({ selected });
  }

  @Post('add')
  async add_tag(@Body() add_tag_dto: AddTagDto, @Res() response: Response){
    const new_tag = await this.tag_service.add(add_tag_dto);

    return response.status(HttpStatus.CREATED).json({ new_tag });
  }
}
