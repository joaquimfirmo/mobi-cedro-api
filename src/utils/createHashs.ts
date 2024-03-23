import crypto from 'crypto'
import bcrypt from 'bcrypt'

export default class createHashs {
  static createHashMd5(data: any): string {
    const objectResult = Object.assign({}, data)

    if (objectResult.id) {
      delete objectResult.id
    }
    const orderedObject = Object.fromEntries(
      Object.entries(objectResult).sort()
    )

    const objectHashMd5 = crypto
      .createHash('md5')
      .update(JSON.stringify(orderedObject))
      .digest('hex')

    console.log('Gerado objectHashMd5:', objectHashMd5)

    return objectHashMd5
  }

  static async createHashPassword(password: string): Promise<string> {
    const saltRounds = 10
    const hash = await bcrypt.hash(password, saltRounds)
    return hash
  }

  static async compareHashPassword(
    password: string,
    hash: string
  ): Promise<boolean> {
    console.log('password', password)
    const result = await bcrypt.compare(password, hash)
    return result
  }
}
