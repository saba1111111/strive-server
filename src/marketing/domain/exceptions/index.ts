// TODO problem with exceptions is that they are domain level exceptions (business rules) and this must not be depend on nest.js HttpException
export * from './already-subscribed.exception';
export * from './subscription-failed.exception';
export * from './admin-not-found.exception';
export * from './campaign-not-found.exception';
export * from './already-started-campaign-can-not-mutate.exception';
