import { Controller, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CustomersService } from './customers.service.js';
import { CreateCustomerDto } from './dto/create-customer.dto.js';
import { UpdateCustomerDto } from './dto/update-customer.dto.js';
import { PaginationDto } from '../common/dto/pagination.dto.js';

@Controller()
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @MessagePattern({ cmd: 'create_customer'})
  create(@Payload() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @MessagePattern({ cmd: 'find_all_customers' })
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.customersService.findAll(paginationDto);
  }


  @MessagePattern({ cmd: 'find_one_customer' })
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.customersService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_customer' })
  update(@Payload() updateCustomerDto: UpdateCustomerDto) {
    return this.customersService.update(updateCustomerDto.id, updateCustomerDto);
  }

  @MessagePattern({ cmd: 'remove_customer' })
  remove(@Payload('id') id: number) {
    return this.customersService.remove(id);
  }
}
