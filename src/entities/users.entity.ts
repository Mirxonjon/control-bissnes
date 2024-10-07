import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrdersEntity } from './orders.entity';
import { DebtsEntity } from './debt.entity';
import { CarServiceEntity } from './car_service.entity';

@Entity()
export class UsersEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'character varying',
    nullable: false,
  })
  first_name: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  name: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  last_name: string;

  @Column({
    type: 'character varying',
    nullable: true,
    // transformer:
  })
  password: string;

  @Column({
    type: 'character varying',
    default: 'user',
  })
  role: string;

  @Column({
    type: 'character varying',
    nullable: false,
    unique: true,
  })
  phone: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  img: string;

  @Column({
    type: 'character varying',
    nullable: true,
    // transformer:
  })
  comment: string;

  @UpdateDateColumn({ name: 'updated_at' })
  update_date: Date;

  @CreateDateColumn({ name: 'created_at' })
  create_data: Date;

  @OneToMany(() => OrdersEntity, (order) => order.user_id)
  orders: OrdersEntity[];

  @OneToMany(() => DebtsEntity, (debt) => debt.user_id, {
    nullable: true,
  })
  debts: DebtsEntity[];

  @OneToMany(() => CarServiceEntity, (carService) => carService.user_id)
  carServices: CarServiceEntity[];
}
// Table category {
//   id uuid
//   title varchar
//   created_at timestamp
// }

// Table product {
//   id uuid
//   title varchar
//   searchable_title_id varchar
//   type varchar
//   total_measurement varchar
//   current_measurement varchar
//   total_quantity varchar
//   current_quantity varchar
//   price varchar
//   created_at timestamp
//   category_id uuid
// }

// Table user {
//   id uuid
//   first_name varchar
//   name varchar
//   last_name varchar
//   phone varchar unique
//   password varchar
//   passport_image varchar
//   comment varchar
//   created_at timestamp
// }

// Table sell {
//   id uuid
//   // product_id varchar
//   daily_price  varchar
//   total_price  varchar
//   user_id uuid
//   created_at timestamp
// }

// Table sellProducts {
//   id uuid
//   // product_id varchar
//   sell_id uuid
//   product_id uuid
//   quantity_sold varchar
//   measurement_sold varchar
//   price_per_day  varchar
//   unused_days varchar
//   given_date timestamp
//   status varchar
//   end_date timestamp
//   created_at timestamp
// }

// Table service_car {
//   id uuid
//   // product_id varchar
//   price varchar
//   profit_or_expense varchar
//   comment varchar
//   sell_id uuid
//   created_at timestamp
// }

// Table debt {
//   id uuid
//   remaining_debt varchar
//   comment varchar
//   sell_id varchar
//   user_id uuid
//   end_date timestamp
//   created_at timestamp
// }
// Ref: "category"."id" < "product"."category_id"

// Ref: "user"."id" < "sell"."user_id"

// Ref: "sell"."id" < "sellProducts"."sell_id"

// Ref: "product"."id" < "sellProducts"."product_id"

// Ref: "sell"."id" < "service_car"."sell_id"

// Ref: "sell"."id" < "debt"."sell_id"

// Ref: "user"."id" < "debt"."user_id"
