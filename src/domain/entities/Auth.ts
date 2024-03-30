import { sign } from 'jsonwebtoken'
import { Service } from 'typedi'
import bcrypt from 'bcrypt'

@Service('auth')
export default class Auth {
  constructor() {}

  public async comparePassword(
    password: string,
    hash: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash)
  }

  public createToken(userId: string, permissions: string): string {
    return sign(
      {
        userId,
        permissions,
      },
      process.env.SECRET_KEY!,
      {
        expiresIn: '1h',
      }
    )
  }

  public validate(decoded: any): any {
    if (!decoded.userId) {
      return { isValid: false }
    } else {
      return {
        isValid: true,
        credentials: {
          userId: decoded.userId,
          group: decoded.permissions,
          expiresIn: decoded.exp,
        },
      }
    }
  }
}
