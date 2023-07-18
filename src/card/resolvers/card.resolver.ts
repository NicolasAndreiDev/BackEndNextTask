import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CardService } from '../service/card.service';
import { Card } from '../dtos/entities/card.entity';
import { CreateCardAndUpdate } from '../dtos/inputs/createCardAndUpdate';

@Resolver()
export class CardResolver {
  constructor(private cardService: CardService) {}

  @Query(() => String)
  async getHello() {
    return 'hello';
  }

  @Mutation(() => Card)
  async addNewCard(
    @Args('userId') userId: string,
    @Args('projectId') projectId: string,
    @Args('card') card: CreateCardAndUpdate,
  ) {
    return this.cardService.addProjectCard(userId, projectId, card);
  }

  @Mutation(() => Card)
  async moveCard(
    @Args('userId') userId: string,
    @Args('projectId') projectId: string,
    @Args('cardId') cardId: string,
    @Args('position') position: number,
  ) {
    return this.cardService.moveCard(userId, projectId, cardId, position);
  }

  @Mutation(() => Card)
  async deleteCard(
    @Args('userId') userId: string,
    @Args('projectId') projectId: string,
    @Args('cardId') cardId: string,
  ) {
    return this.cardService.deleteCard(userId, projectId, cardId);
  }
}
