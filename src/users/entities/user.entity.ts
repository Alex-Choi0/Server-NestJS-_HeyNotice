import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: true })
  socialSignUp: string;

  @Column({ nullable: true })
  socialPlatform: string;

  @Column({ nullable: true })
  reftoken: string;

  @CreateDateColumn({ readonly: true })
  created_at: Date;
}
