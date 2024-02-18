import crypto from 'crypto'

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
}
