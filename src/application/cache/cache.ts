export default interface ICache {
  get(key: string): any
  set(key: string, cities: any): void
  del(key: string): void
}
