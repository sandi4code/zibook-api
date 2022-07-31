import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  category_id: number

  @Column({ default: null })
  debt_id: number;

  @Column({ default: null })
  credit_id: number;

  @Column()
  date: string;

  @Column()
  type: string;

  @Column()
  amount: number;
  
  @Column()
  description: string;

  @CreateDateColumn({ default: null })
  created_at: string;

  @UpdateDateColumn({ default: null })
  updated_at: string;
}