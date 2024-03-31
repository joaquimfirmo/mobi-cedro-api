export default interface RepositoryFactory {
  createAllRepositories(): Promise<void>
  injectRepositories(repositories: any[]): void
}
