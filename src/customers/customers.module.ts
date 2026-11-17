import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service.js';
import { CustomersController } from './customers.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
  imports: [PrismaModule]
})
export class CustomersModule {}
