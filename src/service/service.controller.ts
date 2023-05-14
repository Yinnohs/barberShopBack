import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto, updateServiceDto } from './dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/v1/service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post('/')
  async createService(@Body() createServiceData: CreateServiceDto) {
    return await this.serviceService.createService(createServiceData);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/all')
  async findAllServices() {
    return await this.serviceService.findAllServices();
  }

  @Get('/:id')
  async findOneService(@Param('id') id: string) {
    const serviceId = parseInt(id, 10);
    return await this.serviceService.findOneService(serviceId);
  }

  @Put('/')
  async updateService(@Body() updateServiceData: updateServiceDto) {
    return await this.updateService(updateServiceData);
  }

  @Delete(':id')
  async softDeleteService(@Param('id') id: string) {
    const serviceId = parseInt(id, 10);
    return await this.serviceService.sofDeleteService(serviceId);
  }

  @Delete('/hard/:id')
  async deleteService(@Param('id') id: string) {
    const serviceId = parseInt(id, 10);
    return await this.serviceService.deleteService(serviceId);
  }
}
