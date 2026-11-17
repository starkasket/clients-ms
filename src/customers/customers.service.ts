import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto.js';
import { UpdateCustomerDto } from './dto/update-customer.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { PaginationDto } from '../common/dto/pagination.dto.js';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createCustomerDto: CreateCustomerDto) {
    const customerFound = await this.prisma.customer.findFirst({
      where: {
        email: createCustomerDto.email,
      }
    });

    if (customerFound) {
      throw new RpcException({
        status: HttpStatus.CONFLICT,
        message: `${customerFound.email} exists already`
      });
    }
    const customer = await this.prisma.customer.create({
      data: createCustomerDto,
    });

    return customer;
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto

    const totalCustomers = await this.prisma.customer.count();
    const lastPage = Math.ceil(totalCustomers / limit);

    return {
      data: await this.prisma.customer.findMany({
        skip: (page - 1) * limit,
        take: limit,
      }),
      meta: {
        total: totalCustomers,
        page: page,
        lastPage: lastPage,
      },
    };
  }

  async findOne(id: number) {
    const customer = await this.prisma.customer.findFirst({
      where: {
        id: id,
      }
    });

    if (!customer) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: `Customer with id: ${id} not found.`
      });
    }

    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const { id: ___, ...data } = updateCustomerDto;
    await this.findOne(id);
    return this.prisma.customer.update({
      where: { id },
      data: data,
    })
  }

  async remove(id: number) {
    await this.findOne(id);

    const customer = await this.prisma.customer.delete({
      where: { id },
    });

    return {
      status: 200,
      msg: 'Category deleted succesfully',
      customer: customer
    }
  }
}
