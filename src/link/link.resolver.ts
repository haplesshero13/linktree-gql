import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Link } from './link.model';
import { LinkService } from './link.service';
import { CreateLinkInput, UpdateLinkInput } from './link.input';

@Resolver()
export class LinkResolver {
  constructor(private linkService: LinkService) {}

  @Query(() => [Link])
  async getLinks(): Promise<Link[]> {
    return this.linkService.findMany();
  }

  @Mutation(() => Link)
  async createLink(
    @Args({ name: 'link', type: () => CreateLinkInput }) link: CreateLinkInput,
  ) {
    return this.linkService.create(link);
  }

  @Mutation(() => Boolean)
  async deleteLink(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.linkService.delete(id);
  }

  @Mutation(() => Link)
  async updateLink(
    @Args({ name: 'link', type: () => UpdateLinkInput })
    link: UpdateLinkInput,
  ): Promise<Link | null> {
    return this.linkService.update(link);
  }
}
