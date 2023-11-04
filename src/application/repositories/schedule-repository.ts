export default interface IScheduleRepository {
  list(): Promise<any>
  findByCity(city: string): Promise<any>
}
