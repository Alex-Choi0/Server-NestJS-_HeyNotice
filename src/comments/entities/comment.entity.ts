import { Board } from "src/boards/entities/board.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column({nullable : false})
    usersId : string;

    @Column({nullable : false})
    boardsId : string;

    @Column({nullable : false, type : 'text'})
    content : string

    @CreateDateColumn({readonly : true})
    created_at : Date;

    @JoinColumn()
    @ManyToOne(() => User, (users) => users.id, {
        cascade : true,
        onDelete : 'CASCADE'
    })
    users: User;
    
    @JoinColumn()
    @ManyToOne(() => Board, (boards) => boards.id, {
        cascade : true,
        onDelete : 'CASCADE'
    })
    boards: Board;
}
