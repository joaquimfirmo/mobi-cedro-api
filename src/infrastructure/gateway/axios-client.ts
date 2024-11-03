import IHttpClient from '../../application/gateway/http-client'
import axios, { AxiosInstance, AxiosError } from 'axios'

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
      if (axios.isAxiosError(error)) {
        const axiosError: AxiosError = error
        return {
          message: axiosError.message,
          status: axiosError.response?.status,
        }
      } else {
        return {
          message: error.message,
          status: 500,
        }
      }
    }
  }
}
