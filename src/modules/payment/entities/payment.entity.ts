import { Category } from '../../category/entities/category.entity';
import { PaymantType } from '../types/category_type.enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'payments' })
export class Payment {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', default: PaymantType.INCOME })
  type: PaymantType;

  @Column({ type: 'int' })
  amount: number;

  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    name: 'createdAt',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    name: 'updatedAt',
  })
  updatedAt = new Date();

  @DeleteDateColumn({
    type: 'timestamp with time zone',
    name: 'deletedAt',
  })
  deletedAt?: Date;

  @ManyToMany(() => Category, (category) => category.payments)
  @JoinTable()
  categories: Category[];
}
