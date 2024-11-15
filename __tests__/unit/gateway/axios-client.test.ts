import axios from 'axios'
import AxiosClient from '../../../src/infrastructure/gateway/axios-client'
jest.mock('axios', () => {
  return {
    create: jest.fn(() => axios),
    isAxiosError: jest.fn(),
  }
})

const mockedAxios = axios as jest.Mocked<typeof axios>

describe('Axios Client', () => {
  let axiosClient: AxiosClient
  let baseUrl: string

  beforeEach(() => {
    baseUrl = 'http://localhost:3000'
    axiosClient = new AxiosClient(baseUrl)
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('should return a response when the method get is called', async () => {
    const url = '/localidades/estados'
    const headers = {
      Authorization: 'Bearer token',
    }
    const params = {
      limit: 2,
    }

    const response = {
      data: [
        {
          id: 1,
          sigla: 'AC',
          nome: 'Acre',
        },
        {
          id: 2,
          sigla: 'AL',
          nome: 'Alagoas',
        },
      ],
    }

    mockedAxios.get = jest.fn().mockResolvedValue(response)
    const result = await axiosClient.get(url, headers, params)

    expect(mockedAxios.get).toHaveBeenCalledTimes(1)
    expect(mockedAxios.get).toHaveBeenCalledWith(url, { headers, params })
    expect(result).toEqual(response.data)
  })

  it('should return an error when the method get is called', async () => {
    const url = '/companies'
    const headers = {
      Authorization: 'Bearer token',
    }
    const params = {
      limit: 2,
    }

    const error = {
      message: 'Internal Server Error',
      status: 500,
    }

    mockedAxios.get = jest.fn().mockRejectedValue(error)
    const result = await axiosClient.get(url, headers, params)

    expect(mockedAxios.get).toHaveBeenCalledTimes(1)
    expect(mockedAxios.get).toHaveBeenCalledWith(url, { headers, params })
    expect(result).toEqual(error)
  })
})
