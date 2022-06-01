import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('balances')
export class Balance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  transaction_id: number;

  @Column()
  amount: number;

  @CreateDateColumn({ default: null })
  created_at: string;

  @UpdateDateColumn({ default: null })
  updated_at: string;
}