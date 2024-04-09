import { registerEnumType } from '@nestjs/graphql';

export enum IoffeJournalsOfArticlesEnum {
  SolidBodyPhysics = '1',
  PhysicsAndSemiconductorsTechnique = '2',
  TechnicalPhysics = '3',
  LettersToTechnicalPhysics = '4',
  OpticsAndSpectroscopy = '5',
}

registerEnumType(IoffeJournalsOfArticlesEnum, {
  name: 'IoffeJournalsOfArticlesEnum',
  description: 'Journals of articles on journals.ioffe.ru',
});
