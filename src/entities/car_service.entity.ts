import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersEntity } from './users.entity';
import { OrdersEntity } from './orders.entity';

@Entity()
export class CarServiceEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'character varying',
    nullable: false,
  })
  profit_or_expense: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  price: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  comment: string;

  @CreateDateColumn({ name: 'created_at' })
  create_data: Date;

  @ManyToOne(() => UsersEntity, (user) => user.carServices)
  user_id: UsersEntity;

  @ManyToOne(() => OrdersEntity, (user) => user.carServices)
  order_id: OrdersEntity;
}
