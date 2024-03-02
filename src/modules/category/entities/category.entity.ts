import { Payment } from '../../payment/entities/payment.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @ManyToMany(() => Payment, (payment) => payment.categories)
  payments: Payment[];
}
