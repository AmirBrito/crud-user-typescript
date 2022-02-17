import { Entity, Column, CreateDateColumn, PrimaryColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import { v4 as uuid } from "uuid";
import bcrypt from 'bcrypt';
import { IsEmail, IsNotEmpty, Length } from "class-validator";

@Entity("users")
export class User {
    
    @PrimaryColumn()
    id: string;

    @IsNotEmpty()
    @Length(3,20)
    @Column()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    @Column()
    email: string;

    @IsNotEmpty()
    @Length(6,20)
    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    constructor() {
        if(!this.id){
            this.id = uuid();
        }
    }
}
