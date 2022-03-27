import type { AspidaClient } from 'aspida'
import { dataToURLString } from 'aspida'
import type { Methods as Methods0 } from './people/_id'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/people'
  const GET = 'GET'
  const PUT = 'PUT'

  return {
    people: {
      _id: (val1: number | string) => {
        const prefix1 = `${PATH0}/${val1}`

        return {
          get: (option: { query: Methods0['get']['query'], config?: T | undefined }) =>
            fetch<Methods0['get']['resBody']>(prefix, prefix1, GET, option).json(),
          $get: (option: { query: Methods0['get']['query'], config?: T | undefined }) =>
            fetch<Methods0['get']['resBody']>(prefix, prefix1, GET, option).json().then(r => r.body),
          put: (option: { body: Methods0['put']['reqBody'], config?: T | undefined }) =>
            fetch<Methods0['put']['resBody']>(prefix, prefix1, PUT, option).json(),
          $put: (option: { body: Methods0['put']['reqBody'], config?: T | undefined }) =>
            fetch<Methods0['put']['resBody']>(prefix, prefix1, PUT, option).json().then(r => r.body),
          $path: (option?: { method?: 'get' | undefined; query: Methods0['get']['query'] } | undefined) =>
            `${prefix}${prefix1}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
        }
      }
    }
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
