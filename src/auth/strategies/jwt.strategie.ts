import {PassportStrategy} from '@nestjs/passport'
import {ExtractJwt , Strategy} from  'passport-jwt'

export class JwtStrategie extends PassportStrategy (Strategy)  {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.ACCESS_SECRET
          })
          
    }
    validate(payload) {
        return {
            userId : payload.userId
        }

    }

}