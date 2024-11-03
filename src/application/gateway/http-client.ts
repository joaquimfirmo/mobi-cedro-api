export default interface IHttpClient {
  get(url: string, headers?: any, params?: any): Promise<any>
  // post(url: string, body: any, headers?: any): Promise<any>
  // put(url: string, body: any, headers?: any): Promise<any>
  // delete(url: string, headers?: any): Promise<any>
}
