import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @Column()
  balance: number;

  @Column()
  status: string;

  @CreateDateColumn({ default: null })
  created_at: string;

  @UpdateDateColumn({ default: null })
  updated_at: string;
}