import { Module } from '@nestjs/common';
import { DebtsController } from './debt.controller';
import { DebtServise } from './debt.service';
import { AuthServise } from '../auth/auth.service';

@Module({
  controllers: [DebtsController],
  providers: [DebtServise],
})
export class DebtModule {}
