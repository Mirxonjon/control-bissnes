import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductCategoriesEntity } from './product_Categories.entity';
import { OrderProductsEntity } from './order_products.entity';

@Entity()
export class ProductsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  title: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  searchable_title_id: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  type: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  price: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  total_measurement: string; // jami metr

  @Column({
    type: 'character varying',
    nullable: true,
  })
  current_measurement: string; // hozirgi metr

  @Column({
    type: 'character varying',
    nullable: false,
  })
  total_quantity: string; // jami soni

  @Column({
    type: 'character varying',
    nullable: false,
  })
  current_quantity: string; // hozirgi soni

  @UpdateDateColumn({ name: 'updated_at' })
  update_date: Date;

  @CreateDateColumn()
  data_sequence: Date;

  @CreateDateColumn({ name: 'created_at' })
  create_data: Date;

  @ManyToOne(() => ProductCategoriesEntity, (categories) => categories.products)
  @JoinColumn({ name: 'category_id' })
  category_id: ProductCategoriesEntity;

  @OneToMany(() => OrderProductsEntity, (orderItem) => orderItem.product_id)
  productItems: OrderProductsEntity[];
}
