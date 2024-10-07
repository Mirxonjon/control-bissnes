import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UsersEntity } from './users.entity';
import { OrdersEntity } from './orders.entity';

@Entity()
export class DebtsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  remaining_debt: string; // qarz miqdori

  @Column({
    type: 'character varying',
    nullable: true,
    default: 'true',
  })
  isActive: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  comment: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  dayToBeGiven: Date; // berilish kerka bo'lgan vaqti

  @Column({
    type: 'date',
    nullable: true,
  })
  dayGiven: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  update_date: Date;

  @CreateDateColumn({ name: 'created_at' })
  create_data: Date;

  @ManyToOne(() => UsersEntity, (user) => user.debts, {
    nullable: true,
  })
  user_id: UsersEntity;

  @ManyToOne(() => OrdersEntity, (user) => user.debt, {
    nullable: true,
  })
  order_id: OrdersEntity;
}
