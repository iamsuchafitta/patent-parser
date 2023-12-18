import { Mutation, Resolver } from '@nestjs/graphql';
import { AnonymousService } from './anonymous.service';

@Resolver()
export class AnonymousResolver {
  constructor(private readonly anonymousService: AnonymousService) {
  }

  @Mutation(() => Boolean)
  public async proxyReset() {
    await this.anonymousService.resetProxies();
    return true;
  }
}
