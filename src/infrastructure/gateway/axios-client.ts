import IHttpClient from '../../application/gateway/http-client'
import axios, { AxiosInstance } from 'axios'

export default class AxiosClient implements IHttpClient {
  private readonly axiosInstance: AxiosInstance

  constructor(private readonly baseUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
    })
  }

  async get(url: string, headers?: any, params?: any): Promise<any> {
    try {
      const response = await this.axiosInstance.get(url, { headers, params })
      return response.data
    } catch (error: any) {
      return {
        message: error.message,
        status: 500,
      }
    }
  }
}
