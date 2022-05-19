import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn('uuid')
    id : string

    @Column({ nullable : false})
    email : string

    @Column({ nullable : false})
    password : string

    @Column({ nullable : false})
    username : string

    @Column()
    socialSignUp : string

    @Column()
    socialPlatform : string

    @CreateDateColumn({ readonly: true })
    created_at: Date;
}
