import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateSearchDto } from './dto/create-search.dto';
import { UpdateSearchDto } from './dto/update-search.dto';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post()
  create(@Body() createSearchDto: CreateSearchDto) {
    return this.searchService.create(createSearchDto);
  }

  @Get()
  findAll() {
    return this.searchService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.searchService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSearchDto: UpdateSearchDto) {
    return this.searchService.update(+id, updateSearchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.searchService.remove(+id);
  }
}
