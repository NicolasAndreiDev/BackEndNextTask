import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ConviteInput } from '../dtos/inputs/sendConvite';
import { InvitationService } from '../service/invitation.service';

@Resolver()
export class InvitationResolver {
  constructor(private invitationService: InvitationService) {}

  @Query(() => String)
  async hello() {
    return 'hello';
  }

  @Mutation(() => String)
  async sendConvite(@Args('convite') convite: ConviteInput) {
    return this.invitationService.sendEmail(convite);
  }
}
