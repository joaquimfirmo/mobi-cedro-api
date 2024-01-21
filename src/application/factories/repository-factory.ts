export default interface RepositoryFactory {
  createAllRepositories(): Array<{ name: string; repository: any }>
}
