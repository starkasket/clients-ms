import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CustomersModule } from './customers/customers.module.js';


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), CustomersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
