import TransportsRepository from '../repositories/transports-repository'

export default interface RepositoryFactory {
  createTransportsRepository(): TransportsRepository
}
