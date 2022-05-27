import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('boards')
export class Board {
    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column({nullable: false})
    usersId : string;

    @Column({nullable: false})
    name : string;

    @Column({nullable : true, type : 'text'})
    content : string;

    @CreateDateColumn({readonly : true})
    created_at : Date

    @JoinColumn()
    @ManyToOne(() => User, (users) => users.id, {
        cascade : true,
        onDelete : 'CASCADE' // DB에서 
    })
    users : User;
}


