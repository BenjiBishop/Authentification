import { Injectable } from '@nestjs/common';
import { User } from './users';

export type user = any;
@Injectable()
export class UsersService {

    private readonly users : User[] = [
        {
            userId : 1,
            userName : "benjamin",
            email : "benjamin@esp.sn",
            password : "passer123"
        },
        {
            userId : 2,
            userName: "sophie",
            email : "fasha@esp.sn",
            password : "kitty123"
        }
    ]

    async findByEmail (email : String) : Promise <User | undefined> {
        return this.users.find(user => user.email === email)
    }
    async findOne( userId : number): Promise <User | undefined> {
        return this.users.find(user => user.userId === userId)
    }
}
