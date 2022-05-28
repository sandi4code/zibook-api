import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('auth_users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  phone: string;

  @Column()
  customer_id: number;

  @Column()
  image_id: string;

  @Column()
  image_version: string;

  @Column()
  image_url: string;

  @Column()
  password_hash: string;

  @Column()
  reset_hash: string;

  @Column()
  reset_at: string;

  @Column()
  reset_expires: string;

  @Column()
  activate_hash: string;

  @Column()
  status: string;

  @Column({ default: 0 })
  active: number;

  @Column({ default: 0 })
  force_pass_reset: number;

  @Column()
  timezone: string;

  @CreateDateColumn({ default: null })
  created_at: string;

  @UpdateDateColumn({ default: null })
  updated_at: string;

  @DeleteDateColumn({ default: null })
  deleted_at: string;

  @Column({ default: null })
  created_by: number;

  @Column({ default: null })
  updated_by: number;

  @Column({ default: null })
  deleted_by: number;
}