import { Injectable } from '@nestjs/common';
import { User } from 'src/users/users';
import { UsersService } from 'src/users/users.service';
import RefreshToken from './refresh-token';
import { sign, verify } from 'jsonwebtoken';
@Injectable()
export class AuthService {
    private refreshToken: RefreshToken[] = [];
    constructor(private readonly userService: UsersService) {

    }

    async refresh(refreshStr: string,): Promise<string | undefined> {
        const refreshToken = await this.retrieveRefreshToken(refreshStr);
        if (!refreshToken) {
            return undefined;
        }
        const user = await this.userService.findOne(refreshToken.userId);
        if (!user) {
            return undefined;
        }
        const accesToken = {
            userId: refreshToken.userId
        };
        return sign(accesToken, process.env.ACCESS_SECRET, { expiresIn: '1h' });

    }
    private retrieveRefreshToken(refreshStr: string): Promise<RefreshToken | undefined> {
        try {
            const decode = verify(refreshStr, process.env.REFRESH_SECRET);
            if (typeof decode === 'string') {
                return undefined;
            }
            return Promise.resolve(
                this.refreshToken.find((token) => token.id === decode.id)
            )
        } catch (e) {
            return undefined;
        }

    }

    async login(email: string, password: string, values: { userAgent: string, ipAdress: string })
        : Promise<{ accesToken: string, refreshToken: string | undefined }> {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            return undefined;
        }
        if (user.password !== password) {
            return undefined;
        }
        return this.newRefreshAndAccesToken(user, values);
    }
    private async newRefreshAndAccesToken(
        user: User,
        values: {
            userAgent: string, ipAdress: string
        }): Promise<{ accesToken: string, refreshToken: string }> {
        const refreshObject = new RefreshToken({
            id: this.refreshToken.length === 0 ? 0 :
                this.refreshToken[this.refreshToken.length - 1].id + 1, ...values, userId: user.userId
        });
        this.refreshToken.push(refreshObject);

        return {
            refreshToken: refreshObject.sign(),
            accesToken: sign(
                {
                    userId: user.userId,

                },
                process.env.ACCESS_SECRET,
                {
                    expiresIn: '1H',
                }
            )
        }
    }
    async logout (refreshStr) : Promise <void> {
        const refreshToken = await this.retrieveRefreshToken(refreshStr);
        if (!refreshToken){
            return undefined;
        }
        this.refreshToken =  this.refreshToken.filter(
            (refreshToken)=> refreshToken.id !== refreshToken.id
        );
    }
}
