import { registerEnumType } from '@nestjs/graphql';

export enum RajpubJournalsOfArticlesEnum {
  'InternationalJournalOfComputersAndTechnology' = 'ijct',
  'JournalOfAdvancesInLinguistics' = 'jal',
  'JournalOfAdvancesInMathematics' = 'jam',
  'JournalOfAdvancesInAgriculture' = 'jaa',
  'JournalOfAdvancesInChemistry' = 'jac',
  'JournalOfSocialScienceResearch' = 'jssr',
  'JournalOfAdvancesInPhysics' = 'jap',
  'JournalOfAdvancesInBiotechnology' = 'jbt',
  'InternationalJournalOfManagementAndInformationTechnology' = 'ijmit',
  'JournalOfAdvancesInBiology' = 'jab',
  'InternationalJournalOfResearchInEducationMethodology' = 'ijrem',
  'JournalOfAdvancesInNaturalSciences' = 'jns',
}

registerEnumType(RajpubJournalsOfArticlesEnum, {
  name: 'RajpubJournalsOfArticlesEnum',
  description: 'Journals of articles on rajpub.com',
});
