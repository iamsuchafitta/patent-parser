import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { Int } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { registerEnumType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

export enum TransactionIsolationLevel {
    ReadUncommitted = "ReadUncommitted",
    ReadCommitted = "ReadCommitted",
    RepeatableRead = "RepeatableRead",
    Serializable = "Serializable"
}

export enum SortOrder {
    asc = "asc",
    desc = "desc"
}

export enum QueryMode {
    'default' = "default",
    insensitive = "insensitive"
}

export enum PatentRelationTypeEnum {
    Citation = "Citation",
    CitationFamilyToFamily = "CitationFamilyToFamily",
    CitedBy = "CitedBy",
    CitedByFamilyToFamily = "CitedByFamilyToFamily",
    Worldwide = "Worldwide",
    SimilarDocument = "SimilarDocument"
}

export enum NullsOrder {
    first = "first",
    last = "last"
}

export enum NullableJsonNullValueInput {
    DbNull = "DbNull",
    JsonNull = "JsonNull"
}

export enum MonitorLogTypeEnum {
    Info = "Info",
    Warning = "Warning",
    Error = "Error"
}

export enum JsonNullValueFilter {
    DbNull = "DbNull",
    JsonNull = "JsonNull",
    AnyNull = "AnyNull"
}

export enum PatentRelationScalarFieldEnum {
    patentMainId = "patentMainId",
    type = "type",
    patentOtherId = "patentOtherId"
}

export enum PatentParseQueueScalarFieldEnum {
    url = "url",
    startedAt = "startedAt",
    tries = "tries",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}

export enum PatentScalarFieldEnum {
    id = "id",
    urlGoogle = "urlGoogle",
    urlYandex = "urlYandex",
    title = "title",
    abstract = "abstract",
    description = "description",
    classifications = "classifications",
    claims = "claims"
}

export enum MonitorStatScalarFieldEnum {
    id = "id",
    parserId = "parserId",
    createdAt = "createdAt",
    currentProcessing = "currentProcessing",
    errors = "errors",
    errorsMax = "errorsMax",
    rssMb = "rssMb",
    heapMb = "heapMb",
    heapMaxMb = "heapMaxMb",
    externalMb = "externalMb",
    sighup = "sighup",
    sigint = "sigint",
    sigterm = "sigterm"
}

export enum MonitorLogScalarFieldEnum {
    id = "id",
    parserId = "parserId",
    createdAt = "createdAt",
    type = "type",
    message = "message"
}

export enum ConceptScalarFieldEnum {
    id = "id",
    name = "name",
    domain = "domain",
    smiles = "smiles",
    inchiKey = "inchiKey",
    queryMatch = "queryMatch",
    sections = "sections",
    count = "count",
    patentNumber = "patentNumber"
}

export enum ApplicationEventScalarFieldEnum {
    id = "id",
    date = "date",
    asignee = "asignee",
    inventors = "inventors"
}

registerEnumType(ApplicationEventScalarFieldEnum, { name: 'ApplicationEventScalarFieldEnum', description: undefined })
registerEnumType(ConceptScalarFieldEnum, { name: 'ConceptScalarFieldEnum', description: undefined })
registerEnumType(MonitorLogScalarFieldEnum, { name: 'MonitorLogScalarFieldEnum', description: undefined })
registerEnumType(MonitorStatScalarFieldEnum, { name: 'MonitorStatScalarFieldEnum', description: undefined })
registerEnumType(PatentScalarFieldEnum, { name: 'PatentScalarFieldEnum', description: undefined })
registerEnumType(PatentParseQueueScalarFieldEnum, { name: 'PatentParseQueueScalarFieldEnum', description: undefined })
registerEnumType(PatentRelationScalarFieldEnum, { name: 'PatentRelationScalarFieldEnum', description: undefined })
registerEnumType(JsonNullValueFilter, { name: 'JsonNullValueFilter', description: undefined })
registerEnumType(MonitorLogTypeEnum, { name: 'MonitorLogTypeEnum', description: undefined })
registerEnumType(NullableJsonNullValueInput, { name: 'NullableJsonNullValueInput', description: undefined })
registerEnumType(NullsOrder, { name: 'NullsOrder', description: undefined })
registerEnumType(PatentRelationTypeEnum, { name: 'PatentRelationTypeEnum', description: "Тип связи от первого патента ко второму" })
registerEnumType(QueryMode, { name: 'QueryMode', description: undefined })
registerEnumType(SortOrder, { name: 'SortOrder', description: undefined })
registerEnumType(TransactionIsolationLevel, { name: 'TransactionIsolationLevel', description: undefined })

@ObjectType()
export class AggregateApplicationEvent {
    @Field(() => ApplicationEventCountAggregate, {nullable:true})
    _count?: InstanceType<typeof ApplicationEventCountAggregate>;
    @Field(() => ApplicationEventMinAggregate, {nullable:true})
    _min?: InstanceType<typeof ApplicationEventMinAggregate>;
    @Field(() => ApplicationEventMaxAggregate, {nullable:true})
    _max?: InstanceType<typeof ApplicationEventMaxAggregate>;
}

@ArgsType()
export class ApplicationEventAggregateArgs {
    @Field(() => ApplicationEventWhereInput, {nullable:true})
    @Type(() => ApplicationEventWhereInput)
    where?: InstanceType<typeof ApplicationEventWhereInput>;
    @Field(() => [ApplicationEventOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<ApplicationEventOrderByWithRelationInput>;
    @Field(() => ApplicationEventWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<ApplicationEventWhereUniqueInput, 'id'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => ApplicationEventCountAggregateInput, {nullable:true})
    _count?: InstanceType<typeof ApplicationEventCountAggregateInput>;
    @Field(() => ApplicationEventMinAggregateInput, {nullable:true})
    _min?: InstanceType<typeof ApplicationEventMinAggregateInput>;
    @Field(() => ApplicationEventMaxAggregateInput, {nullable:true})
    _max?: InstanceType<typeof ApplicationEventMaxAggregateInput>;
}

@InputType()
export class ApplicationEventCountAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    date?: true;
    @Field(() => Boolean, {nullable:true})
    asignee?: true;
    @Field(() => Boolean, {nullable:true})
    inventors?: true;
    @Field(() => Boolean, {nullable:true})
    _all?: true;
}

@ObjectType()
export class ApplicationEventCountAggregate {
    @Field(() => Int, {nullable:false})
    id!: number;
    @Field(() => Int, {nullable:false})
    date!: number;
    @Field(() => Int, {nullable:false})
    asignee!: number;
    @Field(() => Int, {nullable:false})
    inventors!: number;
    @Field(() => Int, {nullable:false})
    _all!: number;
}

@InputType()
export class ApplicationEventCountOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    date?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    asignee?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    inventors?: keyof typeof SortOrder;
}

@InputType()
export class ApplicationEventCreateManyInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:false})
    date!: Date | string;
    @Field(() => String, {nullable:false})
    asignee!: string;
    @Field(() => [String], {nullable:true})
    inventors?: Array<string>;
}

@InputType()
export class ApplicationEventCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:false})
    date!: Date | string;
    @Field(() => String, {nullable:false})
    asignee!: string;
    @Field(() => [String], {nullable:true})
    inventors?: Array<string>;
}

@InputType()
export class ApplicationEventCreateinventorsInput {
    @Field(() => [String], {nullable:false})
    set!: Array<string>;
}

@ArgsType()
export class ApplicationEventGroupByArgs {
    @Field(() => ApplicationEventWhereInput, {nullable:true})
    @Type(() => ApplicationEventWhereInput)
    where?: InstanceType<typeof ApplicationEventWhereInput>;
    @Field(() => [ApplicationEventOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<ApplicationEventOrderByWithAggregationInput>;
    @Field(() => [ApplicationEventScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof ApplicationEventScalarFieldEnum>;
    @Field(() => ApplicationEventScalarWhereWithAggregatesInput, {nullable:true})
    having?: InstanceType<typeof ApplicationEventScalarWhereWithAggregatesInput>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => ApplicationEventCountAggregateInput, {nullable:true})
    _count?: InstanceType<typeof ApplicationEventCountAggregateInput>;
    @Field(() => ApplicationEventMinAggregateInput, {nullable:true})
    _min?: InstanceType<typeof ApplicationEventMinAggregateInput>;
    @Field(() => ApplicationEventMaxAggregateInput, {nullable:true})
    _max?: InstanceType<typeof ApplicationEventMaxAggregateInput>;
}

@ObjectType()
export class ApplicationEventGroupBy {
    @Field(() => String, {nullable:false})
    id!: string;
    @Field(() => Date, {nullable:false})
    date!: Date | string;
    @Field(() => String, {nullable:false})
    asignee!: string;
    @Field(() => [String], {nullable:true})
    inventors?: Array<string>;
    @Field(() => ApplicationEventCountAggregate, {nullable:true})
    _count?: InstanceType<typeof ApplicationEventCountAggregate>;
    @Field(() => ApplicationEventMinAggregate, {nullable:true})
    _min?: InstanceType<typeof ApplicationEventMinAggregate>;
    @Field(() => ApplicationEventMaxAggregate, {nullable:true})
    _max?: InstanceType<typeof ApplicationEventMaxAggregate>;
}

@InputType()
export class ApplicationEventMaxAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    date?: true;
    @Field(() => Boolean, {nullable:true})
    asignee?: true;
}

@ObjectType()
export class ApplicationEventMaxAggregate {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    date?: Date | string;
    @Field(() => String, {nullable:true})
    asignee?: string;
}

@InputType()
export class ApplicationEventMaxOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    date?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    asignee?: keyof typeof SortOrder;
}

@InputType()
export class ApplicationEventMinAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    date?: true;
    @Field(() => Boolean, {nullable:true})
    asignee?: true;
}

@ObjectType()
export class ApplicationEventMinAggregate {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    date?: Date | string;
    @Field(() => String, {nullable:true})
    asignee?: string;
}

@InputType()
export class ApplicationEventMinOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    date?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    asignee?: keyof typeof SortOrder;
}

@InputType()
export class ApplicationEventOrderByWithAggregationInput {
    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    date?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    asignee?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    inventors?: keyof typeof SortOrder;
    @Field(() => ApplicationEventCountOrderByAggregateInput, {nullable:true})
    _count?: InstanceType<typeof ApplicationEventCountOrderByAggregateInput>;
    @Field(() => ApplicationEventMaxOrderByAggregateInput, {nullable:true})
    _max?: InstanceType<typeof ApplicationEventMaxOrderByAggregateInput>;
    @Field(() => ApplicationEventMinOrderByAggregateInput, {nullable:true})
    _min?: InstanceType<typeof ApplicationEventMinOrderByAggregateInput>;
}

@InputType()
export class ApplicationEventOrderByWithRelationInput {
    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    date?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    asignee?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    inventors?: keyof typeof SortOrder;
}

@InputType()
export class ApplicationEventScalarWhereWithAggregatesInput {
    @Field(() => [ApplicationEventScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<ApplicationEventScalarWhereWithAggregatesInput>;
    @Field(() => [ApplicationEventScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<ApplicationEventScalarWhereWithAggregatesInput>;
    @Field(() => [ApplicationEventScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<ApplicationEventScalarWhereWithAggregatesInput>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    id?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    date?: InstanceType<typeof DateTimeWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    asignee?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => StringListFilter, {nullable:true})
    inventors?: InstanceType<typeof StringListFilter>;
}

@InputType()
export class ApplicationEventUncheckedCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:false})
    date!: Date | string;
    @Field(() => String, {nullable:false})
    asignee!: string;
    @Field(() => [String], {nullable:true})
    inventors?: Array<string>;
}

@InputType()
export class ApplicationEventUncheckedUpdateManyInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    date?: Date | string;
    @Field(() => String, {nullable:true})
    asignee?: string;
    @Field(() => [String], {nullable:true})
    inventors?: Array<string>;
}

@InputType()
export class ApplicationEventUncheckedUpdateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    date?: Date | string;
    @Field(() => String, {nullable:true})
    asignee?: string;
    @Field(() => [String], {nullable:true})
    inventors?: Array<string>;
}

@InputType()
export class ApplicationEventUpdateManyMutationInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    date?: Date | string;
    @Field(() => String, {nullable:true})
    asignee?: string;
    @Field(() => [String], {nullable:true})
    inventors?: Array<string>;
}

@InputType()
export class ApplicationEventUpdateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    date?: Date | string;
    @Field(() => String, {nullable:true})
    asignee?: string;
    @Field(() => [String], {nullable:true})
    inventors?: Array<string>;
}

@InputType()
export class ApplicationEventUpdateinventorsInput {
    @Field(() => [String], {nullable:true})
    set?: Array<string>;
    @Field(() => [String], {nullable:true})
    push?: Array<string>;
}

@InputType()
export class ApplicationEventWhereUniqueInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => [ApplicationEventWhereInput], {nullable:true})
    AND?: Array<ApplicationEventWhereInput>;
    @Field(() => [ApplicationEventWhereInput], {nullable:true})
    OR?: Array<ApplicationEventWhereInput>;
    @Field(() => [ApplicationEventWhereInput], {nullable:true})
    NOT?: Array<ApplicationEventWhereInput>;
    @Field(() => DateTimeFilter, {nullable:true})
    date?: InstanceType<typeof DateTimeFilter>;
    @Field(() => StringFilter, {nullable:true})
    asignee?: InstanceType<typeof StringFilter>;
    @Field(() => StringListFilter, {nullable:true})
    inventors?: InstanceType<typeof StringListFilter>;
}

@InputType()
export class ApplicationEventWhereInput {
    @Field(() => [ApplicationEventWhereInput], {nullable:true})
    AND?: Array<ApplicationEventWhereInput>;
    @Field(() => [ApplicationEventWhereInput], {nullable:true})
    OR?: Array<ApplicationEventWhereInput>;
    @Field(() => [ApplicationEventWhereInput], {nullable:true})
    NOT?: Array<ApplicationEventWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    id?: InstanceType<typeof StringFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    date?: InstanceType<typeof DateTimeFilter>;
    @Field(() => StringFilter, {nullable:true})
    asignee?: InstanceType<typeof StringFilter>;
    @Field(() => StringListFilter, {nullable:true})
    inventors?: InstanceType<typeof StringListFilter>;
}

@ObjectType()
export class ApplicationEvent {
    @Field(() => ID, {nullable:false})
    id!: string;
    @Field(() => Date, {nullable:false})
    date!: Date;
    @Field(() => String, {nullable:false})
    asignee!: string;
    @Field(() => [String], {nullable:true})
    inventors!: Array<string>;
}

@ArgsType()
export class CreateManyApplicationEventArgs {
    @Field(() => [ApplicationEventCreateManyInput], {nullable:false})
    @Type(() => ApplicationEventCreateManyInput)
    data!: Array<ApplicationEventCreateManyInput>;
    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}

@ArgsType()
export class CreateOneApplicationEventArgs {
    @Field(() => ApplicationEventCreateInput, {nullable:false})
    @Type(() => ApplicationEventCreateInput)
    data!: InstanceType<typeof ApplicationEventCreateInput>;
}

@ArgsType()
export class DeleteManyApplicationEventArgs {
    @Field(() => ApplicationEventWhereInput, {nullable:true})
    @Type(() => ApplicationEventWhereInput)
    where?: InstanceType<typeof ApplicationEventWhereInput>;
}

@ArgsType()
export class DeleteOneApplicationEventArgs {
    @Field(() => ApplicationEventWhereUniqueInput, {nullable:false})
    @Type(() => ApplicationEventWhereUniqueInput)
    where!: Prisma.AtLeast<ApplicationEventWhereUniqueInput, 'id'>;
}

@ArgsType()
export class FindFirstApplicationEventOrThrowArgs {
    @Field(() => ApplicationEventWhereInput, {nullable:true})
    @Type(() => ApplicationEventWhereInput)
    where?: InstanceType<typeof ApplicationEventWhereInput>;
    @Field(() => [ApplicationEventOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<ApplicationEventOrderByWithRelationInput>;
    @Field(() => ApplicationEventWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<ApplicationEventWhereUniqueInput, 'id'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [ApplicationEventScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof ApplicationEventScalarFieldEnum>;
}

@ArgsType()
export class FindFirstApplicationEventArgs {
    @Field(() => ApplicationEventWhereInput, {nullable:true})
    @Type(() => ApplicationEventWhereInput)
    where?: InstanceType<typeof ApplicationEventWhereInput>;
    @Field(() => [ApplicationEventOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<ApplicationEventOrderByWithRelationInput>;
    @Field(() => ApplicationEventWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<ApplicationEventWhereUniqueInput, 'id'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [ApplicationEventScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof ApplicationEventScalarFieldEnum>;
}

@ArgsType()
export class FindManyApplicationEventArgs {
    @Field(() => ApplicationEventWhereInput, {nullable:true})
    @Type(() => ApplicationEventWhereInput)
    where?: InstanceType<typeof ApplicationEventWhereInput>;
    @Field(() => [ApplicationEventOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<ApplicationEventOrderByWithRelationInput>;
    @Field(() => ApplicationEventWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<ApplicationEventWhereUniqueInput, 'id'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [ApplicationEventScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof ApplicationEventScalarFieldEnum>;
}

@ArgsType()
export class FindUniqueApplicationEventOrThrowArgs {
    @Field(() => ApplicationEventWhereUniqueInput, {nullable:false})
    @Type(() => ApplicationEventWhereUniqueInput)
    where!: Prisma.AtLeast<ApplicationEventWhereUniqueInput, 'id'>;
}

@ArgsType()
export class FindUniqueApplicationEventArgs {
    @Field(() => ApplicationEventWhereUniqueInput, {nullable:false})
    @Type(() => ApplicationEventWhereUniqueInput)
    where!: Prisma.AtLeast<ApplicationEventWhereUniqueInput, 'id'>;
}

@ArgsType()
export class UpdateManyApplicationEventArgs {
    @Field(() => ApplicationEventUpdateManyMutationInput, {nullable:false})
    @Type(() => ApplicationEventUpdateManyMutationInput)
    data!: InstanceType<typeof ApplicationEventUpdateManyMutationInput>;
    @Field(() => ApplicationEventWhereInput, {nullable:true})
    @Type(() => ApplicationEventWhereInput)
    where?: InstanceType<typeof ApplicationEventWhereInput>;
}

@ArgsType()
export class UpdateOneApplicationEventArgs {
    @Field(() => ApplicationEventUpdateInput, {nullable:false})
    @Type(() => ApplicationEventUpdateInput)
    data!: InstanceType<typeof ApplicationEventUpdateInput>;
    @Field(() => ApplicationEventWhereUniqueInput, {nullable:false})
    @Type(() => ApplicationEventWhereUniqueInput)
    where!: Prisma.AtLeast<ApplicationEventWhereUniqueInput, 'id'>;
}

@ArgsType()
export class UpsertOneApplicationEventArgs {
    @Field(() => ApplicationEventWhereUniqueInput, {nullable:false})
    @Type(() => ApplicationEventWhereUniqueInput)
    where!: Prisma.AtLeast<ApplicationEventWhereUniqueInput, 'id'>;
    @Field(() => ApplicationEventCreateInput, {nullable:false})
    @Type(() => ApplicationEventCreateInput)
    create!: InstanceType<typeof ApplicationEventCreateInput>;
    @Field(() => ApplicationEventUpdateInput, {nullable:false})
    @Type(() => ApplicationEventUpdateInput)
    update!: InstanceType<typeof ApplicationEventUpdateInput>;
}

@ObjectType()
export class AggregateConcept {
    @Field(() => ConceptCountAggregate, {nullable:true})
    _count?: InstanceType<typeof ConceptCountAggregate>;
    @Field(() => ConceptAvgAggregate, {nullable:true})
    _avg?: InstanceType<typeof ConceptAvgAggregate>;
    @Field(() => ConceptSumAggregate, {nullable:true})
    _sum?: InstanceType<typeof ConceptSumAggregate>;
    @Field(() => ConceptMinAggregate, {nullable:true})
    _min?: InstanceType<typeof ConceptMinAggregate>;
    @Field(() => ConceptMaxAggregate, {nullable:true})
    _max?: InstanceType<typeof ConceptMaxAggregate>;
}

@ArgsType()
export class ConceptAggregateArgs {
    @Field(() => ConceptWhereInput, {nullable:true})
    @Type(() => ConceptWhereInput)
    where?: InstanceType<typeof ConceptWhereInput>;
    @Field(() => [ConceptOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<ConceptOrderByWithRelationInput>;
    @Field(() => ConceptWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<ConceptWhereUniqueInput, 'id'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => ConceptCountAggregateInput, {nullable:true})
    _count?: InstanceType<typeof ConceptCountAggregateInput>;
    @Field(() => ConceptAvgAggregateInput, {nullable:true})
    _avg?: InstanceType<typeof ConceptAvgAggregateInput>;
    @Field(() => ConceptSumAggregateInput, {nullable:true})
    _sum?: InstanceType<typeof ConceptSumAggregateInput>;
    @Field(() => ConceptMinAggregateInput, {nullable:true})
    _min?: InstanceType<typeof ConceptMinAggregateInput>;
    @Field(() => ConceptMaxAggregateInput, {nullable:true})
    _max?: InstanceType<typeof ConceptMaxAggregateInput>;
}

@InputType()
export class ConceptAvgAggregateInput {
    @Field(() => Boolean, {nullable:true})
    queryMatch?: true;
    @Field(() => Boolean, {nullable:true})
    count?: true;
}

@ObjectType()
export class ConceptAvgAggregate {
    @Field(() => Float, {nullable:true})
    queryMatch?: number;
    @Field(() => Float, {nullable:true})
    count?: number;
}

@InputType()
export class ConceptAvgOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    queryMatch?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    count?: keyof typeof SortOrder;
}

@InputType()
export class ConceptCountAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    name?: true;
    @Field(() => Boolean, {nullable:true})
    domain?: true;
    @Field(() => Boolean, {nullable:true})
    smiles?: true;
    @Field(() => Boolean, {nullable:true})
    inchiKey?: true;
    @Field(() => Boolean, {nullable:true})
    queryMatch?: true;
    @Field(() => Boolean, {nullable:true})
    sections?: true;
    @Field(() => Boolean, {nullable:true})
    count?: true;
    @Field(() => Boolean, {nullable:true})
    patentNumber?: true;
    @Field(() => Boolean, {nullable:true})
    _all?: true;
}

@ObjectType()
export class ConceptCountAggregate {
    @Field(() => Int, {nullable:false})
    id!: number;
    @Field(() => Int, {nullable:false})
    name!: number;
    @Field(() => Int, {nullable:false})
    domain!: number;
    @Field(() => Int, {nullable:false})
    smiles!: number;
    @Field(() => Int, {nullable:false})
    inchiKey!: number;
    @Field(() => Int, {nullable:false})
    queryMatch!: number;
    @Field(() => Int, {nullable:false})
    sections!: number;
    @Field(() => Int, {nullable:false})
    count!: number;
    @Field(() => Int, {nullable:false})
    patentNumber!: number;
    @Field(() => Int, {nullable:false})
    _all!: number;
}

@InputType()
export class ConceptCountOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    name?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    domain?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    smiles?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    inchiKey?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    queryMatch?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    sections?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    count?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    patentNumber?: keyof typeof SortOrder;
}

@InputType()
export class ConceptCreateManyPatentInputEnvelope {
    @Field(() => [ConceptCreateManyPatentInput], {nullable:false})
    @Type(() => ConceptCreateManyPatentInput)
    data!: Array<ConceptCreateManyPatentInput>;
    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}

@InputType()
export class ConceptCreateManyPatentInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    name!: string;
    @Field(() => String, {nullable:false})
    domain!: string;
    @Field(() => String, {nullable:true})
    smiles?: string;
    @Field(() => String, {nullable:true})
    inchiKey?: string;
    @Field(() => Float, {nullable:false})
    queryMatch!: number;
    @Field(() => [String], {nullable:true})
    sections?: Array<string>;
    @Field(() => Int, {nullable:false})
    count!: number;
}

@InputType()
export class ConceptCreateManyInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    name!: string;
    @Field(() => String, {nullable:false})
    domain!: string;
    @Field(() => String, {nullable:true})
    smiles?: string;
    @Field(() => String, {nullable:true})
    inchiKey?: string;
    @Field(() => Float, {nullable:false})
    queryMatch!: number;
    @Field(() => [String], {nullable:true})
    sections?: Array<string>;
    @Field(() => Int, {nullable:false})
    count!: number;
    @Field(() => String, {nullable:true})
    patentNumber?: string;
}

@InputType()
export class ConceptCreateNestedManyWithoutPatentInput {
    @Field(() => [ConceptCreateWithoutPatentInput], {nullable:true})
    @Type(() => ConceptCreateWithoutPatentInput)
    create?: Array<ConceptCreateWithoutPatentInput>;
    @Field(() => [ConceptCreateOrConnectWithoutPatentInput], {nullable:true})
    @Type(() => ConceptCreateOrConnectWithoutPatentInput)
    connectOrCreate?: Array<ConceptCreateOrConnectWithoutPatentInput>;
    @Field(() => ConceptCreateManyPatentInputEnvelope, {nullable:true})
    @Type(() => ConceptCreateManyPatentInputEnvelope)
    createMany?: InstanceType<typeof ConceptCreateManyPatentInputEnvelope>;
    @Field(() => [ConceptWhereUniqueInput], {nullable:true})
    @Type(() => ConceptWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<ConceptWhereUniqueInput, 'id'>>;
}

@InputType()
export class ConceptCreateOrConnectWithoutPatentInput {
    @Field(() => ConceptWhereUniqueInput, {nullable:false})
    @Type(() => ConceptWhereUniqueInput)
    where!: Prisma.AtLeast<ConceptWhereUniqueInput, 'id'>;
    @Field(() => ConceptCreateWithoutPatentInput, {nullable:false})
    @Type(() => ConceptCreateWithoutPatentInput)
    create!: InstanceType<typeof ConceptCreateWithoutPatentInput>;
}

@InputType()
export class ConceptCreateWithoutPatentInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    name!: string;
    @Field(() => String, {nullable:false})
    domain!: string;
    @Field(() => String, {nullable:true})
    smiles?: string;
    @Field(() => String, {nullable:true})
    inchiKey?: string;
    @Field(() => Float, {nullable:false})
    queryMatch!: number;
    @Field(() => [String], {nullable:true})
    sections?: Array<string>;
    @Field(() => Int, {nullable:false})
    count!: number;
}

@InputType()
export class ConceptCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    name!: string;
    @Field(() => String, {nullable:false})
    domain!: string;
    @Field(() => String, {nullable:true})
    smiles?: string;
    @Field(() => String, {nullable:true})
    inchiKey?: string;
    @Field(() => Float, {nullable:false})
    queryMatch!: number;
    @Field(() => [String], {nullable:true})
    sections?: Array<string>;
    @Field(() => Int, {nullable:false})
    count!: number;
    @Field(() => PatentCreateNestedOneWithoutConceptsInput, {nullable:true})
    Patent?: InstanceType<typeof PatentCreateNestedOneWithoutConceptsInput>;
}

@InputType()
export class ConceptCreatesectionsInput {
    @Field(() => [String], {nullable:false})
    set!: Array<string>;
}

@ArgsType()
export class ConceptGroupByArgs {
    @Field(() => ConceptWhereInput, {nullable:true})
    @Type(() => ConceptWhereInput)
    where?: InstanceType<typeof ConceptWhereInput>;
    @Field(() => [ConceptOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<ConceptOrderByWithAggregationInput>;
    @Field(() => [ConceptScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof ConceptScalarFieldEnum>;
    @Field(() => ConceptScalarWhereWithAggregatesInput, {nullable:true})
    having?: InstanceType<typeof ConceptScalarWhereWithAggregatesInput>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => ConceptCountAggregateInput, {nullable:true})
    _count?: InstanceType<typeof ConceptCountAggregateInput>;
    @Field(() => ConceptAvgAggregateInput, {nullable:true})
    _avg?: InstanceType<typeof ConceptAvgAggregateInput>;
    @Field(() => ConceptSumAggregateInput, {nullable:true})
    _sum?: InstanceType<typeof ConceptSumAggregateInput>;
    @Field(() => ConceptMinAggregateInput, {nullable:true})
    _min?: InstanceType<typeof ConceptMinAggregateInput>;
    @Field(() => ConceptMaxAggregateInput, {nullable:true})
    _max?: InstanceType<typeof ConceptMaxAggregateInput>;
}

@ObjectType()
export class ConceptGroupBy {
    @Field(() => String, {nullable:false})
    id!: string;
    @Field(() => String, {nullable:false})
    name!: string;
    @Field(() => String, {nullable:false})
    domain!: string;
    @Field(() => String, {nullable:true})
    smiles?: string;
    @Field(() => String, {nullable:true})
    inchiKey?: string;
    @Field(() => Float, {nullable:false})
    queryMatch!: number;
    @Field(() => [String], {nullable:true})
    sections?: Array<string>;
    @Field(() => Int, {nullable:false})
    count!: number;
    @Field(() => String, {nullable:true})
    patentNumber?: string;
    @Field(() => ConceptCountAggregate, {nullable:true})
    _count?: InstanceType<typeof ConceptCountAggregate>;
    @Field(() => ConceptAvgAggregate, {nullable:true})
    _avg?: InstanceType<typeof ConceptAvgAggregate>;
    @Field(() => ConceptSumAggregate, {nullable:true})
    _sum?: InstanceType<typeof ConceptSumAggregate>;
    @Field(() => ConceptMinAggregate, {nullable:true})
    _min?: InstanceType<typeof ConceptMinAggregate>;
    @Field(() => ConceptMaxAggregate, {nullable:true})
    _max?: InstanceType<typeof ConceptMaxAggregate>;
}

@InputType()
export class ConceptListRelationFilter {
    @Field(() => ConceptWhereInput, {nullable:true})
    every?: InstanceType<typeof ConceptWhereInput>;
    @Field(() => ConceptWhereInput, {nullable:true})
    some?: InstanceType<typeof ConceptWhereInput>;
    @Field(() => ConceptWhereInput, {nullable:true})
    none?: InstanceType<typeof ConceptWhereInput>;
}

@InputType()
export class ConceptMaxAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    name?: true;
    @Field(() => Boolean, {nullable:true})
    domain?: true;
    @Field(() => Boolean, {nullable:true})
    smiles?: true;
    @Field(() => Boolean, {nullable:true})
    inchiKey?: true;
    @Field(() => Boolean, {nullable:true})
    queryMatch?: true;
    @Field(() => Boolean, {nullable:true})
    count?: true;
    @Field(() => Boolean, {nullable:true})
    patentNumber?: true;
}

@ObjectType()
export class ConceptMaxAggregate {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    name?: string;
    @Field(() => String, {nullable:true})
    domain?: string;
    @Field(() => String, {nullable:true})
    smiles?: string;
    @Field(() => String, {nullable:true})
    inchiKey?: string;
    @Field(() => Float, {nullable:true})
    queryMatch?: number;
    @Field(() => Int, {nullable:true})
    count?: number;
    @Field(() => String, {nullable:true})
    patentNumber?: string;
}

@InputType()
export class ConceptMaxOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    name?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    domain?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    smiles?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    inchiKey?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    queryMatch?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    count?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    patentNumber?: keyof typeof SortOrder;
}

@InputType()
export class ConceptMinAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    name?: true;
    @Field(() => Boolean, {nullable:true})
    domain?: true;
    @Field(() => Boolean, {nullable:true})
    smiles?: true;
    @Field(() => Boolean, {nullable:true})
    inchiKey?: true;
    @Field(() => Boolean, {nullable:true})
    queryMatch?: true;
    @Field(() => Boolean, {nullable:true})
    count?: true;
    @Field(() => Boolean, {nullable:true})
    patentNumber?: true;
}

@ObjectType()
export class ConceptMinAggregate {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    name?: string;
    @Field(() => String, {nullable:true})
    domain?: string;
    @Field(() => String, {nullable:true})
    smiles?: string;
    @Field(() => String, {nullable:true})
    inchiKey?: string;
    @Field(() => Float, {nullable:true})
    queryMatch?: number;
    @Field(() => Int, {nullable:true})
    count?: number;
    @Field(() => String, {nullable:true})
    patentNumber?: string;
}

@InputType()
export class ConceptMinOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    name?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    domain?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    smiles?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    inchiKey?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    queryMatch?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    count?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    patentNumber?: keyof typeof SortOrder;
}

@InputType()
export class ConceptOrderByRelationAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    _count?: keyof typeof SortOrder;
}

@InputType()
export class ConceptOrderByWithAggregationInput {
    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    name?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    domain?: keyof typeof SortOrder;
    @Field(() => SortOrderInput, {nullable:true})
    smiles?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    inchiKey?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrder, {nullable:true})
    queryMatch?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    sections?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    count?: keyof typeof SortOrder;
    @Field(() => SortOrderInput, {nullable:true})
    patentNumber?: InstanceType<typeof SortOrderInput>;
    @Field(() => ConceptCountOrderByAggregateInput, {nullable:true})
    _count?: InstanceType<typeof ConceptCountOrderByAggregateInput>;
    @Field(() => ConceptAvgOrderByAggregateInput, {nullable:true})
    _avg?: InstanceType<typeof ConceptAvgOrderByAggregateInput>;
    @Field(() => ConceptMaxOrderByAggregateInput, {nullable:true})
    _max?: InstanceType<typeof ConceptMaxOrderByAggregateInput>;
    @Field(() => ConceptMinOrderByAggregateInput, {nullable:true})
    _min?: InstanceType<typeof ConceptMinOrderByAggregateInput>;
    @Field(() => ConceptSumOrderByAggregateInput, {nullable:true})
    _sum?: InstanceType<typeof ConceptSumOrderByAggregateInput>;
}

@InputType()
export class ConceptOrderByWithRelationInput {
    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    name?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    domain?: keyof typeof SortOrder;
    @Field(() => SortOrderInput, {nullable:true})
    smiles?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    inchiKey?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrder, {nullable:true})
    queryMatch?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    sections?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    count?: keyof typeof SortOrder;
    @Field(() => SortOrderInput, {nullable:true})
    patentNumber?: InstanceType<typeof SortOrderInput>;
    @Field(() => PatentOrderByWithRelationInput, {nullable:true})
    Patent?: InstanceType<typeof PatentOrderByWithRelationInput>;
}

@InputType()
export class ConceptScalarWhereWithAggregatesInput {
    @Field(() => [ConceptScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<ConceptScalarWhereWithAggregatesInput>;
    @Field(() => [ConceptScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<ConceptScalarWhereWithAggregatesInput>;
    @Field(() => [ConceptScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<ConceptScalarWhereWithAggregatesInput>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    id?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    name?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    domain?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    smiles?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    inchiKey?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => FloatWithAggregatesFilter, {nullable:true})
    queryMatch?: InstanceType<typeof FloatWithAggregatesFilter>;
    @Field(() => StringListFilter, {nullable:true})
    sections?: InstanceType<typeof StringListFilter>;
    @Field(() => IntWithAggregatesFilter, {nullable:true})
    count?: InstanceType<typeof IntWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    patentNumber?: InstanceType<typeof StringWithAggregatesFilter>;
}

@InputType()
export class ConceptScalarWhereInput {
    @Field(() => [ConceptScalarWhereInput], {nullable:true})
    AND?: Array<ConceptScalarWhereInput>;
    @Field(() => [ConceptScalarWhereInput], {nullable:true})
    OR?: Array<ConceptScalarWhereInput>;
    @Field(() => [ConceptScalarWhereInput], {nullable:true})
    NOT?: Array<ConceptScalarWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    id?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    name?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    domain?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    smiles?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    inchiKey?: InstanceType<typeof StringFilter>;
    @Field(() => FloatFilter, {nullable:true})
    queryMatch?: InstanceType<typeof FloatFilter>;
    @Field(() => StringListFilter, {nullable:true})
    sections?: InstanceType<typeof StringListFilter>;
    @Field(() => IntFilter, {nullable:true})
    count?: InstanceType<typeof IntFilter>;
    @Field(() => StringFilter, {nullable:true})
    patentNumber?: InstanceType<typeof StringFilter>;
}

@InputType()
export class ConceptSumAggregateInput {
    @Field(() => Boolean, {nullable:true})
    queryMatch?: true;
    @Field(() => Boolean, {nullable:true})
    count?: true;
}

@ObjectType()
export class ConceptSumAggregate {
    @Field(() => Float, {nullable:true})
    queryMatch?: number;
    @Field(() => Int, {nullable:true})
    count?: number;
}

@InputType()
export class ConceptSumOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    queryMatch?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    count?: keyof typeof SortOrder;
}

@InputType()
export class ConceptUncheckedCreateNestedManyWithoutPatentInput {
    @Field(() => [ConceptCreateWithoutPatentInput], {nullable:true})
    @Type(() => ConceptCreateWithoutPatentInput)
    create?: Array<ConceptCreateWithoutPatentInput>;
    @Field(() => [ConceptCreateOrConnectWithoutPatentInput], {nullable:true})
    @Type(() => ConceptCreateOrConnectWithoutPatentInput)
    connectOrCreate?: Array<ConceptCreateOrConnectWithoutPatentInput>;
    @Field(() => ConceptCreateManyPatentInputEnvelope, {nullable:true})
    @Type(() => ConceptCreateManyPatentInputEnvelope)
    createMany?: InstanceType<typeof ConceptCreateManyPatentInputEnvelope>;
    @Field(() => [ConceptWhereUniqueInput], {nullable:true})
    @Type(() => ConceptWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<ConceptWhereUniqueInput, 'id'>>;
}

@InputType()
export class ConceptUncheckedCreateWithoutPatentInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    name!: string;
    @Field(() => String, {nullable:false})
    domain!: string;
    @Field(() => String, {nullable:true})
    smiles?: string;
    @Field(() => String, {nullable:true})
    inchiKey?: string;
    @Field(() => Float, {nullable:false})
    queryMatch!: number;
    @Field(() => [String], {nullable:true})
    sections?: Array<string>;
    @Field(() => Int, {nullable:false})
    count!: number;
}

@InputType()
export class ConceptUncheckedCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    name!: string;
    @Field(() => String, {nullable:false})
    domain!: string;
    @Field(() => String, {nullable:true})
    smiles?: string;
    @Field(() => String, {nullable:true})
    inchiKey?: string;
    @Field(() => Float, {nullable:false})
    queryMatch!: number;
    @Field(() => [String], {nullable:true})
    sections?: Array<string>;
    @Field(() => Int, {nullable:false})
    count!: number;
    @Field(() => String, {nullable:true})
    patentNumber?: string;
}

@InputType()
export class ConceptUncheckedUpdateManyWithoutPatentNestedInput {
    @Field(() => [ConceptCreateWithoutPatentInput], {nullable:true})
    @Type(() => ConceptCreateWithoutPatentInput)
    create?: Array<ConceptCreateWithoutPatentInput>;
    @Field(() => [ConceptCreateOrConnectWithoutPatentInput], {nullable:true})
    @Type(() => ConceptCreateOrConnectWithoutPatentInput)
    connectOrCreate?: Array<ConceptCreateOrConnectWithoutPatentInput>;
    @Field(() => [ConceptUpsertWithWhereUniqueWithoutPatentInput], {nullable:true})
    @Type(() => ConceptUpsertWithWhereUniqueWithoutPatentInput)
    upsert?: Array<ConceptUpsertWithWhereUniqueWithoutPatentInput>;
    @Field(() => ConceptCreateManyPatentInputEnvelope, {nullable:true})
    @Type(() => ConceptCreateManyPatentInputEnvelope)
    createMany?: InstanceType<typeof ConceptCreateManyPatentInputEnvelope>;
    @Field(() => [ConceptWhereUniqueInput], {nullable:true})
    @Type(() => ConceptWhereUniqueInput)
    set?: Array<Prisma.AtLeast<ConceptWhereUniqueInput, 'id'>>;
    @Field(() => [ConceptWhereUniqueInput], {nullable:true})
    @Type(() => ConceptWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<ConceptWhereUniqueInput, 'id'>>;
    @Field(() => [ConceptWhereUniqueInput], {nullable:true})
    @Type(() => ConceptWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<ConceptWhereUniqueInput, 'id'>>;
    @Field(() => [ConceptWhereUniqueInput], {nullable:true})
    @Type(() => ConceptWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<ConceptWhereUniqueInput, 'id'>>;
    @Field(() => [ConceptUpdateWithWhereUniqueWithoutPatentInput], {nullable:true})
    @Type(() => ConceptUpdateWithWhereUniqueWithoutPatentInput)
    update?: Array<ConceptUpdateWithWhereUniqueWithoutPatentInput>;
    @Field(() => [ConceptUpdateManyWithWhereWithoutPatentInput], {nullable:true})
    @Type(() => ConceptUpdateManyWithWhereWithoutPatentInput)
    updateMany?: Array<ConceptUpdateManyWithWhereWithoutPatentInput>;
    @Field(() => [ConceptScalarWhereInput], {nullable:true})
    @Type(() => ConceptScalarWhereInput)
    deleteMany?: Array<ConceptScalarWhereInput>;
}

@InputType()
export class ConceptUncheckedUpdateManyWithoutPatentInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    name?: string;
    @Field(() => String, {nullable:true})
    domain?: string;
    @Field(() => String, {nullable:true})
    smiles?: string;
    @Field(() => String, {nullable:true})
    inchiKey?: string;
    @Field(() => Float, {nullable:true})
    queryMatch?: number;
    @Field(() => [String], {nullable:true})
    sections?: Array<string>;
    @Field(() => Int, {nullable:true})
    count?: number;
}

@InputType()
export class ConceptUncheckedUpdateManyInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    name?: string;
    @Field(() => String, {nullable:true})
    domain?: string;
    @Field(() => String, {nullable:true})
    smiles?: string;
    @Field(() => String, {nullable:true})
    inchiKey?: string;
    @Field(() => Float, {nullable:true})
    queryMatch?: number;
    @Field(() => [String], {nullable:true})
    sections?: Array<string>;
    @Field(() => Int, {nullable:true})
    count?: number;
    @Field(() => String, {nullable:true})
    patentNumber?: string;
}

@InputType()
export class ConceptUncheckedUpdateWithoutPatentInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    name?: string;
    @Field(() => String, {nullable:true})
    domain?: string;
    @Field(() => String, {nullable:true})
    smiles?: string;
    @Field(() => String, {nullable:true})
    inchiKey?: string;
    @Field(() => Float, {nullable:true})
    queryMatch?: number;
    @Field(() => [String], {nullable:true})
    sections?: Array<string>;
    @Field(() => Int, {nullable:true})
    count?: number;
}

@InputType()
export class ConceptUncheckedUpdateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    name?: string;
    @Field(() => String, {nullable:true})
    domain?: string;
    @Field(() => String, {nullable:true})
    smiles?: string;
    @Field(() => String, {nullable:true})
    inchiKey?: string;
    @Field(() => Float, {nullable:true})
    queryMatch?: number;
    @Field(() => [String], {nullable:true})
    sections?: Array<string>;
    @Field(() => Int, {nullable:true})
    count?: number;
    @Field(() => String, {nullable:true})
    patentNumber?: string;
}

@InputType()
export class ConceptUpdateManyMutationInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    name?: string;
    @Field(() => String, {nullable:true})
    domain?: string;
    @Field(() => String, {nullable:true})
    smiles?: string;
    @Field(() => String, {nullable:true})
    inchiKey?: string;
    @Field(() => Float, {nullable:true})
    queryMatch?: number;
    @Field(() => [String], {nullable:true})
    sections?: Array<string>;
    @Field(() => Int, {nullable:true})
    count?: number;
}

@InputType()
export class ConceptUpdateManyWithWhereWithoutPatentInput {
    @Field(() => ConceptScalarWhereInput, {nullable:false})
    @Type(() => ConceptScalarWhereInput)
    where!: InstanceType<typeof ConceptScalarWhereInput>;
    @Field(() => ConceptUpdateManyMutationInput, {nullable:false})
    @Type(() => ConceptUpdateManyMutationInput)
    data!: InstanceType<typeof ConceptUpdateManyMutationInput>;
}

@InputType()
export class ConceptUpdateManyWithoutPatentNestedInput {
    @Field(() => [ConceptCreateWithoutPatentInput], {nullable:true})
    @Type(() => ConceptCreateWithoutPatentInput)
    create?: Array<ConceptCreateWithoutPatentInput>;
    @Field(() => [ConceptCreateOrConnectWithoutPatentInput], {nullable:true})
    @Type(() => ConceptCreateOrConnectWithoutPatentInput)
    connectOrCreate?: Array<ConceptCreateOrConnectWithoutPatentInput>;
    @Field(() => [ConceptUpsertWithWhereUniqueWithoutPatentInput], {nullable:true})
    @Type(() => ConceptUpsertWithWhereUniqueWithoutPatentInput)
    upsert?: Array<ConceptUpsertWithWhereUniqueWithoutPatentInput>;
    @Field(() => ConceptCreateManyPatentInputEnvelope, {nullable:true})
    @Type(() => ConceptCreateManyPatentInputEnvelope)
    createMany?: InstanceType<typeof ConceptCreateManyPatentInputEnvelope>;
    @Field(() => [ConceptWhereUniqueInput], {nullable:true})
    @Type(() => ConceptWhereUniqueInput)
    set?: Array<Prisma.AtLeast<ConceptWhereUniqueInput, 'id'>>;
    @Field(() => [ConceptWhereUniqueInput], {nullable:true})
    @Type(() => ConceptWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<ConceptWhereUniqueInput, 'id'>>;
    @Field(() => [ConceptWhereUniqueInput], {nullable:true})
    @Type(() => ConceptWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<ConceptWhereUniqueInput, 'id'>>;
    @Field(() => [ConceptWhereUniqueInput], {nullable:true})
    @Type(() => ConceptWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<ConceptWhereUniqueInput, 'id'>>;
    @Field(() => [ConceptUpdateWithWhereUniqueWithoutPatentInput], {nullable:true})
    @Type(() => ConceptUpdateWithWhereUniqueWithoutPatentInput)
    update?: Array<ConceptUpdateWithWhereUniqueWithoutPatentInput>;
    @Field(() => [ConceptUpdateManyWithWhereWithoutPatentInput], {nullable:true})
    @Type(() => ConceptUpdateManyWithWhereWithoutPatentInput)
    updateMany?: Array<ConceptUpdateManyWithWhereWithoutPatentInput>;
    @Field(() => [ConceptScalarWhereInput], {nullable:true})
    @Type(() => ConceptScalarWhereInput)
    deleteMany?: Array<ConceptScalarWhereInput>;
}

@InputType()
export class ConceptUpdateWithWhereUniqueWithoutPatentInput {
    @Field(() => ConceptWhereUniqueInput, {nullable:false})
    @Type(() => ConceptWhereUniqueInput)
    where!: Prisma.AtLeast<ConceptWhereUniqueInput, 'id'>;
    @Field(() => ConceptUpdateWithoutPatentInput, {nullable:false})
    @Type(() => ConceptUpdateWithoutPatentInput)
    data!: InstanceType<typeof ConceptUpdateWithoutPatentInput>;
}

@InputType()
export class ConceptUpdateWithoutPatentInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    name?: string;
    @Field(() => String, {nullable:true})
    domain?: string;
    @Field(() => String, {nullable:true})
    smiles?: string;
    @Field(() => String, {nullable:true})
    inchiKey?: string;
    @Field(() => Float, {nullable:true})
    queryMatch?: number;
    @Field(() => [String], {nullable:true})
    sections?: Array<string>;
    @Field(() => Int, {nullable:true})
    count?: number;
}

@InputType()
export class ConceptUpdateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    name?: string;
    @Field(() => String, {nullable:true})
    domain?: string;
    @Field(() => String, {nullable:true})
    smiles?: string;
    @Field(() => String, {nullable:true})
    inchiKey?: string;
    @Field(() => Float, {nullable:true})
    queryMatch?: number;
    @Field(() => [String], {nullable:true})
    sections?: Array<string>;
    @Field(() => Int, {nullable:true})
    count?: number;
    @Field(() => PatentUpdateOneWithoutConceptsNestedInput, {nullable:true})
    Patent?: InstanceType<typeof PatentUpdateOneWithoutConceptsNestedInput>;
}

@InputType()
export class ConceptUpdatesectionsInput {
    @Field(() => [String], {nullable:true})
    set?: Array<string>;
    @Field(() => [String], {nullable:true})
    push?: Array<string>;
}

@InputType()
export class ConceptUpsertWithWhereUniqueWithoutPatentInput {
    @Field(() => ConceptWhereUniqueInput, {nullable:false})
    @Type(() => ConceptWhereUniqueInput)
    where!: Prisma.AtLeast<ConceptWhereUniqueInput, 'id'>;
    @Field(() => ConceptUpdateWithoutPatentInput, {nullable:false})
    @Type(() => ConceptUpdateWithoutPatentInput)
    update!: InstanceType<typeof ConceptUpdateWithoutPatentInput>;
    @Field(() => ConceptCreateWithoutPatentInput, {nullable:false})
    @Type(() => ConceptCreateWithoutPatentInput)
    create!: InstanceType<typeof ConceptCreateWithoutPatentInput>;
}

@InputType()
export class ConceptWhereUniqueInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => [ConceptWhereInput], {nullable:true})
    AND?: Array<ConceptWhereInput>;
    @Field(() => [ConceptWhereInput], {nullable:true})
    OR?: Array<ConceptWhereInput>;
    @Field(() => [ConceptWhereInput], {nullable:true})
    NOT?: Array<ConceptWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    name?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    domain?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    smiles?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    inchiKey?: InstanceType<typeof StringFilter>;
    @Field(() => FloatFilter, {nullable:true})
    queryMatch?: InstanceType<typeof FloatFilter>;
    @Field(() => StringListFilter, {nullable:true})
    sections?: InstanceType<typeof StringListFilter>;
    @Field(() => IntFilter, {nullable:true})
    count?: InstanceType<typeof IntFilter>;
    @Field(() => StringFilter, {nullable:true})
    patentNumber?: InstanceType<typeof StringFilter>;
    @Field(() => PatentRelationFilter, {nullable:true})
    Patent?: InstanceType<typeof PatentRelationFilter>;
}

@InputType()
export class ConceptWhereInput {
    @Field(() => [ConceptWhereInput], {nullable:true})
    AND?: Array<ConceptWhereInput>;
    @Field(() => [ConceptWhereInput], {nullable:true})
    OR?: Array<ConceptWhereInput>;
    @Field(() => [ConceptWhereInput], {nullable:true})
    NOT?: Array<ConceptWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    id?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    name?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    domain?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    smiles?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    inchiKey?: InstanceType<typeof StringFilter>;
    @Field(() => FloatFilter, {nullable:true})
    queryMatch?: InstanceType<typeof FloatFilter>;
    @Field(() => StringListFilter, {nullable:true})
    sections?: InstanceType<typeof StringListFilter>;
    @Field(() => IntFilter, {nullable:true})
    count?: InstanceType<typeof IntFilter>;
    @Field(() => StringFilter, {nullable:true})
    patentNumber?: InstanceType<typeof StringFilter>;
    @Field(() => PatentRelationFilter, {nullable:true})
    Patent?: InstanceType<typeof PatentRelationFilter>;
}

/**
 * Концепт
 */
@ObjectType({description:'Концепт'})
export class Concept {
    @Field(() => ID, {nullable:false})
    id!: string;
    @Field(() => String, {nullable:false})
    name!: string;
    @Field(() => String, {nullable:false})
    domain!: string;
    @Field(() => String, {nullable:true})
    smiles!: string | null;
    @Field(() => String, {nullable:true})
    inchiKey!: string | null;
    @Field(() => Float, {nullable:false})
    queryMatch!: number;
    @Field(() => [String], {nullable:true})
    sections!: Array<string>;
    @Field(() => Int, {nullable:false})
    count!: number;
    @Field(() => String, {nullable:true})
    patentNumber!: string | null;
    @Field(() => Patent, {nullable:true})
    Patent?: InstanceType<typeof Patent> | null;
}

@ArgsType()
export class CreateManyConceptArgs {
    @Field(() => [ConceptCreateManyInput], {nullable:false})
    @Type(() => ConceptCreateManyInput)
    data!: Array<ConceptCreateManyInput>;
    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}

@ArgsType()
export class CreateOneConceptArgs {
    @Field(() => ConceptCreateInput, {nullable:false})
    @Type(() => ConceptCreateInput)
    data!: InstanceType<typeof ConceptCreateInput>;
}

@ArgsType()
export class DeleteManyConceptArgs {
    @Field(() => ConceptWhereInput, {nullable:true})
    @Type(() => ConceptWhereInput)
    where?: InstanceType<typeof ConceptWhereInput>;
}

@ArgsType()
export class DeleteOneConceptArgs {
    @Field(() => ConceptWhereUniqueInput, {nullable:false})
    @Type(() => ConceptWhereUniqueInput)
    where!: Prisma.AtLeast<ConceptWhereUniqueInput, 'id'>;
}

@ArgsType()
export class FindFirstConceptOrThrowArgs {
    @Field(() => ConceptWhereInput, {nullable:true})
    @Type(() => ConceptWhereInput)
    where?: InstanceType<typeof ConceptWhereInput>;
    @Field(() => [ConceptOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<ConceptOrderByWithRelationInput>;
    @Field(() => ConceptWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<ConceptWhereUniqueInput, 'id'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [ConceptScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof ConceptScalarFieldEnum>;
}

@ArgsType()
export class FindFirstConceptArgs {
    @Field(() => ConceptWhereInput, {nullable:true})
    @Type(() => ConceptWhereInput)
    where?: InstanceType<typeof ConceptWhereInput>;
    @Field(() => [ConceptOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<ConceptOrderByWithRelationInput>;
    @Field(() => ConceptWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<ConceptWhereUniqueInput, 'id'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [ConceptScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof ConceptScalarFieldEnum>;
}

@ArgsType()
export class FindManyConceptArgs {
    @Field(() => ConceptWhereInput, {nullable:true})
    @Type(() => ConceptWhereInput)
    where?: InstanceType<typeof ConceptWhereInput>;
    @Field(() => [ConceptOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<ConceptOrderByWithRelationInput>;
    @Field(() => ConceptWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<ConceptWhereUniqueInput, 'id'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [ConceptScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof ConceptScalarFieldEnum>;
}

@ArgsType()
export class FindUniqueConceptOrThrowArgs {
    @Field(() => ConceptWhereUniqueInput, {nullable:false})
    @Type(() => ConceptWhereUniqueInput)
    where!: Prisma.AtLeast<ConceptWhereUniqueInput, 'id'>;
}

@ArgsType()
export class FindUniqueConceptArgs {
    @Field(() => ConceptWhereUniqueInput, {nullable:false})
    @Type(() => ConceptWhereUniqueInput)
    where!: Prisma.AtLeast<ConceptWhereUniqueInput, 'id'>;
}

@ArgsType()
export class UpdateManyConceptArgs {
    @Field(() => ConceptUpdateManyMutationInput, {nullable:false})
    @Type(() => ConceptUpdateManyMutationInput)
    data!: InstanceType<typeof ConceptUpdateManyMutationInput>;
    @Field(() => ConceptWhereInput, {nullable:true})
    @Type(() => ConceptWhereInput)
    where?: InstanceType<typeof ConceptWhereInput>;
}

@ArgsType()
export class UpdateOneConceptArgs {
    @Field(() => ConceptUpdateInput, {nullable:false})
    @Type(() => ConceptUpdateInput)
    data!: InstanceType<typeof ConceptUpdateInput>;
    @Field(() => ConceptWhereUniqueInput, {nullable:false})
    @Type(() => ConceptWhereUniqueInput)
    where!: Prisma.AtLeast<ConceptWhereUniqueInput, 'id'>;
}

@ArgsType()
export class UpsertOneConceptArgs {
    @Field(() => ConceptWhereUniqueInput, {nullable:false})
    @Type(() => ConceptWhereUniqueInput)
    where!: Prisma.AtLeast<ConceptWhereUniqueInput, 'id'>;
    @Field(() => ConceptCreateInput, {nullable:false})
    @Type(() => ConceptCreateInput)
    create!: InstanceType<typeof ConceptCreateInput>;
    @Field(() => ConceptUpdateInput, {nullable:false})
    @Type(() => ConceptUpdateInput)
    update!: InstanceType<typeof ConceptUpdateInput>;
}

@ObjectType()
export class AggregateMonitorLog {
    @Field(() => MonitorLogCountAggregate, {nullable:true})
    _count?: InstanceType<typeof MonitorLogCountAggregate>;
    @Field(() => MonitorLogMinAggregate, {nullable:true})
    _min?: InstanceType<typeof MonitorLogMinAggregate>;
    @Field(() => MonitorLogMaxAggregate, {nullable:true})
    _max?: InstanceType<typeof MonitorLogMaxAggregate>;
}

@ArgsType()
export class CreateManyMonitorLogArgs {
    @Field(() => [MonitorLogCreateManyInput], {nullable:false})
    @Type(() => MonitorLogCreateManyInput)
    data!: Array<MonitorLogCreateManyInput>;
    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}

@ArgsType()
export class CreateOneMonitorLogArgs {
    @Field(() => MonitorLogCreateInput, {nullable:false})
    @Type(() => MonitorLogCreateInput)
    data!: InstanceType<typeof MonitorLogCreateInput>;
}

@ArgsType()
export class DeleteManyMonitorLogArgs {
    @Field(() => MonitorLogWhereInput, {nullable:true})
    @Type(() => MonitorLogWhereInput)
    where?: InstanceType<typeof MonitorLogWhereInput>;
}

@ArgsType()
export class DeleteOneMonitorLogArgs {
    @Field(() => MonitorLogWhereUniqueInput, {nullable:false})
    @Type(() => MonitorLogWhereUniqueInput)
    where!: Prisma.AtLeast<MonitorLogWhereUniqueInput, 'id'>;
}

@ArgsType()
export class FindFirstMonitorLogOrThrowArgs {
    @Field(() => MonitorLogWhereInput, {nullable:true})
    @Type(() => MonitorLogWhereInput)
    where?: InstanceType<typeof MonitorLogWhereInput>;
    @Field(() => [MonitorLogOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<MonitorLogOrderByWithRelationInput>;
    @Field(() => MonitorLogWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<MonitorLogWhereUniqueInput, 'id'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [MonitorLogScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof MonitorLogScalarFieldEnum>;
}

@ArgsType()
export class FindFirstMonitorLogArgs {
    @Field(() => MonitorLogWhereInput, {nullable:true})
    @Type(() => MonitorLogWhereInput)
    where?: InstanceType<typeof MonitorLogWhereInput>;
    @Field(() => [MonitorLogOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<MonitorLogOrderByWithRelationInput>;
    @Field(() => MonitorLogWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<MonitorLogWhereUniqueInput, 'id'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [MonitorLogScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof MonitorLogScalarFieldEnum>;
}

@ArgsType()
export class FindManyMonitorLogArgs {
    @Field(() => MonitorLogWhereInput, {nullable:true})
    @Type(() => MonitorLogWhereInput)
    where?: InstanceType<typeof MonitorLogWhereInput>;
    @Field(() => [MonitorLogOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<MonitorLogOrderByWithRelationInput>;
    @Field(() => MonitorLogWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<MonitorLogWhereUniqueInput, 'id'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [MonitorLogScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof MonitorLogScalarFieldEnum>;
}

@ArgsType()
export class FindUniqueMonitorLogOrThrowArgs {
    @Field(() => MonitorLogWhereUniqueInput, {nullable:false})
    @Type(() => MonitorLogWhereUniqueInput)
    where!: Prisma.AtLeast<MonitorLogWhereUniqueInput, 'id'>;
}

@ArgsType()
export class FindUniqueMonitorLogArgs {
    @Field(() => MonitorLogWhereUniqueInput, {nullable:false})
    @Type(() => MonitorLogWhereUniqueInput)
    where!: Prisma.AtLeast<MonitorLogWhereUniqueInput, 'id'>;
}

@ArgsType()
export class MonitorLogAggregateArgs {
    @Field(() => MonitorLogWhereInput, {nullable:true})
    @Type(() => MonitorLogWhereInput)
    where?: InstanceType<typeof MonitorLogWhereInput>;
    @Field(() => [MonitorLogOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<MonitorLogOrderByWithRelationInput>;
    @Field(() => MonitorLogWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<MonitorLogWhereUniqueInput, 'id'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => MonitorLogCountAggregateInput, {nullable:true})
    _count?: InstanceType<typeof MonitorLogCountAggregateInput>;
    @Field(() => MonitorLogMinAggregateInput, {nullable:true})
    _min?: InstanceType<typeof MonitorLogMinAggregateInput>;
    @Field(() => MonitorLogMaxAggregateInput, {nullable:true})
    _max?: InstanceType<typeof MonitorLogMaxAggregateInput>;
}

@InputType()
export class MonitorLogCountAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    parserId?: true;
    @Field(() => Boolean, {nullable:true})
    createdAt?: true;
    @Field(() => Boolean, {nullable:true})
    type?: true;
    @Field(() => Boolean, {nullable:true})
    message?: true;
    @Field(() => Boolean, {nullable:true})
    _all?: true;
}

@ObjectType()
export class MonitorLogCountAggregate {
    @Field(() => Int, {nullable:false})
    id!: number;
    @Field(() => Int, {nullable:false})
    parserId!: number;
    @Field(() => Int, {nullable:false})
    createdAt!: number;
    @Field(() => Int, {nullable:false})
    type!: number;
    @Field(() => Int, {nullable:false})
    message!: number;
    @Field(() => Int, {nullable:false})
    _all!: number;
}

@InputType()
export class MonitorLogCountOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    parserId?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    type?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    message?: keyof typeof SortOrder;
}

@InputType()
export class MonitorLogCreateManyInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    parserId!: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => MonitorLogTypeEnum, {nullable:false})
    type!: keyof typeof MonitorLogTypeEnum;
    @Field(() => String, {nullable:false})
    message!: string;
}

@InputType()
export class MonitorLogCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    parserId!: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => MonitorLogTypeEnum, {nullable:false})
    type!: keyof typeof MonitorLogTypeEnum;
    @Field(() => String, {nullable:false})
    message!: string;
}

@ArgsType()
export class MonitorLogGroupByArgs {
    @Field(() => MonitorLogWhereInput, {nullable:true})
    @Type(() => MonitorLogWhereInput)
    where?: InstanceType<typeof MonitorLogWhereInput>;
    @Field(() => [MonitorLogOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<MonitorLogOrderByWithAggregationInput>;
    @Field(() => [MonitorLogScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof MonitorLogScalarFieldEnum>;
    @Field(() => MonitorLogScalarWhereWithAggregatesInput, {nullable:true})
    having?: InstanceType<typeof MonitorLogScalarWhereWithAggregatesInput>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => MonitorLogCountAggregateInput, {nullable:true})
    _count?: InstanceType<typeof MonitorLogCountAggregateInput>;
    @Field(() => MonitorLogMinAggregateInput, {nullable:true})
    _min?: InstanceType<typeof MonitorLogMinAggregateInput>;
    @Field(() => MonitorLogMaxAggregateInput, {nullable:true})
    _max?: InstanceType<typeof MonitorLogMaxAggregateInput>;
}

@ObjectType()
export class MonitorLogGroupBy {
    @Field(() => String, {nullable:false})
    id!: string;
    @Field(() => String, {nullable:false})
    parserId!: string;
    @Field(() => Date, {nullable:false})
    createdAt!: Date | string;
    @Field(() => MonitorLogTypeEnum, {nullable:false})
    type!: keyof typeof MonitorLogTypeEnum;
    @Field(() => String, {nullable:false})
    message!: string;
    @Field(() => MonitorLogCountAggregate, {nullable:true})
    _count?: InstanceType<typeof MonitorLogCountAggregate>;
    @Field(() => MonitorLogMinAggregate, {nullable:true})
    _min?: InstanceType<typeof MonitorLogMinAggregate>;
    @Field(() => MonitorLogMaxAggregate, {nullable:true})
    _max?: InstanceType<typeof MonitorLogMaxAggregate>;
}

@InputType()
export class MonitorLogMaxAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    parserId?: true;
    @Field(() => Boolean, {nullable:true})
    createdAt?: true;
    @Field(() => Boolean, {nullable:true})
    type?: true;
    @Field(() => Boolean, {nullable:true})
    message?: true;
}

@ObjectType()
export class MonitorLogMaxAggregate {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    parserId?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => MonitorLogTypeEnum, {nullable:true})
    type?: keyof typeof MonitorLogTypeEnum;
    @Field(() => String, {nullable:true})
    message?: string;
}

@InputType()
export class MonitorLogMaxOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    parserId?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    type?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    message?: keyof typeof SortOrder;
}

@InputType()
export class MonitorLogMinAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    parserId?: true;
    @Field(() => Boolean, {nullable:true})
    createdAt?: true;
    @Field(() => Boolean, {nullable:true})
    type?: true;
    @Field(() => Boolean, {nullable:true})
    message?: true;
}

@ObjectType()
export class MonitorLogMinAggregate {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    parserId?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => MonitorLogTypeEnum, {nullable:true})
    type?: keyof typeof MonitorLogTypeEnum;
    @Field(() => String, {nullable:true})
    message?: string;
}

@InputType()
export class MonitorLogMinOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    parserId?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    type?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    message?: keyof typeof SortOrder;
}

@InputType()
export class MonitorLogOrderByWithAggregationInput {
    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    parserId?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    type?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    message?: keyof typeof SortOrder;
    @Field(() => MonitorLogCountOrderByAggregateInput, {nullable:true})
    _count?: InstanceType<typeof MonitorLogCountOrderByAggregateInput>;
    @Field(() => MonitorLogMaxOrderByAggregateInput, {nullable:true})
    _max?: InstanceType<typeof MonitorLogMaxOrderByAggregateInput>;
    @Field(() => MonitorLogMinOrderByAggregateInput, {nullable:true})
    _min?: InstanceType<typeof MonitorLogMinOrderByAggregateInput>;
}

@InputType()
export class MonitorLogOrderByWithRelationInput {
    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    parserId?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    type?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    message?: keyof typeof SortOrder;
}

@InputType()
export class MonitorLogScalarWhereWithAggregatesInput {
    @Field(() => [MonitorLogScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<MonitorLogScalarWhereWithAggregatesInput>;
    @Field(() => [MonitorLogScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<MonitorLogScalarWhereWithAggregatesInput>;
    @Field(() => [MonitorLogScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<MonitorLogScalarWhereWithAggregatesInput>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    id?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    parserId?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeWithAggregatesFilter>;
    @Field(() => EnumMonitorLogTypeEnumWithAggregatesFilter, {nullable:true})
    type?: InstanceType<typeof EnumMonitorLogTypeEnumWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    message?: InstanceType<typeof StringWithAggregatesFilter>;
}

@InputType()
export class MonitorLogUncheckedCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    parserId!: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => MonitorLogTypeEnum, {nullable:false})
    type!: keyof typeof MonitorLogTypeEnum;
    @Field(() => String, {nullable:false})
    message!: string;
}

@InputType()
export class MonitorLogUncheckedUpdateManyInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    parserId?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => MonitorLogTypeEnum, {nullable:true})
    type?: keyof typeof MonitorLogTypeEnum;
    @Field(() => String, {nullable:true})
    message?: string;
}

@InputType()
export class MonitorLogUncheckedUpdateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    parserId?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => MonitorLogTypeEnum, {nullable:true})
    type?: keyof typeof MonitorLogTypeEnum;
    @Field(() => String, {nullable:true})
    message?: string;
}

@InputType()
export class MonitorLogUpdateManyMutationInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    parserId?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => MonitorLogTypeEnum, {nullable:true})
    type?: keyof typeof MonitorLogTypeEnum;
    @Field(() => String, {nullable:true})
    message?: string;
}

@InputType()
export class MonitorLogUpdateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    parserId?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => MonitorLogTypeEnum, {nullable:true})
    type?: keyof typeof MonitorLogTypeEnum;
    @Field(() => String, {nullable:true})
    message?: string;
}

@InputType()
export class MonitorLogWhereUniqueInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => [MonitorLogWhereInput], {nullable:true})
    AND?: Array<MonitorLogWhereInput>;
    @Field(() => [MonitorLogWhereInput], {nullable:true})
    OR?: Array<MonitorLogWhereInput>;
    @Field(() => [MonitorLogWhereInput], {nullable:true})
    NOT?: Array<MonitorLogWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    parserId?: InstanceType<typeof StringFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => EnumMonitorLogTypeEnumFilter, {nullable:true})
    type?: InstanceType<typeof EnumMonitorLogTypeEnumFilter>;
    @Field(() => StringFilter, {nullable:true})
    message?: InstanceType<typeof StringFilter>;
}

@InputType()
export class MonitorLogWhereInput {
    @Field(() => [MonitorLogWhereInput], {nullable:true})
    AND?: Array<MonitorLogWhereInput>;
    @Field(() => [MonitorLogWhereInput], {nullable:true})
    OR?: Array<MonitorLogWhereInput>;
    @Field(() => [MonitorLogWhereInput], {nullable:true})
    NOT?: Array<MonitorLogWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    id?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    parserId?: InstanceType<typeof StringFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => EnumMonitorLogTypeEnumFilter, {nullable:true})
    type?: InstanceType<typeof EnumMonitorLogTypeEnumFilter>;
    @Field(() => StringFilter, {nullable:true})
    message?: InstanceType<typeof StringFilter>;
}

@ObjectType()
export class MonitorLog {
    @Field(() => ID, {nullable:false})
    id!: string;
    @Field(() => String, {nullable:false})
    parserId!: string;
    @Field(() => Date, {nullable:false})
    createdAt!: Date;
    @Field(() => MonitorLogTypeEnum, {nullable:false})
    type!: keyof typeof MonitorLogTypeEnum;
    @Field(() => String, {nullable:false})
    message!: string;
}

@ArgsType()
export class UpdateManyMonitorLogArgs {
    @Field(() => MonitorLogUpdateManyMutationInput, {nullable:false})
    @Type(() => MonitorLogUpdateManyMutationInput)
    data!: InstanceType<typeof MonitorLogUpdateManyMutationInput>;
    @Field(() => MonitorLogWhereInput, {nullable:true})
    @Type(() => MonitorLogWhereInput)
    where?: InstanceType<typeof MonitorLogWhereInput>;
}

@ArgsType()
export class UpdateOneMonitorLogArgs {
    @Field(() => MonitorLogUpdateInput, {nullable:false})
    @Type(() => MonitorLogUpdateInput)
    data!: InstanceType<typeof MonitorLogUpdateInput>;
    @Field(() => MonitorLogWhereUniqueInput, {nullable:false})
    @Type(() => MonitorLogWhereUniqueInput)
    where!: Prisma.AtLeast<MonitorLogWhereUniqueInput, 'id'>;
}

@ArgsType()
export class UpsertOneMonitorLogArgs {
    @Field(() => MonitorLogWhereUniqueInput, {nullable:false})
    @Type(() => MonitorLogWhereUniqueInput)
    where!: Prisma.AtLeast<MonitorLogWhereUniqueInput, 'id'>;
    @Field(() => MonitorLogCreateInput, {nullable:false})
    @Type(() => MonitorLogCreateInput)
    create!: InstanceType<typeof MonitorLogCreateInput>;
    @Field(() => MonitorLogUpdateInput, {nullable:false})
    @Type(() => MonitorLogUpdateInput)
    update!: InstanceType<typeof MonitorLogUpdateInput>;
}

@ObjectType()
export class AggregateMonitorStat {
    @Field(() => MonitorStatCountAggregate, {nullable:true})
    _count?: InstanceType<typeof MonitorStatCountAggregate>;
    @Field(() => MonitorStatAvgAggregate, {nullable:true})
    _avg?: InstanceType<typeof MonitorStatAvgAggregate>;
    @Field(() => MonitorStatSumAggregate, {nullable:true})
    _sum?: InstanceType<typeof MonitorStatSumAggregate>;
    @Field(() => MonitorStatMinAggregate, {nullable:true})
    _min?: InstanceType<typeof MonitorStatMinAggregate>;
    @Field(() => MonitorStatMaxAggregate, {nullable:true})
    _max?: InstanceType<typeof MonitorStatMaxAggregate>;
}

@ArgsType()
export class CreateManyMonitorStatArgs {
    @Field(() => [MonitorStatCreateManyInput], {nullable:false})
    @Type(() => MonitorStatCreateManyInput)
    data!: Array<MonitorStatCreateManyInput>;
    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}

@ArgsType()
export class CreateOneMonitorStatArgs {
    @Field(() => MonitorStatCreateInput, {nullable:false})
    @Type(() => MonitorStatCreateInput)
    data!: InstanceType<typeof MonitorStatCreateInput>;
}

@ArgsType()
export class DeleteManyMonitorStatArgs {
    @Field(() => MonitorStatWhereInput, {nullable:true})
    @Type(() => MonitorStatWhereInput)
    where?: InstanceType<typeof MonitorStatWhereInput>;
}

@ArgsType()
export class DeleteOneMonitorStatArgs {
    @Field(() => MonitorStatWhereUniqueInput, {nullable:false})
    @Type(() => MonitorStatWhereUniqueInput)
    where!: Prisma.AtLeast<MonitorStatWhereUniqueInput, 'id' | 'parserId_createdAt'>;
}

@ArgsType()
export class FindFirstMonitorStatOrThrowArgs {
    @Field(() => MonitorStatWhereInput, {nullable:true})
    @Type(() => MonitorStatWhereInput)
    where?: InstanceType<typeof MonitorStatWhereInput>;
    @Field(() => [MonitorStatOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<MonitorStatOrderByWithRelationInput>;
    @Field(() => MonitorStatWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<MonitorStatWhereUniqueInput, 'id' | 'parserId_createdAt'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [MonitorStatScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof MonitorStatScalarFieldEnum>;
}

@ArgsType()
export class FindFirstMonitorStatArgs {
    @Field(() => MonitorStatWhereInput, {nullable:true})
    @Type(() => MonitorStatWhereInput)
    where?: InstanceType<typeof MonitorStatWhereInput>;
    @Field(() => [MonitorStatOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<MonitorStatOrderByWithRelationInput>;
    @Field(() => MonitorStatWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<MonitorStatWhereUniqueInput, 'id' | 'parserId_createdAt'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [MonitorStatScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof MonitorStatScalarFieldEnum>;
}

@ArgsType()
export class FindManyMonitorStatArgs {
    @Field(() => MonitorStatWhereInput, {nullable:true})
    @Type(() => MonitorStatWhereInput)
    where?: InstanceType<typeof MonitorStatWhereInput>;
    @Field(() => [MonitorStatOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<MonitorStatOrderByWithRelationInput>;
    @Field(() => MonitorStatWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<MonitorStatWhereUniqueInput, 'id' | 'parserId_createdAt'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [MonitorStatScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof MonitorStatScalarFieldEnum>;
}

@ArgsType()
export class FindUniqueMonitorStatOrThrowArgs {
    @Field(() => MonitorStatWhereUniqueInput, {nullable:false})
    @Type(() => MonitorStatWhereUniqueInput)
    where!: Prisma.AtLeast<MonitorStatWhereUniqueInput, 'id' | 'parserId_createdAt'>;
}

@ArgsType()
export class FindUniqueMonitorStatArgs {
    @Field(() => MonitorStatWhereUniqueInput, {nullable:false})
    @Type(() => MonitorStatWhereUniqueInput)
    where!: Prisma.AtLeast<MonitorStatWhereUniqueInput, 'id' | 'parserId_createdAt'>;
}

@ArgsType()
export class MonitorStatAggregateArgs {
    @Field(() => MonitorStatWhereInput, {nullable:true})
    @Type(() => MonitorStatWhereInput)
    where?: InstanceType<typeof MonitorStatWhereInput>;
    @Field(() => [MonitorStatOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<MonitorStatOrderByWithRelationInput>;
    @Field(() => MonitorStatWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<MonitorStatWhereUniqueInput, 'id' | 'parserId_createdAt'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => MonitorStatCountAggregateInput, {nullable:true})
    _count?: InstanceType<typeof MonitorStatCountAggregateInput>;
    @Field(() => MonitorStatAvgAggregateInput, {nullable:true})
    _avg?: InstanceType<typeof MonitorStatAvgAggregateInput>;
    @Field(() => MonitorStatSumAggregateInput, {nullable:true})
    _sum?: InstanceType<typeof MonitorStatSumAggregateInput>;
    @Field(() => MonitorStatMinAggregateInput, {nullable:true})
    _min?: InstanceType<typeof MonitorStatMinAggregateInput>;
    @Field(() => MonitorStatMaxAggregateInput, {nullable:true})
    _max?: InstanceType<typeof MonitorStatMaxAggregateInput>;
}

@InputType()
export class MonitorStatAvgAggregateInput {
    @Field(() => Boolean, {nullable:true})
    currentProcessing?: true;
    @Field(() => Boolean, {nullable:true})
    errors?: true;
    @Field(() => Boolean, {nullable:true})
    errorsMax?: true;
    @Field(() => Boolean, {nullable:true})
    rssMb?: true;
    @Field(() => Boolean, {nullable:true})
    heapMb?: true;
    @Field(() => Boolean, {nullable:true})
    heapMaxMb?: true;
    @Field(() => Boolean, {nullable:true})
    externalMb?: true;
    @Field(() => Boolean, {nullable:true})
    sighup?: true;
    @Field(() => Boolean, {nullable:true})
    sigint?: true;
    @Field(() => Boolean, {nullable:true})
    sigterm?: true;
}

@ObjectType()
export class MonitorStatAvgAggregate {
    @Field(() => Float, {nullable:true})
    currentProcessing?: number;
    @Field(() => Float, {nullable:true})
    errors?: number;
    @Field(() => Float, {nullable:true})
    errorsMax?: number;
    @Field(() => Float, {nullable:true})
    rssMb?: number;
    @Field(() => Float, {nullable:true})
    heapMb?: number;
    @Field(() => Float, {nullable:true})
    heapMaxMb?: number;
    @Field(() => Float, {nullable:true})
    externalMb?: number;
    @Field(() => Float, {nullable:true})
    sighup?: number;
    @Field(() => Float, {nullable:true})
    sigint?: number;
    @Field(() => Float, {nullable:true})
    sigterm?: number;
}

@InputType()
export class MonitorStatAvgOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    currentProcessing?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    errors?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    errorsMax?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    rssMb?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    heapMb?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    heapMaxMb?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    externalMb?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    sighup?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    sigint?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    sigterm?: keyof typeof SortOrder;
}

@InputType()
export class MonitorStatCountAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    parserId?: true;
    @Field(() => Boolean, {nullable:true})
    createdAt?: true;
    @Field(() => Boolean, {nullable:true})
    currentProcessing?: true;
    @Field(() => Boolean, {nullable:true})
    errors?: true;
    @Field(() => Boolean, {nullable:true})
    errorsMax?: true;
    @Field(() => Boolean, {nullable:true})
    rssMb?: true;
    @Field(() => Boolean, {nullable:true})
    heapMb?: true;
    @Field(() => Boolean, {nullable:true})
    heapMaxMb?: true;
    @Field(() => Boolean, {nullable:true})
    externalMb?: true;
    @Field(() => Boolean, {nullable:true})
    sighup?: true;
    @Field(() => Boolean, {nullable:true})
    sigint?: true;
    @Field(() => Boolean, {nullable:true})
    sigterm?: true;
    @Field(() => Boolean, {nullable:true})
    _all?: true;
}

@ObjectType()
export class MonitorStatCountAggregate {
    @Field(() => Int, {nullable:false})
    id!: number;
    @Field(() => Int, {nullable:false})
    parserId!: number;
    @Field(() => Int, {nullable:false})
    createdAt!: number;
    @Field(() => Int, {nullable:false})
    currentProcessing!: number;
    @Field(() => Int, {nullable:false})
    errors!: number;
    @Field(() => Int, {nullable:false})
    errorsMax!: number;
    @Field(() => Int, {nullable:false})
    rssMb!: number;
    @Field(() => Int, {nullable:false})
    heapMb!: number;
    @Field(() => Int, {nullable:false})
    heapMaxMb!: number;
    @Field(() => Int, {nullable:false})
    externalMb!: number;
    @Field(() => Int, {nullable:false})
    sighup!: number;
    @Field(() => Int, {nullable:false})
    sigint!: number;
    @Field(() => Int, {nullable:false})
    sigterm!: number;
    @Field(() => Int, {nullable:false})
    _all!: number;
}

@InputType()
export class MonitorStatCountOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    parserId?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    currentProcessing?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    errors?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    errorsMax?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    rssMb?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    heapMb?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    heapMaxMb?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    externalMb?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    sighup?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    sigint?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    sigterm?: keyof typeof SortOrder;
}

@InputType()
export class MonitorStatCreateManyInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    parserId!: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Int, {nullable:true})
    currentProcessing?: number;
    @Field(() => Int, {nullable:true})
    errors?: number;
    @Field(() => Int, {nullable:true})
    errorsMax?: number;
    @Field(() => Float, {nullable:true})
    rssMb?: number;
    @Field(() => Float, {nullable:true})
    heapMb?: number;
    @Field(() => Float, {nullable:true})
    heapMaxMb?: number;
    @Field(() => Float, {nullable:true})
    externalMb?: number;
    @Field(() => Int, {nullable:true})
    sighup?: number;
    @Field(() => Int, {nullable:true})
    sigint?: number;
    @Field(() => Int, {nullable:true})
    sigterm?: number;
}

@InputType()
export class MonitorStatCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    parserId!: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Int, {nullable:true})
    currentProcessing?: number;
    @Field(() => Int, {nullable:true})
    errors?: number;
    @Field(() => Int, {nullable:true})
    errorsMax?: number;
    @Field(() => Float, {nullable:true})
    rssMb?: number;
    @Field(() => Float, {nullable:true})
    heapMb?: number;
    @Field(() => Float, {nullable:true})
    heapMaxMb?: number;
    @Field(() => Float, {nullable:true})
    externalMb?: number;
    @Field(() => Int, {nullable:true})
    sighup?: number;
    @Field(() => Int, {nullable:true})
    sigint?: number;
    @Field(() => Int, {nullable:true})
    sigterm?: number;
}

@ArgsType()
export class MonitorStatGroupByArgs {
    @Field(() => MonitorStatWhereInput, {nullable:true})
    @Type(() => MonitorStatWhereInput)
    where?: InstanceType<typeof MonitorStatWhereInput>;
    @Field(() => [MonitorStatOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<MonitorStatOrderByWithAggregationInput>;
    @Field(() => [MonitorStatScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof MonitorStatScalarFieldEnum>;
    @Field(() => MonitorStatScalarWhereWithAggregatesInput, {nullable:true})
    having?: InstanceType<typeof MonitorStatScalarWhereWithAggregatesInput>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => MonitorStatCountAggregateInput, {nullable:true})
    _count?: InstanceType<typeof MonitorStatCountAggregateInput>;
    @Field(() => MonitorStatAvgAggregateInput, {nullable:true})
    _avg?: InstanceType<typeof MonitorStatAvgAggregateInput>;
    @Field(() => MonitorStatSumAggregateInput, {nullable:true})
    _sum?: InstanceType<typeof MonitorStatSumAggregateInput>;
    @Field(() => MonitorStatMinAggregateInput, {nullable:true})
    _min?: InstanceType<typeof MonitorStatMinAggregateInput>;
    @Field(() => MonitorStatMaxAggregateInput, {nullable:true})
    _max?: InstanceType<typeof MonitorStatMaxAggregateInput>;
}

@ObjectType()
export class MonitorStatGroupBy {
    @Field(() => String, {nullable:false})
    id!: string;
    @Field(() => String, {nullable:false})
    parserId!: string;
    @Field(() => Date, {nullable:false})
    createdAt!: Date | string;
    @Field(() => Int, {nullable:true})
    currentProcessing?: number;
    @Field(() => Int, {nullable:true})
    errors?: number;
    @Field(() => Int, {nullable:true})
    errorsMax?: number;
    @Field(() => Float, {nullable:true})
    rssMb?: number;
    @Field(() => Float, {nullable:true})
    heapMb?: number;
    @Field(() => Float, {nullable:true})
    heapMaxMb?: number;
    @Field(() => Float, {nullable:true})
    externalMb?: number;
    @Field(() => Int, {nullable:true})
    sighup?: number;
    @Field(() => Int, {nullable:true})
    sigint?: number;
    @Field(() => Int, {nullable:true})
    sigterm?: number;
    @Field(() => MonitorStatCountAggregate, {nullable:true})
    _count?: InstanceType<typeof MonitorStatCountAggregate>;
    @Field(() => MonitorStatAvgAggregate, {nullable:true})
    _avg?: InstanceType<typeof MonitorStatAvgAggregate>;
    @Field(() => MonitorStatSumAggregate, {nullable:true})
    _sum?: InstanceType<typeof MonitorStatSumAggregate>;
    @Field(() => MonitorStatMinAggregate, {nullable:true})
    _min?: InstanceType<typeof MonitorStatMinAggregate>;
    @Field(() => MonitorStatMaxAggregate, {nullable:true})
    _max?: InstanceType<typeof MonitorStatMaxAggregate>;
}

@InputType()
export class MonitorStatMaxAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    parserId?: true;
    @Field(() => Boolean, {nullable:true})
    createdAt?: true;
    @Field(() => Boolean, {nullable:true})
    currentProcessing?: true;
    @Field(() => Boolean, {nullable:true})
    errors?: true;
    @Field(() => Boolean, {nullable:true})
    errorsMax?: true;
    @Field(() => Boolean, {nullable:true})
    rssMb?: true;
    @Field(() => Boolean, {nullable:true})
    heapMb?: true;
    @Field(() => Boolean, {nullable:true})
    heapMaxMb?: true;
    @Field(() => Boolean, {nullable:true})
    externalMb?: true;
    @Field(() => Boolean, {nullable:true})
    sighup?: true;
    @Field(() => Boolean, {nullable:true})
    sigint?: true;
    @Field(() => Boolean, {nullable:true})
    sigterm?: true;
}

@ObjectType()
export class MonitorStatMaxAggregate {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    parserId?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Int, {nullable:true})
    currentProcessing?: number;
    @Field(() => Int, {nullable:true})
    errors?: number;
    @Field(() => Int, {nullable:true})
    errorsMax?: number;
    @Field(() => Float, {nullable:true})
    rssMb?: number;
    @Field(() => Float, {nullable:true})
    heapMb?: number;
    @Field(() => Float, {nullable:true})
    heapMaxMb?: number;
    @Field(() => Float, {nullable:true})
    externalMb?: number;
    @Field(() => Int, {nullable:true})
    sighup?: number;
    @Field(() => Int, {nullable:true})
    sigint?: number;
    @Field(() => Int, {nullable:true})
    sigterm?: number;
}

@InputType()
export class MonitorStatMaxOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    parserId?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    currentProcessing?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    errors?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    errorsMax?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    rssMb?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    heapMb?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    heapMaxMb?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    externalMb?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    sighup?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    sigint?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    sigterm?: keyof typeof SortOrder;
}

@InputType()
export class MonitorStatMinAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    parserId?: true;
    @Field(() => Boolean, {nullable:true})
    createdAt?: true;
    @Field(() => Boolean, {nullable:true})
    currentProcessing?: true;
    @Field(() => Boolean, {nullable:true})
    errors?: true;
    @Field(() => Boolean, {nullable:true})
    errorsMax?: true;
    @Field(() => Boolean, {nullable:true})
    rssMb?: true;
    @Field(() => Boolean, {nullable:true})
    heapMb?: true;
    @Field(() => Boolean, {nullable:true})
    heapMaxMb?: true;
    @Field(() => Boolean, {nullable:true})
    externalMb?: true;
    @Field(() => Boolean, {nullable:true})
    sighup?: true;
    @Field(() => Boolean, {nullable:true})
    sigint?: true;
    @Field(() => Boolean, {nullable:true})
    sigterm?: true;
}

@ObjectType()
export class MonitorStatMinAggregate {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    parserId?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Int, {nullable:true})
    currentProcessing?: number;
    @Field(() => Int, {nullable:true})
    errors?: number;
    @Field(() => Int, {nullable:true})
    errorsMax?: number;
    @Field(() => Float, {nullable:true})
    rssMb?: number;
    @Field(() => Float, {nullable:true})
    heapMb?: number;
    @Field(() => Float, {nullable:true})
    heapMaxMb?: number;
    @Field(() => Float, {nullable:true})
    externalMb?: number;
    @Field(() => Int, {nullable:true})
    sighup?: number;
    @Field(() => Int, {nullable:true})
    sigint?: number;
    @Field(() => Int, {nullable:true})
    sigterm?: number;
}

@InputType()
export class MonitorStatMinOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    parserId?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    currentProcessing?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    errors?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    errorsMax?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    rssMb?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    heapMb?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    heapMaxMb?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    externalMb?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    sighup?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    sigint?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    sigterm?: keyof typeof SortOrder;
}

@InputType()
export class MonitorStatOrderByWithAggregationInput {
    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    parserId?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: keyof typeof SortOrder;
    @Field(() => SortOrderInput, {nullable:true})
    currentProcessing?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    errors?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    errorsMax?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    rssMb?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    heapMb?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    heapMaxMb?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    externalMb?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    sighup?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    sigint?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    sigterm?: InstanceType<typeof SortOrderInput>;
    @Field(() => MonitorStatCountOrderByAggregateInput, {nullable:true})
    _count?: InstanceType<typeof MonitorStatCountOrderByAggregateInput>;
    @Field(() => MonitorStatAvgOrderByAggregateInput, {nullable:true})
    _avg?: InstanceType<typeof MonitorStatAvgOrderByAggregateInput>;
    @Field(() => MonitorStatMaxOrderByAggregateInput, {nullable:true})
    _max?: InstanceType<typeof MonitorStatMaxOrderByAggregateInput>;
    @Field(() => MonitorStatMinOrderByAggregateInput, {nullable:true})
    _min?: InstanceType<typeof MonitorStatMinOrderByAggregateInput>;
    @Field(() => MonitorStatSumOrderByAggregateInput, {nullable:true})
    _sum?: InstanceType<typeof MonitorStatSumOrderByAggregateInput>;
}

@InputType()
export class MonitorStatOrderByWithRelationInput {
    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    parserId?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: keyof typeof SortOrder;
    @Field(() => SortOrderInput, {nullable:true})
    currentProcessing?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    errors?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    errorsMax?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    rssMb?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    heapMb?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    heapMaxMb?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    externalMb?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    sighup?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    sigint?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    sigterm?: InstanceType<typeof SortOrderInput>;
}

@InputType()
export class MonitorStatParserIdCreatedAtCompoundUniqueInput {
    @Field(() => String, {nullable:false})
    parserId!: string;
    @Field(() => Date, {nullable:false})
    createdAt!: Date | string;
}

@InputType()
export class MonitorStatScalarWhereWithAggregatesInput {
    @Field(() => [MonitorStatScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<MonitorStatScalarWhereWithAggregatesInput>;
    @Field(() => [MonitorStatScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<MonitorStatScalarWhereWithAggregatesInput>;
    @Field(() => [MonitorStatScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<MonitorStatScalarWhereWithAggregatesInput>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    id?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    parserId?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeWithAggregatesFilter>;
    @Field(() => IntWithAggregatesFilter, {nullable:true})
    currentProcessing?: InstanceType<typeof IntWithAggregatesFilter>;
    @Field(() => IntWithAggregatesFilter, {nullable:true})
    errors?: InstanceType<typeof IntWithAggregatesFilter>;
    @Field(() => IntWithAggregatesFilter, {nullable:true})
    errorsMax?: InstanceType<typeof IntWithAggregatesFilter>;
    @Field(() => FloatWithAggregatesFilter, {nullable:true})
    rssMb?: InstanceType<typeof FloatWithAggregatesFilter>;
    @Field(() => FloatWithAggregatesFilter, {nullable:true})
    heapMb?: InstanceType<typeof FloatWithAggregatesFilter>;
    @Field(() => FloatWithAggregatesFilter, {nullable:true})
    heapMaxMb?: InstanceType<typeof FloatWithAggregatesFilter>;
    @Field(() => FloatWithAggregatesFilter, {nullable:true})
    externalMb?: InstanceType<typeof FloatWithAggregatesFilter>;
    @Field(() => IntWithAggregatesFilter, {nullable:true})
    sighup?: InstanceType<typeof IntWithAggregatesFilter>;
    @Field(() => IntWithAggregatesFilter, {nullable:true})
    sigint?: InstanceType<typeof IntWithAggregatesFilter>;
    @Field(() => IntWithAggregatesFilter, {nullable:true})
    sigterm?: InstanceType<typeof IntWithAggregatesFilter>;
}

@InputType()
export class MonitorStatSumAggregateInput {
    @Field(() => Boolean, {nullable:true})
    currentProcessing?: true;
    @Field(() => Boolean, {nullable:true})
    errors?: true;
    @Field(() => Boolean, {nullable:true})
    errorsMax?: true;
    @Field(() => Boolean, {nullable:true})
    rssMb?: true;
    @Field(() => Boolean, {nullable:true})
    heapMb?: true;
    @Field(() => Boolean, {nullable:true})
    heapMaxMb?: true;
    @Field(() => Boolean, {nullable:true})
    externalMb?: true;
    @Field(() => Boolean, {nullable:true})
    sighup?: true;
    @Field(() => Boolean, {nullable:true})
    sigint?: true;
    @Field(() => Boolean, {nullable:true})
    sigterm?: true;
}

@ObjectType()
export class MonitorStatSumAggregate {
    @Field(() => Int, {nullable:true})
    currentProcessing?: number;
    @Field(() => Int, {nullable:true})
    errors?: number;
    @Field(() => Int, {nullable:true})
    errorsMax?: number;
    @Field(() => Float, {nullable:true})
    rssMb?: number;
    @Field(() => Float, {nullable:true})
    heapMb?: number;
    @Field(() => Float, {nullable:true})
    heapMaxMb?: number;
    @Field(() => Float, {nullable:true})
    externalMb?: number;
    @Field(() => Int, {nullable:true})
    sighup?: number;
    @Field(() => Int, {nullable:true})
    sigint?: number;
    @Field(() => Int, {nullable:true})
    sigterm?: number;
}

@InputType()
export class MonitorStatSumOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    currentProcessing?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    errors?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    errorsMax?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    rssMb?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    heapMb?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    heapMaxMb?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    externalMb?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    sighup?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    sigint?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    sigterm?: keyof typeof SortOrder;
}

@InputType()
export class MonitorStatUncheckedCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    parserId!: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Int, {nullable:true})
    currentProcessing?: number;
    @Field(() => Int, {nullable:true})
    errors?: number;
    @Field(() => Int, {nullable:true})
    errorsMax?: number;
    @Field(() => Float, {nullable:true})
    rssMb?: number;
    @Field(() => Float, {nullable:true})
    heapMb?: number;
    @Field(() => Float, {nullable:true})
    heapMaxMb?: number;
    @Field(() => Float, {nullable:true})
    externalMb?: number;
    @Field(() => Int, {nullable:true})
    sighup?: number;
    @Field(() => Int, {nullable:true})
    sigint?: number;
    @Field(() => Int, {nullable:true})
    sigterm?: number;
}

@InputType()
export class MonitorStatUncheckedUpdateManyInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    parserId?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Int, {nullable:true})
    currentProcessing?: number;
    @Field(() => Int, {nullable:true})
    errors?: number;
    @Field(() => Int, {nullable:true})
    errorsMax?: number;
    @Field(() => Float, {nullable:true})
    rssMb?: number;
    @Field(() => Float, {nullable:true})
    heapMb?: number;
    @Field(() => Float, {nullable:true})
    heapMaxMb?: number;
    @Field(() => Float, {nullable:true})
    externalMb?: number;
    @Field(() => Int, {nullable:true})
    sighup?: number;
    @Field(() => Int, {nullable:true})
    sigint?: number;
    @Field(() => Int, {nullable:true})
    sigterm?: number;
}

@InputType()
export class MonitorStatUncheckedUpdateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    parserId?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Int, {nullable:true})
    currentProcessing?: number;
    @Field(() => Int, {nullable:true})
    errors?: number;
    @Field(() => Int, {nullable:true})
    errorsMax?: number;
    @Field(() => Float, {nullable:true})
    rssMb?: number;
    @Field(() => Float, {nullable:true})
    heapMb?: number;
    @Field(() => Float, {nullable:true})
    heapMaxMb?: number;
    @Field(() => Float, {nullable:true})
    externalMb?: number;
    @Field(() => Int, {nullable:true})
    sighup?: number;
    @Field(() => Int, {nullable:true})
    sigint?: number;
    @Field(() => Int, {nullable:true})
    sigterm?: number;
}

@InputType()
export class MonitorStatUpdateManyMutationInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    parserId?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Int, {nullable:true})
    currentProcessing?: number;
    @Field(() => Int, {nullable:true})
    errors?: number;
    @Field(() => Int, {nullable:true})
    errorsMax?: number;
    @Field(() => Float, {nullable:true})
    rssMb?: number;
    @Field(() => Float, {nullable:true})
    heapMb?: number;
    @Field(() => Float, {nullable:true})
    heapMaxMb?: number;
    @Field(() => Float, {nullable:true})
    externalMb?: number;
    @Field(() => Int, {nullable:true})
    sighup?: number;
    @Field(() => Int, {nullable:true})
    sigint?: number;
    @Field(() => Int, {nullable:true})
    sigterm?: number;
}

@InputType()
export class MonitorStatUpdateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    parserId?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Int, {nullable:true})
    currentProcessing?: number;
    @Field(() => Int, {nullable:true})
    errors?: number;
    @Field(() => Int, {nullable:true})
    errorsMax?: number;
    @Field(() => Float, {nullable:true})
    rssMb?: number;
    @Field(() => Float, {nullable:true})
    heapMb?: number;
    @Field(() => Float, {nullable:true})
    heapMaxMb?: number;
    @Field(() => Float, {nullable:true})
    externalMb?: number;
    @Field(() => Int, {nullable:true})
    sighup?: number;
    @Field(() => Int, {nullable:true})
    sigint?: number;
    @Field(() => Int, {nullable:true})
    sigterm?: number;
}

@InputType()
export class MonitorStatWhereUniqueInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => MonitorStatParserIdCreatedAtCompoundUniqueInput, {nullable:true})
    parserId_createdAt?: InstanceType<typeof MonitorStatParserIdCreatedAtCompoundUniqueInput>;
    @Field(() => [MonitorStatWhereInput], {nullable:true})
    AND?: Array<MonitorStatWhereInput>;
    @Field(() => [MonitorStatWhereInput], {nullable:true})
    OR?: Array<MonitorStatWhereInput>;
    @Field(() => [MonitorStatWhereInput], {nullable:true})
    NOT?: Array<MonitorStatWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    parserId?: InstanceType<typeof StringFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => IntFilter, {nullable:true})
    currentProcessing?: InstanceType<typeof IntFilter>;
    @Field(() => IntFilter, {nullable:true})
    errors?: InstanceType<typeof IntFilter>;
    @Field(() => IntFilter, {nullable:true})
    errorsMax?: InstanceType<typeof IntFilter>;
    @Field(() => FloatFilter, {nullable:true})
    rssMb?: InstanceType<typeof FloatFilter>;
    @Field(() => FloatFilter, {nullable:true})
    heapMb?: InstanceType<typeof FloatFilter>;
    @Field(() => FloatFilter, {nullable:true})
    heapMaxMb?: InstanceType<typeof FloatFilter>;
    @Field(() => FloatFilter, {nullable:true})
    externalMb?: InstanceType<typeof FloatFilter>;
    @Field(() => IntFilter, {nullable:true})
    sighup?: InstanceType<typeof IntFilter>;
    @Field(() => IntFilter, {nullable:true})
    sigint?: InstanceType<typeof IntFilter>;
    @Field(() => IntFilter, {nullable:true})
    sigterm?: InstanceType<typeof IntFilter>;
}

@InputType()
export class MonitorStatWhereInput {
    @Field(() => [MonitorStatWhereInput], {nullable:true})
    AND?: Array<MonitorStatWhereInput>;
    @Field(() => [MonitorStatWhereInput], {nullable:true})
    OR?: Array<MonitorStatWhereInput>;
    @Field(() => [MonitorStatWhereInput], {nullable:true})
    NOT?: Array<MonitorStatWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    id?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    parserId?: InstanceType<typeof StringFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => IntFilter, {nullable:true})
    currentProcessing?: InstanceType<typeof IntFilter>;
    @Field(() => IntFilter, {nullable:true})
    errors?: InstanceType<typeof IntFilter>;
    @Field(() => IntFilter, {nullable:true})
    errorsMax?: InstanceType<typeof IntFilter>;
    @Field(() => FloatFilter, {nullable:true})
    rssMb?: InstanceType<typeof FloatFilter>;
    @Field(() => FloatFilter, {nullable:true})
    heapMb?: InstanceType<typeof FloatFilter>;
    @Field(() => FloatFilter, {nullable:true})
    heapMaxMb?: InstanceType<typeof FloatFilter>;
    @Field(() => FloatFilter, {nullable:true})
    externalMb?: InstanceType<typeof FloatFilter>;
    @Field(() => IntFilter, {nullable:true})
    sighup?: InstanceType<typeof IntFilter>;
    @Field(() => IntFilter, {nullable:true})
    sigint?: InstanceType<typeof IntFilter>;
    @Field(() => IntFilter, {nullable:true})
    sigterm?: InstanceType<typeof IntFilter>;
}

@ObjectType()
export class MonitorStat {
    @Field(() => ID, {nullable:false})
    id!: string;
    @Field(() => String, {nullable:false})
    parserId!: string;
    @Field(() => Date, {nullable:false})
    createdAt!: Date;
    @Field(() => Int, {nullable:true})
    currentProcessing!: number | null;
    @Field(() => Int, {nullable:true})
    errors!: number | null;
    @Field(() => Int, {nullable:true})
    errorsMax!: number | null;
    @Field(() => Float, {nullable:true})
    rssMb!: number | null;
    @Field(() => Float, {nullable:true})
    heapMb!: number | null;
    @Field(() => Float, {nullable:true})
    heapMaxMb!: number | null;
    @Field(() => Float, {nullable:true})
    externalMb!: number | null;
    @Field(() => Int, {nullable:true})
    sighup!: number | null;
    @Field(() => Int, {nullable:true})
    sigint!: number | null;
    @Field(() => Int, {nullable:true})
    sigterm!: number | null;
}

@ArgsType()
export class UpdateManyMonitorStatArgs {
    @Field(() => MonitorStatUpdateManyMutationInput, {nullable:false})
    @Type(() => MonitorStatUpdateManyMutationInput)
    data!: InstanceType<typeof MonitorStatUpdateManyMutationInput>;
    @Field(() => MonitorStatWhereInput, {nullable:true})
    @Type(() => MonitorStatWhereInput)
    where?: InstanceType<typeof MonitorStatWhereInput>;
}

@ArgsType()
export class UpdateOneMonitorStatArgs {
    @Field(() => MonitorStatUpdateInput, {nullable:false})
    @Type(() => MonitorStatUpdateInput)
    data!: InstanceType<typeof MonitorStatUpdateInput>;
    @Field(() => MonitorStatWhereUniqueInput, {nullable:false})
    @Type(() => MonitorStatWhereUniqueInput)
    where!: Prisma.AtLeast<MonitorStatWhereUniqueInput, 'id' | 'parserId_createdAt'>;
}

@ArgsType()
export class UpsertOneMonitorStatArgs {
    @Field(() => MonitorStatWhereUniqueInput, {nullable:false})
    @Type(() => MonitorStatWhereUniqueInput)
    where!: Prisma.AtLeast<MonitorStatWhereUniqueInput, 'id' | 'parserId_createdAt'>;
    @Field(() => MonitorStatCreateInput, {nullable:false})
    @Type(() => MonitorStatCreateInput)
    create!: InstanceType<typeof MonitorStatCreateInput>;
    @Field(() => MonitorStatUpdateInput, {nullable:false})
    @Type(() => MonitorStatUpdateInput)
    update!: InstanceType<typeof MonitorStatUpdateInput>;
}

@ObjectType()
export class AggregatePatent {
    @Field(() => PatentCountAggregate, {nullable:true})
    _count?: InstanceType<typeof PatentCountAggregate>;
    @Field(() => PatentMinAggregate, {nullable:true})
    _min?: InstanceType<typeof PatentMinAggregate>;
    @Field(() => PatentMaxAggregate, {nullable:true})
    _max?: InstanceType<typeof PatentMaxAggregate>;
}

@ArgsType()
export class CreateManyPatentArgs {
    @Field(() => [PatentCreateManyInput], {nullable:false})
    @Type(() => PatentCreateManyInput)
    data!: Array<PatentCreateManyInput>;
    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}

@ArgsType()
export class CreateOnePatentArgs {
    @Field(() => PatentCreateInput, {nullable:false})
    @Type(() => PatentCreateInput)
    data!: InstanceType<typeof PatentCreateInput>;
}

@ArgsType()
export class DeleteManyPatentArgs {
    @Field(() => PatentWhereInput, {nullable:true})
    @Type(() => PatentWhereInput)
    where?: InstanceType<typeof PatentWhereInput>;
}

@ArgsType()
export class DeleteOnePatentArgs {
    @Field(() => PatentWhereUniqueInput, {nullable:false})
    @Type(() => PatentWhereUniqueInput)
    where!: Prisma.AtLeast<PatentWhereUniqueInput, 'id'>;
}

@ArgsType()
export class FindFirstPatentOrThrowArgs {
    @Field(() => PatentWhereInput, {nullable:true})
    @Type(() => PatentWhereInput)
    where?: InstanceType<typeof PatentWhereInput>;
    @Field(() => [PatentOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<PatentOrderByWithRelationInput>;
    @Field(() => PatentWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<PatentWhereUniqueInput, 'id'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [PatentScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof PatentScalarFieldEnum>;
}

@ArgsType()
export class FindFirstPatentArgs {
    @Field(() => PatentWhereInput, {nullable:true})
    @Type(() => PatentWhereInput)
    where?: InstanceType<typeof PatentWhereInput>;
    @Field(() => [PatentOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<PatentOrderByWithRelationInput>;
    @Field(() => PatentWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<PatentWhereUniqueInput, 'id'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [PatentScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof PatentScalarFieldEnum>;
}

@ArgsType()
export class FindManyPatentArgs {
    @Field(() => PatentWhereInput, {nullable:true})
    @Type(() => PatentWhereInput)
    where?: InstanceType<typeof PatentWhereInput>;
    @Field(() => [PatentOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<PatentOrderByWithRelationInput>;
    @Field(() => PatentWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<PatentWhereUniqueInput, 'id'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [PatentScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof PatentScalarFieldEnum>;
}

@ArgsType()
export class FindUniquePatentOrThrowArgs {
    @Field(() => PatentWhereUniqueInput, {nullable:false})
    @Type(() => PatentWhereUniqueInput)
    where!: Prisma.AtLeast<PatentWhereUniqueInput, 'id'>;
}

@ArgsType()
export class FindUniquePatentArgs {
    @Field(() => PatentWhereUniqueInput, {nullable:false})
    @Type(() => PatentWhereUniqueInput)
    where!: Prisma.AtLeast<PatentWhereUniqueInput, 'id'>;
}

@ArgsType()
export class PatentAggregateArgs {
    @Field(() => PatentWhereInput, {nullable:true})
    @Type(() => PatentWhereInput)
    where?: InstanceType<typeof PatentWhereInput>;
    @Field(() => [PatentOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<PatentOrderByWithRelationInput>;
    @Field(() => PatentWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<PatentWhereUniqueInput, 'id'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => PatentCountAggregateInput, {nullable:true})
    _count?: InstanceType<typeof PatentCountAggregateInput>;
    @Field(() => PatentMinAggregateInput, {nullable:true})
    _min?: InstanceType<typeof PatentMinAggregateInput>;
    @Field(() => PatentMaxAggregateInput, {nullable:true})
    _max?: InstanceType<typeof PatentMaxAggregateInput>;
}

@InputType()
export class PatentCountAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    urlGoogle?: true;
    @Field(() => Boolean, {nullable:true})
    urlYandex?: true;
    @Field(() => Boolean, {nullable:true})
    title?: true;
    @Field(() => Boolean, {nullable:true})
    abstract?: true;
    @Field(() => Boolean, {nullable:true})
    description?: true;
    @Field(() => Boolean, {nullable:true})
    classifications?: true;
    @Field(() => Boolean, {nullable:true})
    claims?: true;
    @Field(() => Boolean, {nullable:true})
    _all?: true;
}

@ObjectType()
export class PatentCountAggregate {
    @Field(() => Int, {nullable:false})
    id!: number;
    @Field(() => Int, {nullable:false})
    urlGoogle!: number;
    @Field(() => Int, {nullable:false})
    urlYandex!: number;
    @Field(() => Int, {nullable:false})
    title!: number;
    @Field(() => Int, {nullable:false})
    abstract!: number;
    @Field(() => Int, {nullable:false})
    description!: number;
    @Field(() => Int, {nullable:false})
    classifications!: number;
    @Field(() => Int, {nullable:false})
    claims!: number;
    @Field(() => Int, {nullable:false})
    _all!: number;
}

@InputType()
export class PatentCountOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    urlGoogle?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    urlYandex?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    title?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    abstract?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    description?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    classifications?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    claims?: keyof typeof SortOrder;
}

@ObjectType()
export class PatentCount {
    @Field(() => Int, {nullable:false})
    concepts?: number;
    @Field(() => Int, {nullable:false})
    relations?: number;
}

@InputType()
export class PatentCreateManyInput {
    @Field(() => String, {nullable:false})
    id!: string;
    @Field(() => String, {nullable:true})
    urlGoogle?: string;
    @Field(() => String, {nullable:true})
    urlYandex?: string;
    @Field(() => String, {nullable:true})
    title?: string;
    @Field(() => String, {nullable:true})
    abstract?: string;
    @Field(() => String, {nullable:true})
    description?: string;
    @Field(() => GraphQLJSON, {nullable:true})
    classifications?: any;
    @Field(() => GraphQLJSON, {nullable:true})
    claims?: any;
}

@InputType()
export class PatentCreateNestedOneWithoutConceptsInput {
    @Field(() => PatentCreateWithoutConceptsInput, {nullable:true})
    @Type(() => PatentCreateWithoutConceptsInput)
    create?: InstanceType<typeof PatentCreateWithoutConceptsInput>;
    @Field(() => PatentCreateOrConnectWithoutConceptsInput, {nullable:true})
    @Type(() => PatentCreateOrConnectWithoutConceptsInput)
    connectOrCreate?: InstanceType<typeof PatentCreateOrConnectWithoutConceptsInput>;
    @Field(() => PatentWhereUniqueInput, {nullable:true})
    @Type(() => PatentWhereUniqueInput)
    connect?: Prisma.AtLeast<PatentWhereUniqueInput, 'id'>;
}

@InputType()
export class PatentCreateNestedOneWithoutRelationsInput {
    @Field(() => PatentCreateWithoutRelationsInput, {nullable:true})
    @Type(() => PatentCreateWithoutRelationsInput)
    create?: InstanceType<typeof PatentCreateWithoutRelationsInput>;
    @Field(() => PatentCreateOrConnectWithoutRelationsInput, {nullable:true})
    @Type(() => PatentCreateOrConnectWithoutRelationsInput)
    connectOrCreate?: InstanceType<typeof PatentCreateOrConnectWithoutRelationsInput>;
    @Field(() => PatentWhereUniqueInput, {nullable:true})
    @Type(() => PatentWhereUniqueInput)
    connect?: Prisma.AtLeast<PatentWhereUniqueInput, 'id'>;
}

@InputType()
export class PatentCreateOrConnectWithoutConceptsInput {
    @Field(() => PatentWhereUniqueInput, {nullable:false})
    @Type(() => PatentWhereUniqueInput)
    where!: Prisma.AtLeast<PatentWhereUniqueInput, 'id'>;
    @Field(() => PatentCreateWithoutConceptsInput, {nullable:false})
    @Type(() => PatentCreateWithoutConceptsInput)
    create!: InstanceType<typeof PatentCreateWithoutConceptsInput>;
}

@InputType()
export class PatentCreateOrConnectWithoutRelationsInput {
    @Field(() => PatentWhereUniqueInput, {nullable:false})
    @Type(() => PatentWhereUniqueInput)
    where!: Prisma.AtLeast<PatentWhereUniqueInput, 'id'>;
    @Field(() => PatentCreateWithoutRelationsInput, {nullable:false})
    @Type(() => PatentCreateWithoutRelationsInput)
    create!: InstanceType<typeof PatentCreateWithoutRelationsInput>;
}

@InputType()
export class PatentCreateWithoutConceptsInput {
    @Field(() => String, {nullable:false})
    id!: string;
    @Field(() => String, {nullable:true})
    urlGoogle?: string;
    @Field(() => String, {nullable:true})
    urlYandex?: string;
    @Field(() => String, {nullable:true})
    title?: string;
    @Field(() => String, {nullable:true})
    abstract?: string;
    @Field(() => String, {nullable:true})
    description?: string;
    @Field(() => GraphQLJSON, {nullable:true})
    classifications?: any;
    @Field(() => GraphQLJSON, {nullable:true})
    claims?: any;
    @Field(() => PatentRelationCreateNestedManyWithoutPatentMainInput, {nullable:true})
    relations?: InstanceType<typeof PatentRelationCreateNestedManyWithoutPatentMainInput>;
}

@InputType()
export class PatentCreateWithoutRelationsInput {
    @Field(() => String, {nullable:false})
    id!: string;
    @Field(() => String, {nullable:true})
    urlGoogle?: string;
    @Field(() => String, {nullable:true})
    urlYandex?: string;
    @Field(() => String, {nullable:true})
    title?: string;
    @Field(() => String, {nullable:true})
    abstract?: string;
    @Field(() => String, {nullable:true})
    description?: string;
    @Field(() => GraphQLJSON, {nullable:true})
    classifications?: any;
    @Field(() => GraphQLJSON, {nullable:true})
    claims?: any;
    @Field(() => ConceptCreateNestedManyWithoutPatentInput, {nullable:true})
    concepts?: InstanceType<typeof ConceptCreateNestedManyWithoutPatentInput>;
}

@InputType()
export class PatentCreateInput {
    @Field(() => String, {nullable:false})
    id!: string;
    @Field(() => String, {nullable:true})
    urlGoogle?: string;
    @Field(() => String, {nullable:true})
    urlYandex?: string;
    @Field(() => String, {nullable:true})
    title?: string;
    @Field(() => String, {nullable:true})
    abstract?: string;
    @Field(() => String, {nullable:true})
    description?: string;
    @Field(() => GraphQLJSON, {nullable:true})
    classifications?: any;
    @Field(() => GraphQLJSON, {nullable:true})
    claims?: any;
    @Field(() => ConceptCreateNestedManyWithoutPatentInput, {nullable:true})
    concepts?: InstanceType<typeof ConceptCreateNestedManyWithoutPatentInput>;
    @Field(() => PatentRelationCreateNestedManyWithoutPatentMainInput, {nullable:true})
    relations?: InstanceType<typeof PatentRelationCreateNestedManyWithoutPatentMainInput>;
}

@ArgsType()
export class PatentGroupByArgs {
    @Field(() => PatentWhereInput, {nullable:true})
    @Type(() => PatentWhereInput)
    where?: InstanceType<typeof PatentWhereInput>;
    @Field(() => [PatentOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<PatentOrderByWithAggregationInput>;
    @Field(() => [PatentScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof PatentScalarFieldEnum>;
    @Field(() => PatentScalarWhereWithAggregatesInput, {nullable:true})
    having?: InstanceType<typeof PatentScalarWhereWithAggregatesInput>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => PatentCountAggregateInput, {nullable:true})
    _count?: InstanceType<typeof PatentCountAggregateInput>;
    @Field(() => PatentMinAggregateInput, {nullable:true})
    _min?: InstanceType<typeof PatentMinAggregateInput>;
    @Field(() => PatentMaxAggregateInput, {nullable:true})
    _max?: InstanceType<typeof PatentMaxAggregateInput>;
}

@ObjectType()
export class PatentGroupBy {
    @Field(() => String, {nullable:false})
    id!: string;
    @Field(() => String, {nullable:true})
    urlGoogle?: string;
    @Field(() => String, {nullable:true})
    urlYandex?: string;
    @Field(() => String, {nullable:true})
    title?: string;
    @Field(() => String, {nullable:true})
    abstract?: string;
    @Field(() => String, {nullable:true})
    description?: string;
    @Field(() => GraphQLJSON, {nullable:true})
    classifications?: any;
    @Field(() => GraphQLJSON, {nullable:true})
    claims?: any;
    @Field(() => PatentCountAggregate, {nullable:true})
    _count?: InstanceType<typeof PatentCountAggregate>;
    @Field(() => PatentMinAggregate, {nullable:true})
    _min?: InstanceType<typeof PatentMinAggregate>;
    @Field(() => PatentMaxAggregate, {nullable:true})
    _max?: InstanceType<typeof PatentMaxAggregate>;
}

@InputType()
export class PatentMaxAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    urlGoogle?: true;
    @Field(() => Boolean, {nullable:true})
    urlYandex?: true;
    @Field(() => Boolean, {nullable:true})
    title?: true;
    @Field(() => Boolean, {nullable:true})
    abstract?: true;
    @Field(() => Boolean, {nullable:true})
    description?: true;
}

@ObjectType()
export class PatentMaxAggregate {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    urlGoogle?: string;
    @Field(() => String, {nullable:true})
    urlYandex?: string;
    @Field(() => String, {nullable:true})
    title?: string;
    @Field(() => String, {nullable:true})
    abstract?: string;
    @Field(() => String, {nullable:true})
    description?: string;
}

@InputType()
export class PatentMaxOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    urlGoogle?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    urlYandex?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    title?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    abstract?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    description?: keyof typeof SortOrder;
}

@InputType()
export class PatentMinAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    urlGoogle?: true;
    @Field(() => Boolean, {nullable:true})
    urlYandex?: true;
    @Field(() => Boolean, {nullable:true})
    title?: true;
    @Field(() => Boolean, {nullable:true})
    abstract?: true;
    @Field(() => Boolean, {nullable:true})
    description?: true;
}

@ObjectType()
export class PatentMinAggregate {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    urlGoogle?: string;
    @Field(() => String, {nullable:true})
    urlYandex?: string;
    @Field(() => String, {nullable:true})
    title?: string;
    @Field(() => String, {nullable:true})
    abstract?: string;
    @Field(() => String, {nullable:true})
    description?: string;
}

@InputType()
export class PatentMinOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    urlGoogle?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    urlYandex?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    title?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    abstract?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    description?: keyof typeof SortOrder;
}

@InputType()
export class PatentOrderByWithAggregationInput {
    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;
    @Field(() => SortOrderInput, {nullable:true})
    urlGoogle?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    urlYandex?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    title?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    abstract?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    description?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    classifications?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    claims?: InstanceType<typeof SortOrderInput>;
    @Field(() => PatentCountOrderByAggregateInput, {nullable:true})
    _count?: InstanceType<typeof PatentCountOrderByAggregateInput>;
    @Field(() => PatentMaxOrderByAggregateInput, {nullable:true})
    _max?: InstanceType<typeof PatentMaxOrderByAggregateInput>;
    @Field(() => PatentMinOrderByAggregateInput, {nullable:true})
    _min?: InstanceType<typeof PatentMinOrderByAggregateInput>;
}

@InputType()
export class PatentOrderByWithRelationInput {
    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;
    @Field(() => SortOrderInput, {nullable:true})
    urlGoogle?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    urlYandex?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    title?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    abstract?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    description?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    classifications?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    claims?: InstanceType<typeof SortOrderInput>;
    @Field(() => ConceptOrderByRelationAggregateInput, {nullable:true})
    concepts?: InstanceType<typeof ConceptOrderByRelationAggregateInput>;
    @Field(() => PatentRelationOrderByRelationAggregateInput, {nullable:true})
    relations?: InstanceType<typeof PatentRelationOrderByRelationAggregateInput>;
}

@InputType()
export class PatentRelationFilter {
    @Field(() => PatentWhereInput, {nullable:true})
    is?: InstanceType<typeof PatentWhereInput>;
    @Field(() => PatentWhereInput, {nullable:true})
    isNot?: InstanceType<typeof PatentWhereInput>;
}

@InputType()
export class PatentScalarWhereWithAggregatesInput {
    @Field(() => [PatentScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<PatentScalarWhereWithAggregatesInput>;
    @Field(() => [PatentScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<PatentScalarWhereWithAggregatesInput>;
    @Field(() => [PatentScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<PatentScalarWhereWithAggregatesInput>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    id?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    urlGoogle?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    urlYandex?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    title?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    abstract?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    description?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => JsonWithAggregatesFilter, {nullable:true})
    classifications?: InstanceType<typeof JsonWithAggregatesFilter>;
    @Field(() => JsonWithAggregatesFilter, {nullable:true})
    claims?: InstanceType<typeof JsonWithAggregatesFilter>;
}

@InputType()
export class PatentUncheckedCreateWithoutConceptsInput {
    @Field(() => String, {nullable:false})
    id!: string;
    @Field(() => String, {nullable:true})
    urlGoogle?: string;
    @Field(() => String, {nullable:true})
    urlYandex?: string;
    @Field(() => String, {nullable:true})
    title?: string;
    @Field(() => String, {nullable:true})
    abstract?: string;
    @Field(() => String, {nullable:true})
    description?: string;
    @Field(() => GraphQLJSON, {nullable:true})
    classifications?: any;
    @Field(() => GraphQLJSON, {nullable:true})
    claims?: any;
    @Field(() => PatentRelationUncheckedCreateNestedManyWithoutPatentMainInput, {nullable:true})
    relations?: InstanceType<typeof PatentRelationUncheckedCreateNestedManyWithoutPatentMainInput>;
}

@InputType()
export class PatentUncheckedCreateWithoutRelationsInput {
    @Field(() => String, {nullable:false})
    id!: string;
    @Field(() => String, {nullable:true})
    urlGoogle?: string;
    @Field(() => String, {nullable:true})
    urlYandex?: string;
    @Field(() => String, {nullable:true})
    title?: string;
    @Field(() => String, {nullable:true})
    abstract?: string;
    @Field(() => String, {nullable:true})
    description?: string;
    @Field(() => GraphQLJSON, {nullable:true})
    classifications?: any;
    @Field(() => GraphQLJSON, {nullable:true})
    claims?: any;
    @Field(() => ConceptUncheckedCreateNestedManyWithoutPatentInput, {nullable:true})
    concepts?: InstanceType<typeof ConceptUncheckedCreateNestedManyWithoutPatentInput>;
}

@InputType()
export class PatentUncheckedCreateInput {
    @Field(() => String, {nullable:false})
    id!: string;
    @Field(() => String, {nullable:true})
    urlGoogle?: string;
    @Field(() => String, {nullable:true})
    urlYandex?: string;
    @Field(() => String, {nullable:true})
    title?: string;
    @Field(() => String, {nullable:true})
    abstract?: string;
    @Field(() => String, {nullable:true})
    description?: string;
    @Field(() => GraphQLJSON, {nullable:true})
    classifications?: any;
    @Field(() => GraphQLJSON, {nullable:true})
    claims?: any;
    @Field(() => ConceptUncheckedCreateNestedManyWithoutPatentInput, {nullable:true})
    concepts?: InstanceType<typeof ConceptUncheckedCreateNestedManyWithoutPatentInput>;
    @Field(() => PatentRelationUncheckedCreateNestedManyWithoutPatentMainInput, {nullable:true})
    relations?: InstanceType<typeof PatentRelationUncheckedCreateNestedManyWithoutPatentMainInput>;
}

@InputType()
export class PatentUncheckedUpdateManyInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    urlGoogle?: string;
    @Field(() => String, {nullable:true})
    urlYandex?: string;
    @Field(() => String, {nullable:true})
    title?: string;
    @Field(() => String, {nullable:true})
    abstract?: string;
    @Field(() => String, {nullable:true})
    description?: string;
    @Field(() => GraphQLJSON, {nullable:true})
    classifications?: any;
    @Field(() => GraphQLJSON, {nullable:true})
    claims?: any;
}

@InputType()
export class PatentUncheckedUpdateWithoutConceptsInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    urlGoogle?: string;
    @Field(() => String, {nullable:true})
    urlYandex?: string;
    @Field(() => String, {nullable:true})
    title?: string;
    @Field(() => String, {nullable:true})
    abstract?: string;
    @Field(() => String, {nullable:true})
    description?: string;
    @Field(() => GraphQLJSON, {nullable:true})
    classifications?: any;
    @Field(() => GraphQLJSON, {nullable:true})
    claims?: any;
    @Field(() => PatentRelationUncheckedUpdateManyWithoutPatentMainNestedInput, {nullable:true})
    relations?: InstanceType<typeof PatentRelationUncheckedUpdateManyWithoutPatentMainNestedInput>;
}

@InputType()
export class PatentUncheckedUpdateWithoutRelationsInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    urlGoogle?: string;
    @Field(() => String, {nullable:true})
    urlYandex?: string;
    @Field(() => String, {nullable:true})
    title?: string;
    @Field(() => String, {nullable:true})
    abstract?: string;
    @Field(() => String, {nullable:true})
    description?: string;
    @Field(() => GraphQLJSON, {nullable:true})
    classifications?: any;
    @Field(() => GraphQLJSON, {nullable:true})
    claims?: any;
    @Field(() => ConceptUncheckedUpdateManyWithoutPatentNestedInput, {nullable:true})
    concepts?: InstanceType<typeof ConceptUncheckedUpdateManyWithoutPatentNestedInput>;
}

@InputType()
export class PatentUncheckedUpdateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    urlGoogle?: string;
    @Field(() => String, {nullable:true})
    urlYandex?: string;
    @Field(() => String, {nullable:true})
    title?: string;
    @Field(() => String, {nullable:true})
    abstract?: string;
    @Field(() => String, {nullable:true})
    description?: string;
    @Field(() => GraphQLJSON, {nullable:true})
    classifications?: any;
    @Field(() => GraphQLJSON, {nullable:true})
    claims?: any;
    @Field(() => ConceptUncheckedUpdateManyWithoutPatentNestedInput, {nullable:true})
    concepts?: InstanceType<typeof ConceptUncheckedUpdateManyWithoutPatentNestedInput>;
    @Field(() => PatentRelationUncheckedUpdateManyWithoutPatentMainNestedInput, {nullable:true})
    relations?: InstanceType<typeof PatentRelationUncheckedUpdateManyWithoutPatentMainNestedInput>;
}

@InputType()
export class PatentUpdateManyMutationInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    urlGoogle?: string;
    @Field(() => String, {nullable:true})
    urlYandex?: string;
    @Field(() => String, {nullable:true})
    title?: string;
    @Field(() => String, {nullable:true})
    abstract?: string;
    @Field(() => String, {nullable:true})
    description?: string;
    @Field(() => GraphQLJSON, {nullable:true})
    classifications?: any;
    @Field(() => GraphQLJSON, {nullable:true})
    claims?: any;
}

@InputType()
export class PatentUpdateOneRequiredWithoutRelationsNestedInput {
    @Field(() => PatentCreateWithoutRelationsInput, {nullable:true})
    @Type(() => PatentCreateWithoutRelationsInput)
    create?: InstanceType<typeof PatentCreateWithoutRelationsInput>;
    @Field(() => PatentCreateOrConnectWithoutRelationsInput, {nullable:true})
    @Type(() => PatentCreateOrConnectWithoutRelationsInput)
    connectOrCreate?: InstanceType<typeof PatentCreateOrConnectWithoutRelationsInput>;
    @Field(() => PatentUpsertWithoutRelationsInput, {nullable:true})
    @Type(() => PatentUpsertWithoutRelationsInput)
    upsert?: InstanceType<typeof PatentUpsertWithoutRelationsInput>;
    @Field(() => PatentWhereUniqueInput, {nullable:true})
    @Type(() => PatentWhereUniqueInput)
    connect?: Prisma.AtLeast<PatentWhereUniqueInput, 'id'>;
    @Field(() => PatentUpdateToOneWithWhereWithoutRelationsInput, {nullable:true})
    @Type(() => PatentUpdateToOneWithWhereWithoutRelationsInput)
    update?: InstanceType<typeof PatentUpdateToOneWithWhereWithoutRelationsInput>;
}

@InputType()
export class PatentUpdateOneWithoutConceptsNestedInput {
    @Field(() => PatentCreateWithoutConceptsInput, {nullable:true})
    @Type(() => PatentCreateWithoutConceptsInput)
    create?: InstanceType<typeof PatentCreateWithoutConceptsInput>;
    @Field(() => PatentCreateOrConnectWithoutConceptsInput, {nullable:true})
    @Type(() => PatentCreateOrConnectWithoutConceptsInput)
    connectOrCreate?: InstanceType<typeof PatentCreateOrConnectWithoutConceptsInput>;
    @Field(() => PatentUpsertWithoutConceptsInput, {nullable:true})
    @Type(() => PatentUpsertWithoutConceptsInput)
    upsert?: InstanceType<typeof PatentUpsertWithoutConceptsInput>;
    @Field(() => PatentWhereInput, {nullable:true})
    @Type(() => PatentWhereInput)
    disconnect?: InstanceType<typeof PatentWhereInput>;
    @Field(() => PatentWhereInput, {nullable:true})
    @Type(() => PatentWhereInput)
    delete?: InstanceType<typeof PatentWhereInput>;
    @Field(() => PatentWhereUniqueInput, {nullable:true})
    @Type(() => PatentWhereUniqueInput)
    connect?: Prisma.AtLeast<PatentWhereUniqueInput, 'id'>;
    @Field(() => PatentUpdateToOneWithWhereWithoutConceptsInput, {nullable:true})
    @Type(() => PatentUpdateToOneWithWhereWithoutConceptsInput)
    update?: InstanceType<typeof PatentUpdateToOneWithWhereWithoutConceptsInput>;
}

@InputType()
export class PatentUpdateToOneWithWhereWithoutConceptsInput {
    @Field(() => PatentWhereInput, {nullable:true})
    @Type(() => PatentWhereInput)
    where?: InstanceType<typeof PatentWhereInput>;
    @Field(() => PatentUpdateWithoutConceptsInput, {nullable:false})
    @Type(() => PatentUpdateWithoutConceptsInput)
    data!: InstanceType<typeof PatentUpdateWithoutConceptsInput>;
}

@InputType()
export class PatentUpdateToOneWithWhereWithoutRelationsInput {
    @Field(() => PatentWhereInput, {nullable:true})
    @Type(() => PatentWhereInput)
    where?: InstanceType<typeof PatentWhereInput>;
    @Field(() => PatentUpdateWithoutRelationsInput, {nullable:false})
    @Type(() => PatentUpdateWithoutRelationsInput)
    data!: InstanceType<typeof PatentUpdateWithoutRelationsInput>;
}

@InputType()
export class PatentUpdateWithoutConceptsInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    urlGoogle?: string;
    @Field(() => String, {nullable:true})
    urlYandex?: string;
    @Field(() => String, {nullable:true})
    title?: string;
    @Field(() => String, {nullable:true})
    abstract?: string;
    @Field(() => String, {nullable:true})
    description?: string;
    @Field(() => GraphQLJSON, {nullable:true})
    classifications?: any;
    @Field(() => GraphQLJSON, {nullable:true})
    claims?: any;
    @Field(() => PatentRelationUpdateManyWithoutPatentMainNestedInput, {nullable:true})
    relations?: InstanceType<typeof PatentRelationUpdateManyWithoutPatentMainNestedInput>;
}

@InputType()
export class PatentUpdateWithoutRelationsInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    urlGoogle?: string;
    @Field(() => String, {nullable:true})
    urlYandex?: string;
    @Field(() => String, {nullable:true})
    title?: string;
    @Field(() => String, {nullable:true})
    abstract?: string;
    @Field(() => String, {nullable:true})
    description?: string;
    @Field(() => GraphQLJSON, {nullable:true})
    classifications?: any;
    @Field(() => GraphQLJSON, {nullable:true})
    claims?: any;
    @Field(() => ConceptUpdateManyWithoutPatentNestedInput, {nullable:true})
    concepts?: InstanceType<typeof ConceptUpdateManyWithoutPatentNestedInput>;
}

@InputType()
export class PatentUpdateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    urlGoogle?: string;
    @Field(() => String, {nullable:true})
    urlYandex?: string;
    @Field(() => String, {nullable:true})
    title?: string;
    @Field(() => String, {nullable:true})
    abstract?: string;
    @Field(() => String, {nullable:true})
    description?: string;
    @Field(() => GraphQLJSON, {nullable:true})
    classifications?: any;
    @Field(() => GraphQLJSON, {nullable:true})
    claims?: any;
    @Field(() => ConceptUpdateManyWithoutPatentNestedInput, {nullable:true})
    concepts?: InstanceType<typeof ConceptUpdateManyWithoutPatentNestedInput>;
    @Field(() => PatentRelationUpdateManyWithoutPatentMainNestedInput, {nullable:true})
    relations?: InstanceType<typeof PatentRelationUpdateManyWithoutPatentMainNestedInput>;
}

@InputType()
export class PatentUpsertWithoutConceptsInput {
    @Field(() => PatentUpdateWithoutConceptsInput, {nullable:false})
    @Type(() => PatentUpdateWithoutConceptsInput)
    update!: InstanceType<typeof PatentUpdateWithoutConceptsInput>;
    @Field(() => PatentCreateWithoutConceptsInput, {nullable:false})
    @Type(() => PatentCreateWithoutConceptsInput)
    create!: InstanceType<typeof PatentCreateWithoutConceptsInput>;
    @Field(() => PatentWhereInput, {nullable:true})
    @Type(() => PatentWhereInput)
    where?: InstanceType<typeof PatentWhereInput>;
}

@InputType()
export class PatentUpsertWithoutRelationsInput {
    @Field(() => PatentUpdateWithoutRelationsInput, {nullable:false})
    @Type(() => PatentUpdateWithoutRelationsInput)
    update!: InstanceType<typeof PatentUpdateWithoutRelationsInput>;
    @Field(() => PatentCreateWithoutRelationsInput, {nullable:false})
    @Type(() => PatentCreateWithoutRelationsInput)
    create!: InstanceType<typeof PatentCreateWithoutRelationsInput>;
    @Field(() => PatentWhereInput, {nullable:true})
    @Type(() => PatentWhereInput)
    where?: InstanceType<typeof PatentWhereInput>;
}

@InputType()
export class PatentWhereUniqueInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => [PatentWhereInput], {nullable:true})
    AND?: Array<PatentWhereInput>;
    @Field(() => [PatentWhereInput], {nullable:true})
    OR?: Array<PatentWhereInput>;
    @Field(() => [PatentWhereInput], {nullable:true})
    NOT?: Array<PatentWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    urlGoogle?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    urlYandex?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    title?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    abstract?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    description?: InstanceType<typeof StringFilter>;
    @Field(() => JsonFilter, {nullable:true})
    classifications?: InstanceType<typeof JsonFilter>;
    @Field(() => JsonFilter, {nullable:true})
    claims?: InstanceType<typeof JsonFilter>;
    @Field(() => ConceptListRelationFilter, {nullable:true})
    concepts?: InstanceType<typeof ConceptListRelationFilter>;
    @Field(() => PatentRelationListRelationFilter, {nullable:true})
    relations?: InstanceType<typeof PatentRelationListRelationFilter>;
}

@InputType()
export class PatentWhereInput {
    @Field(() => [PatentWhereInput], {nullable:true})
    AND?: Array<PatentWhereInput>;
    @Field(() => [PatentWhereInput], {nullable:true})
    OR?: Array<PatentWhereInput>;
    @Field(() => [PatentWhereInput], {nullable:true})
    NOT?: Array<PatentWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    id?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    urlGoogle?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    urlYandex?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    title?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    abstract?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    description?: InstanceType<typeof StringFilter>;
    @Field(() => JsonFilter, {nullable:true})
    classifications?: InstanceType<typeof JsonFilter>;
    @Field(() => JsonFilter, {nullable:true})
    claims?: InstanceType<typeof JsonFilter>;
    @Field(() => ConceptListRelationFilter, {nullable:true})
    concepts?: InstanceType<typeof ConceptListRelationFilter>;
    @Field(() => PatentRelationListRelationFilter, {nullable:true})
    relations?: InstanceType<typeof PatentRelationListRelationFilter>;
}

/**
 * Патент
 */
@ObjectType({description:'Патент'})
export class Patent {
    /**
     * Номер патента
     */
    @Field(() => ID, {nullable:false,description:'Номер патента'})
    id!: string;
    /**
     * Ссылка на патент в Google Patents
     */
    @Field(() => String, {nullable:true,description:'Ссылка на патент в Google Patents'})
    urlGoogle!: string | null;
    /**
     * Ссылка на патент в Yandex Patents
     */
    @Field(() => String, {nullable:true,description:'Ссылка на патент в Yandex Patents'})
    urlYandex!: string | null;
    /**
     * Название патента
     */
    @Field(() => String, {nullable:true,description:'Название патента'})
    title!: string | null;
    /**
     * Краткое описание
     */
    @Field(() => String, {nullable:true,description:'Краткое описание'})
    abstract!: string | null;
    /**
     * Полное описание
     */
    @Field(() => String, {nullable:true,description:'Полное описание'})
    description!: string | null;
    /**
     * Области технологий, классификации по патентным системам (например, IPC или CPC)
     */
    @Field(() => GraphQLJSON, {nullable:true,description:'Области технологий, классификации по патентным системам (например, IPC или CPC)'})
    classifications!: any | null;
    /**
     * Пункты формулы изобретения
     */
    @Field(() => GraphQLJSON, {nullable:true,description:'Пункты формулы изобретения'})
    claims!: any | null;
    /**
     * Концепты
     */
    @Field(() => [Concept], {nullable:true,description:'Концепты'})
    concepts?: Array<Concept>;
    /**
     * Ссылки на другие патенты
     */
    @Field(() => [PatentRelation], {nullable:true,description:'Ссылки на другие патенты'})
    relations?: Array<PatentRelation>;
    @Field(() => PatentCount, {nullable:false})
    _count?: InstanceType<typeof PatentCount>;
}

@ArgsType()
export class UpdateManyPatentArgs {
    @Field(() => PatentUpdateManyMutationInput, {nullable:false})
    @Type(() => PatentUpdateManyMutationInput)
    data!: InstanceType<typeof PatentUpdateManyMutationInput>;
    @Field(() => PatentWhereInput, {nullable:true})
    @Type(() => PatentWhereInput)
    where?: InstanceType<typeof PatentWhereInput>;
}

@ArgsType()
export class UpdateOnePatentArgs {
    @Field(() => PatentUpdateInput, {nullable:false})
    @Type(() => PatentUpdateInput)
    data!: InstanceType<typeof PatentUpdateInput>;
    @Field(() => PatentWhereUniqueInput, {nullable:false})
    @Type(() => PatentWhereUniqueInput)
    where!: Prisma.AtLeast<PatentWhereUniqueInput, 'id'>;
}

@ArgsType()
export class UpsertOnePatentArgs {
    @Field(() => PatentWhereUniqueInput, {nullable:false})
    @Type(() => PatentWhereUniqueInput)
    where!: Prisma.AtLeast<PatentWhereUniqueInput, 'id'>;
    @Field(() => PatentCreateInput, {nullable:false})
    @Type(() => PatentCreateInput)
    create!: InstanceType<typeof PatentCreateInput>;
    @Field(() => PatentUpdateInput, {nullable:false})
    @Type(() => PatentUpdateInput)
    update!: InstanceType<typeof PatentUpdateInput>;
}

@ObjectType()
export class AggregatePatentParseQueue {
    @Field(() => PatentParseQueueCountAggregate, {nullable:true})
    _count?: InstanceType<typeof PatentParseQueueCountAggregate>;
    @Field(() => PatentParseQueueAvgAggregate, {nullable:true})
    _avg?: InstanceType<typeof PatentParseQueueAvgAggregate>;
    @Field(() => PatentParseQueueSumAggregate, {nullable:true})
    _sum?: InstanceType<typeof PatentParseQueueSumAggregate>;
    @Field(() => PatentParseQueueMinAggregate, {nullable:true})
    _min?: InstanceType<typeof PatentParseQueueMinAggregate>;
    @Field(() => PatentParseQueueMaxAggregate, {nullable:true})
    _max?: InstanceType<typeof PatentParseQueueMaxAggregate>;
}

@ArgsType()
export class CreateManyPatentParseQueueArgs {
    @Field(() => [PatentParseQueueCreateManyInput], {nullable:false})
    @Type(() => PatentParseQueueCreateManyInput)
    data!: Array<PatentParseQueueCreateManyInput>;
    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}

@ArgsType()
export class CreateOnePatentParseQueueArgs {
    @Field(() => PatentParseQueueCreateInput, {nullable:false})
    @Type(() => PatentParseQueueCreateInput)
    data!: InstanceType<typeof PatentParseQueueCreateInput>;
}

@ArgsType()
export class DeleteManyPatentParseQueueArgs {
    @Field(() => PatentParseQueueWhereInput, {nullable:true})
    @Type(() => PatentParseQueueWhereInput)
    where?: InstanceType<typeof PatentParseQueueWhereInput>;
}

@ArgsType()
export class DeleteOnePatentParseQueueArgs {
    @Field(() => PatentParseQueueWhereUniqueInput, {nullable:false})
    @Type(() => PatentParseQueueWhereUniqueInput)
    where!: Prisma.AtLeast<PatentParseQueueWhereUniqueInput, 'url'>;
}

@ArgsType()
export class FindFirstPatentParseQueueOrThrowArgs {
    @Field(() => PatentParseQueueWhereInput, {nullable:true})
    @Type(() => PatentParseQueueWhereInput)
    where?: InstanceType<typeof PatentParseQueueWhereInput>;
    @Field(() => [PatentParseQueueOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<PatentParseQueueOrderByWithRelationInput>;
    @Field(() => PatentParseQueueWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<PatentParseQueueWhereUniqueInput, 'url'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [PatentParseQueueScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof PatentParseQueueScalarFieldEnum>;
}

@ArgsType()
export class FindFirstPatentParseQueueArgs {
    @Field(() => PatentParseQueueWhereInput, {nullable:true})
    @Type(() => PatentParseQueueWhereInput)
    where?: InstanceType<typeof PatentParseQueueWhereInput>;
    @Field(() => [PatentParseQueueOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<PatentParseQueueOrderByWithRelationInput>;
    @Field(() => PatentParseQueueWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<PatentParseQueueWhereUniqueInput, 'url'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [PatentParseQueueScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof PatentParseQueueScalarFieldEnum>;
}

@ArgsType()
export class FindManyPatentParseQueueArgs {
    @Field(() => PatentParseQueueWhereInput, {nullable:true})
    @Type(() => PatentParseQueueWhereInput)
    where?: InstanceType<typeof PatentParseQueueWhereInput>;
    @Field(() => [PatentParseQueueOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<PatentParseQueueOrderByWithRelationInput>;
    @Field(() => PatentParseQueueWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<PatentParseQueueWhereUniqueInput, 'url'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [PatentParseQueueScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof PatentParseQueueScalarFieldEnum>;
}

@ArgsType()
export class FindUniquePatentParseQueueOrThrowArgs {
    @Field(() => PatentParseQueueWhereUniqueInput, {nullable:false})
    @Type(() => PatentParseQueueWhereUniqueInput)
    where!: Prisma.AtLeast<PatentParseQueueWhereUniqueInput, 'url'>;
}

@ArgsType()
export class FindUniquePatentParseQueueArgs {
    @Field(() => PatentParseQueueWhereUniqueInput, {nullable:false})
    @Type(() => PatentParseQueueWhereUniqueInput)
    where!: Prisma.AtLeast<PatentParseQueueWhereUniqueInput, 'url'>;
}

@ArgsType()
export class PatentParseQueueAggregateArgs {
    @Field(() => PatentParseQueueWhereInput, {nullable:true})
    @Type(() => PatentParseQueueWhereInput)
    where?: InstanceType<typeof PatentParseQueueWhereInput>;
    @Field(() => [PatentParseQueueOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<PatentParseQueueOrderByWithRelationInput>;
    @Field(() => PatentParseQueueWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<PatentParseQueueWhereUniqueInput, 'url'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => PatentParseQueueCountAggregateInput, {nullable:true})
    _count?: InstanceType<typeof PatentParseQueueCountAggregateInput>;
    @Field(() => PatentParseQueueAvgAggregateInput, {nullable:true})
    _avg?: InstanceType<typeof PatentParseQueueAvgAggregateInput>;
    @Field(() => PatentParseQueueSumAggregateInput, {nullable:true})
    _sum?: InstanceType<typeof PatentParseQueueSumAggregateInput>;
    @Field(() => PatentParseQueueMinAggregateInput, {nullable:true})
    _min?: InstanceType<typeof PatentParseQueueMinAggregateInput>;
    @Field(() => PatentParseQueueMaxAggregateInput, {nullable:true})
    _max?: InstanceType<typeof PatentParseQueueMaxAggregateInput>;
}

@InputType()
export class PatentParseQueueAvgAggregateInput {
    @Field(() => Boolean, {nullable:true})
    tries?: true;
}

@ObjectType()
export class PatentParseQueueAvgAggregate {
    @Field(() => Float, {nullable:true})
    tries?: number;
}

@InputType()
export class PatentParseQueueAvgOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    tries?: keyof typeof SortOrder;
}

@InputType()
export class PatentParseQueueCountAggregateInput {
    @Field(() => Boolean, {nullable:true})
    url?: true;
    @Field(() => Boolean, {nullable:true})
    startedAt?: true;
    @Field(() => Boolean, {nullable:true})
    tries?: true;
    @Field(() => Boolean, {nullable:true})
    createdAt?: true;
    @Field(() => Boolean, {nullable:true})
    updatedAt?: true;
    @Field(() => Boolean, {nullable:true})
    _all?: true;
}

@ObjectType()
export class PatentParseQueueCountAggregate {
    @Field(() => Int, {nullable:false})
    url!: number;
    @Field(() => Int, {nullable:false})
    startedAt!: number;
    @Field(() => Int, {nullable:false})
    tries!: number;
    @Field(() => Int, {nullable:false})
    createdAt!: number;
    @Field(() => Int, {nullable:false})
    updatedAt!: number;
    @Field(() => Int, {nullable:false})
    _all!: number;
}

@InputType()
export class PatentParseQueueCountOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    url?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    startedAt?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    tries?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    updatedAt?: keyof typeof SortOrder;
}

@InputType()
export class PatentParseQueueCreateManyInput {
    @Field(() => String, {nullable:false})
    url!: string;
    @Field(() => Date, {nullable:true})
    startedAt?: Date | string;
    @Field(() => Int, {nullable:true})
    tries?: number;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}

@InputType()
export class PatentParseQueueCreateInput {
    @Field(() => String, {nullable:false})
    url!: string;
    @Field(() => Date, {nullable:true})
    startedAt?: Date | string;
    @Field(() => Int, {nullable:true})
    tries?: number;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}

@ArgsType()
export class PatentParseQueueGroupByArgs {
    @Field(() => PatentParseQueueWhereInput, {nullable:true})
    @Type(() => PatentParseQueueWhereInput)
    where?: InstanceType<typeof PatentParseQueueWhereInput>;
    @Field(() => [PatentParseQueueOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<PatentParseQueueOrderByWithAggregationInput>;
    @Field(() => [PatentParseQueueScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof PatentParseQueueScalarFieldEnum>;
    @Field(() => PatentParseQueueScalarWhereWithAggregatesInput, {nullable:true})
    having?: InstanceType<typeof PatentParseQueueScalarWhereWithAggregatesInput>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => PatentParseQueueCountAggregateInput, {nullable:true})
    _count?: InstanceType<typeof PatentParseQueueCountAggregateInput>;
    @Field(() => PatentParseQueueAvgAggregateInput, {nullable:true})
    _avg?: InstanceType<typeof PatentParseQueueAvgAggregateInput>;
    @Field(() => PatentParseQueueSumAggregateInput, {nullable:true})
    _sum?: InstanceType<typeof PatentParseQueueSumAggregateInput>;
    @Field(() => PatentParseQueueMinAggregateInput, {nullable:true})
    _min?: InstanceType<typeof PatentParseQueueMinAggregateInput>;
    @Field(() => PatentParseQueueMaxAggregateInput, {nullable:true})
    _max?: InstanceType<typeof PatentParseQueueMaxAggregateInput>;
}

@ObjectType()
export class PatentParseQueueGroupBy {
    @Field(() => String, {nullable:false})
    url!: string;
    @Field(() => Date, {nullable:true})
    startedAt?: Date | string;
    @Field(() => Int, {nullable:false})
    tries!: number;
    @Field(() => Date, {nullable:false})
    createdAt!: Date | string;
    @Field(() => Date, {nullable:false})
    updatedAt!: Date | string;
    @Field(() => PatentParseQueueCountAggregate, {nullable:true})
    _count?: InstanceType<typeof PatentParseQueueCountAggregate>;
    @Field(() => PatentParseQueueAvgAggregate, {nullable:true})
    _avg?: InstanceType<typeof PatentParseQueueAvgAggregate>;
    @Field(() => PatentParseQueueSumAggregate, {nullable:true})
    _sum?: InstanceType<typeof PatentParseQueueSumAggregate>;
    @Field(() => PatentParseQueueMinAggregate, {nullable:true})
    _min?: InstanceType<typeof PatentParseQueueMinAggregate>;
    @Field(() => PatentParseQueueMaxAggregate, {nullable:true})
    _max?: InstanceType<typeof PatentParseQueueMaxAggregate>;
}

@InputType()
export class PatentParseQueueMaxAggregateInput {
    @Field(() => Boolean, {nullable:true})
    url?: true;
    @Field(() => Boolean, {nullable:true})
    startedAt?: true;
    @Field(() => Boolean, {nullable:true})
    tries?: true;
    @Field(() => Boolean, {nullable:true})
    createdAt?: true;
    @Field(() => Boolean, {nullable:true})
    updatedAt?: true;
}

@ObjectType()
export class PatentParseQueueMaxAggregate {
    @Field(() => String, {nullable:true})
    url?: string;
    @Field(() => Date, {nullable:true})
    startedAt?: Date | string;
    @Field(() => Int, {nullable:true})
    tries?: number;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}

@InputType()
export class PatentParseQueueMaxOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    url?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    startedAt?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    tries?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    updatedAt?: keyof typeof SortOrder;
}

@InputType()
export class PatentParseQueueMinAggregateInput {
    @Field(() => Boolean, {nullable:true})
    url?: true;
    @Field(() => Boolean, {nullable:true})
    startedAt?: true;
    @Field(() => Boolean, {nullable:true})
    tries?: true;
    @Field(() => Boolean, {nullable:true})
    createdAt?: true;
    @Field(() => Boolean, {nullable:true})
    updatedAt?: true;
}

@ObjectType()
export class PatentParseQueueMinAggregate {
    @Field(() => String, {nullable:true})
    url?: string;
    @Field(() => Date, {nullable:true})
    startedAt?: Date | string;
    @Field(() => Int, {nullable:true})
    tries?: number;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}

@InputType()
export class PatentParseQueueMinOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    url?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    startedAt?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    tries?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    updatedAt?: keyof typeof SortOrder;
}

@InputType()
export class PatentParseQueueOrderByWithAggregationInput {
    @Field(() => SortOrder, {nullable:true})
    url?: keyof typeof SortOrder;
    @Field(() => SortOrderInput, {nullable:true})
    startedAt?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrder, {nullable:true})
    tries?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    updatedAt?: keyof typeof SortOrder;
    @Field(() => PatentParseQueueCountOrderByAggregateInput, {nullable:true})
    _count?: InstanceType<typeof PatentParseQueueCountOrderByAggregateInput>;
    @Field(() => PatentParseQueueAvgOrderByAggregateInput, {nullable:true})
    _avg?: InstanceType<typeof PatentParseQueueAvgOrderByAggregateInput>;
    @Field(() => PatentParseQueueMaxOrderByAggregateInput, {nullable:true})
    _max?: InstanceType<typeof PatentParseQueueMaxOrderByAggregateInput>;
    @Field(() => PatentParseQueueMinOrderByAggregateInput, {nullable:true})
    _min?: InstanceType<typeof PatentParseQueueMinOrderByAggregateInput>;
    @Field(() => PatentParseQueueSumOrderByAggregateInput, {nullable:true})
    _sum?: InstanceType<typeof PatentParseQueueSumOrderByAggregateInput>;
}

@InputType()
export class PatentParseQueueOrderByWithRelationInput {
    @Field(() => SortOrder, {nullable:true})
    url?: keyof typeof SortOrder;
    @Field(() => SortOrderInput, {nullable:true})
    startedAt?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrder, {nullable:true})
    tries?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    updatedAt?: keyof typeof SortOrder;
}

@InputType()
export class PatentParseQueueScalarWhereWithAggregatesInput {
    @Field(() => [PatentParseQueueScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<PatentParseQueueScalarWhereWithAggregatesInput>;
    @Field(() => [PatentParseQueueScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<PatentParseQueueScalarWhereWithAggregatesInput>;
    @Field(() => [PatentParseQueueScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<PatentParseQueueScalarWhereWithAggregatesInput>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    url?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    startedAt?: InstanceType<typeof DateTimeWithAggregatesFilter>;
    @Field(() => IntWithAggregatesFilter, {nullable:true})
    tries?: InstanceType<typeof IntWithAggregatesFilter>;
    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeWithAggregatesFilter>;
    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeWithAggregatesFilter>;
}

@InputType()
export class PatentParseQueueSumAggregateInput {
    @Field(() => Boolean, {nullable:true})
    tries?: true;
}

@ObjectType()
export class PatentParseQueueSumAggregate {
    @Field(() => Int, {nullable:true})
    tries?: number;
}

@InputType()
export class PatentParseQueueSumOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    tries?: keyof typeof SortOrder;
}

@InputType()
export class PatentParseQueueUncheckedCreateInput {
    @Field(() => String, {nullable:false})
    url!: string;
    @Field(() => Date, {nullable:true})
    startedAt?: Date | string;
    @Field(() => Int, {nullable:true})
    tries?: number;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}

@InputType()
export class PatentParseQueueUncheckedUpdateManyInput {
    @Field(() => String, {nullable:true})
    url?: string;
    @Field(() => Date, {nullable:true})
    startedAt?: Date | string;
    @Field(() => Int, {nullable:true})
    tries?: number;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}

@InputType()
export class PatentParseQueueUncheckedUpdateInput {
    @Field(() => String, {nullable:true})
    url?: string;
    @Field(() => Date, {nullable:true})
    startedAt?: Date | string;
    @Field(() => Int, {nullable:true})
    tries?: number;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}

@InputType()
export class PatentParseQueueUpdateManyMutationInput {
    @Field(() => String, {nullable:true})
    url?: string;
    @Field(() => Date, {nullable:true})
    startedAt?: Date | string;
    @Field(() => Int, {nullable:true})
    tries?: number;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}

@InputType()
export class PatentParseQueueUpdateInput {
    @Field(() => String, {nullable:true})
    url?: string;
    @Field(() => Date, {nullable:true})
    startedAt?: Date | string;
    @Field(() => Int, {nullable:true})
    tries?: number;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}

@InputType()
export class PatentParseQueueWhereUniqueInput {
    @Field(() => String, {nullable:true})
    url?: string;
    @Field(() => [PatentParseQueueWhereInput], {nullable:true})
    AND?: Array<PatentParseQueueWhereInput>;
    @Field(() => [PatentParseQueueWhereInput], {nullable:true})
    OR?: Array<PatentParseQueueWhereInput>;
    @Field(() => [PatentParseQueueWhereInput], {nullable:true})
    NOT?: Array<PatentParseQueueWhereInput>;
    @Field(() => DateTimeFilter, {nullable:true})
    startedAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => IntFilter, {nullable:true})
    tries?: InstanceType<typeof IntFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFilter>;
}

@InputType()
export class PatentParseQueueWhereInput {
    @Field(() => [PatentParseQueueWhereInput], {nullable:true})
    AND?: Array<PatentParseQueueWhereInput>;
    @Field(() => [PatentParseQueueWhereInput], {nullable:true})
    OR?: Array<PatentParseQueueWhereInput>;
    @Field(() => [PatentParseQueueWhereInput], {nullable:true})
    NOT?: Array<PatentParseQueueWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    url?: InstanceType<typeof StringFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    startedAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => IntFilter, {nullable:true})
    tries?: InstanceType<typeof IntFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFilter>;
}

@ObjectType()
export class PatentParseQueue {
    /**
     * Ссылка на патент
     */
    @Field(() => ID, {nullable:false,description:'Ссылка на патент'})
    url!: string;
    /**
     * Когда началась обработка (в случае истечения ожидания, можно начать снова)
     */
    @Field(() => Date, {nullable:true,description:'Когда началась обработка (в случае истечения ожидания, можно начать снова)'})
    startedAt!: Date | null;
    /**
     * Кол-во попыток обработки
     */
    @Field(() => Int, {nullable:false,defaultValue:0,description:'Кол-во попыток обработки'})
    tries!: number;
    @Field(() => Date, {nullable:false})
    createdAt!: Date;
    @Field(() => Date, {nullable:false})
    updatedAt!: Date;
}

@ArgsType()
export class UpdateManyPatentParseQueueArgs {
    @Field(() => PatentParseQueueUpdateManyMutationInput, {nullable:false})
    @Type(() => PatentParseQueueUpdateManyMutationInput)
    data!: InstanceType<typeof PatentParseQueueUpdateManyMutationInput>;
    @Field(() => PatentParseQueueWhereInput, {nullable:true})
    @Type(() => PatentParseQueueWhereInput)
    where?: InstanceType<typeof PatentParseQueueWhereInput>;
}

@ArgsType()
export class UpdateOnePatentParseQueueArgs {
    @Field(() => PatentParseQueueUpdateInput, {nullable:false})
    @Type(() => PatentParseQueueUpdateInput)
    data!: InstanceType<typeof PatentParseQueueUpdateInput>;
    @Field(() => PatentParseQueueWhereUniqueInput, {nullable:false})
    @Type(() => PatentParseQueueWhereUniqueInput)
    where!: Prisma.AtLeast<PatentParseQueueWhereUniqueInput, 'url'>;
}

@ArgsType()
export class UpsertOnePatentParseQueueArgs {
    @Field(() => PatentParseQueueWhereUniqueInput, {nullable:false})
    @Type(() => PatentParseQueueWhereUniqueInput)
    where!: Prisma.AtLeast<PatentParseQueueWhereUniqueInput, 'url'>;
    @Field(() => PatentParseQueueCreateInput, {nullable:false})
    @Type(() => PatentParseQueueCreateInput)
    create!: InstanceType<typeof PatentParseQueueCreateInput>;
    @Field(() => PatentParseQueueUpdateInput, {nullable:false})
    @Type(() => PatentParseQueueUpdateInput)
    update!: InstanceType<typeof PatentParseQueueUpdateInput>;
}

@ObjectType()
export class AggregatePatentRelation {
    @Field(() => PatentRelationCountAggregate, {nullable:true})
    _count?: InstanceType<typeof PatentRelationCountAggregate>;
    @Field(() => PatentRelationMinAggregate, {nullable:true})
    _min?: InstanceType<typeof PatentRelationMinAggregate>;
    @Field(() => PatentRelationMaxAggregate, {nullable:true})
    _max?: InstanceType<typeof PatentRelationMaxAggregate>;
}

@ArgsType()
export class CreateManyPatentRelationArgs {
    @Field(() => [PatentRelationCreateManyInput], {nullable:false})
    @Type(() => PatentRelationCreateManyInput)
    data!: Array<PatentRelationCreateManyInput>;
    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}

@ArgsType()
export class CreateOnePatentRelationArgs {
    @Field(() => PatentRelationCreateInput, {nullable:false})
    @Type(() => PatentRelationCreateInput)
    data!: InstanceType<typeof PatentRelationCreateInput>;
}

@ArgsType()
export class DeleteManyPatentRelationArgs {
    @Field(() => PatentRelationWhereInput, {nullable:true})
    @Type(() => PatentRelationWhereInput)
    where?: InstanceType<typeof PatentRelationWhereInput>;
}

@ArgsType()
export class DeleteOnePatentRelationArgs {
    @Field(() => PatentRelationWhereUniqueInput, {nullable:false})
    @Type(() => PatentRelationWhereUniqueInput)
    where!: Prisma.AtLeast<PatentRelationWhereUniqueInput, 'type_patentMainId_patentOtherId'>;
}

@ArgsType()
export class FindFirstPatentRelationOrThrowArgs {
    @Field(() => PatentRelationWhereInput, {nullable:true})
    @Type(() => PatentRelationWhereInput)
    where?: InstanceType<typeof PatentRelationWhereInput>;
    @Field(() => [PatentRelationOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<PatentRelationOrderByWithRelationInput>;
    @Field(() => PatentRelationWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<PatentRelationWhereUniqueInput, 'type_patentMainId_patentOtherId'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [PatentRelationScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof PatentRelationScalarFieldEnum>;
}

@ArgsType()
export class FindFirstPatentRelationArgs {
    @Field(() => PatentRelationWhereInput, {nullable:true})
    @Type(() => PatentRelationWhereInput)
    where?: InstanceType<typeof PatentRelationWhereInput>;
    @Field(() => [PatentRelationOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<PatentRelationOrderByWithRelationInput>;
    @Field(() => PatentRelationWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<PatentRelationWhereUniqueInput, 'type_patentMainId_patentOtherId'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [PatentRelationScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof PatentRelationScalarFieldEnum>;
}

@ArgsType()
export class FindManyPatentRelationArgs {
    @Field(() => PatentRelationWhereInput, {nullable:true})
    @Type(() => PatentRelationWhereInput)
    where?: InstanceType<typeof PatentRelationWhereInput>;
    @Field(() => [PatentRelationOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<PatentRelationOrderByWithRelationInput>;
    @Field(() => PatentRelationWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<PatentRelationWhereUniqueInput, 'type_patentMainId_patentOtherId'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [PatentRelationScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof PatentRelationScalarFieldEnum>;
}

@ArgsType()
export class FindUniquePatentRelationOrThrowArgs {
    @Field(() => PatentRelationWhereUniqueInput, {nullable:false})
    @Type(() => PatentRelationWhereUniqueInput)
    where!: Prisma.AtLeast<PatentRelationWhereUniqueInput, 'type_patentMainId_patentOtherId'>;
}

@ArgsType()
export class FindUniquePatentRelationArgs {
    @Field(() => PatentRelationWhereUniqueInput, {nullable:false})
    @Type(() => PatentRelationWhereUniqueInput)
    where!: Prisma.AtLeast<PatentRelationWhereUniqueInput, 'type_patentMainId_patentOtherId'>;
}

@ArgsType()
export class PatentRelationAggregateArgs {
    @Field(() => PatentRelationWhereInput, {nullable:true})
    @Type(() => PatentRelationWhereInput)
    where?: InstanceType<typeof PatentRelationWhereInput>;
    @Field(() => [PatentRelationOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<PatentRelationOrderByWithRelationInput>;
    @Field(() => PatentRelationWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<PatentRelationWhereUniqueInput, 'type_patentMainId_patentOtherId'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => PatentRelationCountAggregateInput, {nullable:true})
    _count?: InstanceType<typeof PatentRelationCountAggregateInput>;
    @Field(() => PatentRelationMinAggregateInput, {nullable:true})
    _min?: InstanceType<typeof PatentRelationMinAggregateInput>;
    @Field(() => PatentRelationMaxAggregateInput, {nullable:true})
    _max?: InstanceType<typeof PatentRelationMaxAggregateInput>;
}

@InputType()
export class PatentRelationCountAggregateInput {
    @Field(() => Boolean, {nullable:true})
    patentMainId?: true;
    @Field(() => Boolean, {nullable:true})
    type?: true;
    @Field(() => Boolean, {nullable:true})
    patentOtherId?: true;
    @Field(() => Boolean, {nullable:true})
    _all?: true;
}

@ObjectType()
export class PatentRelationCountAggregate {
    @Field(() => Int, {nullable:false})
    patentMainId!: number;
    @Field(() => Int, {nullable:false})
    type!: number;
    @Field(() => Int, {nullable:false})
    patentOtherId!: number;
    @Field(() => Int, {nullable:false})
    _all!: number;
}

@InputType()
export class PatentRelationCountOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    patentMainId?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    type?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    patentOtherId?: keyof typeof SortOrder;
}

@InputType()
export class PatentRelationCreateManyPatentMainInputEnvelope {
    @Field(() => [PatentRelationCreateManyPatentMainInput], {nullable:false})
    @Type(() => PatentRelationCreateManyPatentMainInput)
    data!: Array<PatentRelationCreateManyPatentMainInput>;
    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}

@InputType()
export class PatentRelationCreateManyPatentMainInput {
    @Field(() => PatentRelationTypeEnum, {nullable:false})
    type!: keyof typeof PatentRelationTypeEnum;
    @Field(() => String, {nullable:false})
    patentOtherId!: string;
}

@InputType()
export class PatentRelationCreateManyInput {
    @Field(() => String, {nullable:false})
    patentMainId!: string;
    @Field(() => PatentRelationTypeEnum, {nullable:false})
    type!: keyof typeof PatentRelationTypeEnum;
    @Field(() => String, {nullable:false})
    patentOtherId!: string;
}

@InputType()
export class PatentRelationCreateNestedManyWithoutPatentMainInput {
    @Field(() => [PatentRelationCreateWithoutPatentMainInput], {nullable:true})
    @Type(() => PatentRelationCreateWithoutPatentMainInput)
    create?: Array<PatentRelationCreateWithoutPatentMainInput>;
    @Field(() => [PatentRelationCreateOrConnectWithoutPatentMainInput], {nullable:true})
    @Type(() => PatentRelationCreateOrConnectWithoutPatentMainInput)
    connectOrCreate?: Array<PatentRelationCreateOrConnectWithoutPatentMainInput>;
    @Field(() => PatentRelationCreateManyPatentMainInputEnvelope, {nullable:true})
    @Type(() => PatentRelationCreateManyPatentMainInputEnvelope)
    createMany?: InstanceType<typeof PatentRelationCreateManyPatentMainInputEnvelope>;
    @Field(() => [PatentRelationWhereUniqueInput], {nullable:true})
    @Type(() => PatentRelationWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<PatentRelationWhereUniqueInput, 'type_patentMainId_patentOtherId'>>;
}

@InputType()
export class PatentRelationCreateOrConnectWithoutPatentMainInput {
    @Field(() => PatentRelationWhereUniqueInput, {nullable:false})
    @Type(() => PatentRelationWhereUniqueInput)
    where!: Prisma.AtLeast<PatentRelationWhereUniqueInput, 'type_patentMainId_patentOtherId'>;
    @Field(() => PatentRelationCreateWithoutPatentMainInput, {nullable:false})
    @Type(() => PatentRelationCreateWithoutPatentMainInput)
    create!: InstanceType<typeof PatentRelationCreateWithoutPatentMainInput>;
}

@InputType()
export class PatentRelationCreateWithoutPatentMainInput {
    @Field(() => PatentRelationTypeEnum, {nullable:false})
    type!: keyof typeof PatentRelationTypeEnum;
    @Field(() => String, {nullable:false})
    patentOtherId!: string;
}

@InputType()
export class PatentRelationCreateInput {
    @Field(() => PatentRelationTypeEnum, {nullable:false})
    type!: keyof typeof PatentRelationTypeEnum;
    @Field(() => String, {nullable:false})
    patentOtherId!: string;
    @Field(() => PatentCreateNestedOneWithoutRelationsInput, {nullable:false})
    patentMain!: InstanceType<typeof PatentCreateNestedOneWithoutRelationsInput>;
}

@ArgsType()
export class PatentRelationGroupByArgs {
    @Field(() => PatentRelationWhereInput, {nullable:true})
    @Type(() => PatentRelationWhereInput)
    where?: InstanceType<typeof PatentRelationWhereInput>;
    @Field(() => [PatentRelationOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<PatentRelationOrderByWithAggregationInput>;
    @Field(() => [PatentRelationScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof PatentRelationScalarFieldEnum>;
    @Field(() => PatentRelationScalarWhereWithAggregatesInput, {nullable:true})
    having?: InstanceType<typeof PatentRelationScalarWhereWithAggregatesInput>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => PatentRelationCountAggregateInput, {nullable:true})
    _count?: InstanceType<typeof PatentRelationCountAggregateInput>;
    @Field(() => PatentRelationMinAggregateInput, {nullable:true})
    _min?: InstanceType<typeof PatentRelationMinAggregateInput>;
    @Field(() => PatentRelationMaxAggregateInput, {nullable:true})
    _max?: InstanceType<typeof PatentRelationMaxAggregateInput>;
}

@ObjectType()
export class PatentRelationGroupBy {
    @Field(() => String, {nullable:false})
    patentMainId!: string;
    @Field(() => PatentRelationTypeEnum, {nullable:false})
    type!: keyof typeof PatentRelationTypeEnum;
    @Field(() => String, {nullable:false})
    patentOtherId!: string;
    @Field(() => PatentRelationCountAggregate, {nullable:true})
    _count?: InstanceType<typeof PatentRelationCountAggregate>;
    @Field(() => PatentRelationMinAggregate, {nullable:true})
    _min?: InstanceType<typeof PatentRelationMinAggregate>;
    @Field(() => PatentRelationMaxAggregate, {nullable:true})
    _max?: InstanceType<typeof PatentRelationMaxAggregate>;
}

@InputType()
export class PatentRelationListRelationFilter {
    @Field(() => PatentRelationWhereInput, {nullable:true})
    every?: InstanceType<typeof PatentRelationWhereInput>;
    @Field(() => PatentRelationWhereInput, {nullable:true})
    some?: InstanceType<typeof PatentRelationWhereInput>;
    @Field(() => PatentRelationWhereInput, {nullable:true})
    none?: InstanceType<typeof PatentRelationWhereInput>;
}

@InputType()
export class PatentRelationMaxAggregateInput {
    @Field(() => Boolean, {nullable:true})
    patentMainId?: true;
    @Field(() => Boolean, {nullable:true})
    type?: true;
    @Field(() => Boolean, {nullable:true})
    patentOtherId?: true;
}

@ObjectType()
export class PatentRelationMaxAggregate {
    @Field(() => String, {nullable:true})
    patentMainId?: string;
    @Field(() => PatentRelationTypeEnum, {nullable:true})
    type?: keyof typeof PatentRelationTypeEnum;
    @Field(() => String, {nullable:true})
    patentOtherId?: string;
}

@InputType()
export class PatentRelationMaxOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    patentMainId?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    type?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    patentOtherId?: keyof typeof SortOrder;
}

@InputType()
export class PatentRelationMinAggregateInput {
    @Field(() => Boolean, {nullable:true})
    patentMainId?: true;
    @Field(() => Boolean, {nullable:true})
    type?: true;
    @Field(() => Boolean, {nullable:true})
    patentOtherId?: true;
}

@ObjectType()
export class PatentRelationMinAggregate {
    @Field(() => String, {nullable:true})
    patentMainId?: string;
    @Field(() => PatentRelationTypeEnum, {nullable:true})
    type?: keyof typeof PatentRelationTypeEnum;
    @Field(() => String, {nullable:true})
    patentOtherId?: string;
}

@InputType()
export class PatentRelationMinOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    patentMainId?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    type?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    patentOtherId?: keyof typeof SortOrder;
}

@InputType()
export class PatentRelationOrderByRelationAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    _count?: keyof typeof SortOrder;
}

@InputType()
export class PatentRelationOrderByWithAggregationInput {
    @Field(() => SortOrder, {nullable:true})
    patentMainId?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    type?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    patentOtherId?: keyof typeof SortOrder;
    @Field(() => PatentRelationCountOrderByAggregateInput, {nullable:true})
    _count?: InstanceType<typeof PatentRelationCountOrderByAggregateInput>;
    @Field(() => PatentRelationMaxOrderByAggregateInput, {nullable:true})
    _max?: InstanceType<typeof PatentRelationMaxOrderByAggregateInput>;
    @Field(() => PatentRelationMinOrderByAggregateInput, {nullable:true})
    _min?: InstanceType<typeof PatentRelationMinOrderByAggregateInput>;
}

@InputType()
export class PatentRelationOrderByWithRelationInput {
    @Field(() => SortOrder, {nullable:true})
    patentMainId?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    type?: keyof typeof SortOrder;
    @Field(() => SortOrder, {nullable:true})
    patentOtherId?: keyof typeof SortOrder;
    @Field(() => PatentOrderByWithRelationInput, {nullable:true})
    patentMain?: InstanceType<typeof PatentOrderByWithRelationInput>;
}

@InputType()
export class PatentRelationScalarWhereWithAggregatesInput {
    @Field(() => [PatentRelationScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<PatentRelationScalarWhereWithAggregatesInput>;
    @Field(() => [PatentRelationScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<PatentRelationScalarWhereWithAggregatesInput>;
    @Field(() => [PatentRelationScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<PatentRelationScalarWhereWithAggregatesInput>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    patentMainId?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => EnumPatentRelationTypeEnumWithAggregatesFilter, {nullable:true})
    type?: InstanceType<typeof EnumPatentRelationTypeEnumWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    patentOtherId?: InstanceType<typeof StringWithAggregatesFilter>;
}

@InputType()
export class PatentRelationScalarWhereInput {
    @Field(() => [PatentRelationScalarWhereInput], {nullable:true})
    AND?: Array<PatentRelationScalarWhereInput>;
    @Field(() => [PatentRelationScalarWhereInput], {nullable:true})
    OR?: Array<PatentRelationScalarWhereInput>;
    @Field(() => [PatentRelationScalarWhereInput], {nullable:true})
    NOT?: Array<PatentRelationScalarWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    patentMainId?: InstanceType<typeof StringFilter>;
    @Field(() => EnumPatentRelationTypeEnumFilter, {nullable:true})
    type?: InstanceType<typeof EnumPatentRelationTypeEnumFilter>;
    @Field(() => StringFilter, {nullable:true})
    patentOtherId?: InstanceType<typeof StringFilter>;
}

@InputType()
export class PatentRelationTypePatentMainIdPatentOtherIdCompoundUniqueInput {
    @Field(() => PatentRelationTypeEnum, {nullable:false})
    type!: keyof typeof PatentRelationTypeEnum;
    @Field(() => String, {nullable:false})
    patentMainId!: string;
    @Field(() => String, {nullable:false})
    patentOtherId!: string;
}

@InputType()
export class PatentRelationUncheckedCreateNestedManyWithoutPatentMainInput {
    @Field(() => [PatentRelationCreateWithoutPatentMainInput], {nullable:true})
    @Type(() => PatentRelationCreateWithoutPatentMainInput)
    create?: Array<PatentRelationCreateWithoutPatentMainInput>;
    @Field(() => [PatentRelationCreateOrConnectWithoutPatentMainInput], {nullable:true})
    @Type(() => PatentRelationCreateOrConnectWithoutPatentMainInput)
    connectOrCreate?: Array<PatentRelationCreateOrConnectWithoutPatentMainInput>;
    @Field(() => PatentRelationCreateManyPatentMainInputEnvelope, {nullable:true})
    @Type(() => PatentRelationCreateManyPatentMainInputEnvelope)
    createMany?: InstanceType<typeof PatentRelationCreateManyPatentMainInputEnvelope>;
    @Field(() => [PatentRelationWhereUniqueInput], {nullable:true})
    @Type(() => PatentRelationWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<PatentRelationWhereUniqueInput, 'type_patentMainId_patentOtherId'>>;
}

@InputType()
export class PatentRelationUncheckedCreateWithoutPatentMainInput {
    @Field(() => PatentRelationTypeEnum, {nullable:false})
    type!: keyof typeof PatentRelationTypeEnum;
    @Field(() => String, {nullable:false})
    patentOtherId!: string;
}

@InputType()
export class PatentRelationUncheckedCreateInput {
    @Field(() => String, {nullable:false})
    patentMainId!: string;
    @Field(() => PatentRelationTypeEnum, {nullable:false})
    type!: keyof typeof PatentRelationTypeEnum;
    @Field(() => String, {nullable:false})
    patentOtherId!: string;
}

@InputType()
export class PatentRelationUncheckedUpdateManyWithoutPatentMainNestedInput {
    @Field(() => [PatentRelationCreateWithoutPatentMainInput], {nullable:true})
    @Type(() => PatentRelationCreateWithoutPatentMainInput)
    create?: Array<PatentRelationCreateWithoutPatentMainInput>;
    @Field(() => [PatentRelationCreateOrConnectWithoutPatentMainInput], {nullable:true})
    @Type(() => PatentRelationCreateOrConnectWithoutPatentMainInput)
    connectOrCreate?: Array<PatentRelationCreateOrConnectWithoutPatentMainInput>;
    @Field(() => [PatentRelationUpsertWithWhereUniqueWithoutPatentMainInput], {nullable:true})
    @Type(() => PatentRelationUpsertWithWhereUniqueWithoutPatentMainInput)
    upsert?: Array<PatentRelationUpsertWithWhereUniqueWithoutPatentMainInput>;
    @Field(() => PatentRelationCreateManyPatentMainInputEnvelope, {nullable:true})
    @Type(() => PatentRelationCreateManyPatentMainInputEnvelope)
    createMany?: InstanceType<typeof PatentRelationCreateManyPatentMainInputEnvelope>;
    @Field(() => [PatentRelationWhereUniqueInput], {nullable:true})
    @Type(() => PatentRelationWhereUniqueInput)
    set?: Array<Prisma.AtLeast<PatentRelationWhereUniqueInput, 'type_patentMainId_patentOtherId'>>;
    @Field(() => [PatentRelationWhereUniqueInput], {nullable:true})
    @Type(() => PatentRelationWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<PatentRelationWhereUniqueInput, 'type_patentMainId_patentOtherId'>>;
    @Field(() => [PatentRelationWhereUniqueInput], {nullable:true})
    @Type(() => PatentRelationWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<PatentRelationWhereUniqueInput, 'type_patentMainId_patentOtherId'>>;
    @Field(() => [PatentRelationWhereUniqueInput], {nullable:true})
    @Type(() => PatentRelationWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<PatentRelationWhereUniqueInput, 'type_patentMainId_patentOtherId'>>;
    @Field(() => [PatentRelationUpdateWithWhereUniqueWithoutPatentMainInput], {nullable:true})
    @Type(() => PatentRelationUpdateWithWhereUniqueWithoutPatentMainInput)
    update?: Array<PatentRelationUpdateWithWhereUniqueWithoutPatentMainInput>;
    @Field(() => [PatentRelationUpdateManyWithWhereWithoutPatentMainInput], {nullable:true})
    @Type(() => PatentRelationUpdateManyWithWhereWithoutPatentMainInput)
    updateMany?: Array<PatentRelationUpdateManyWithWhereWithoutPatentMainInput>;
    @Field(() => [PatentRelationScalarWhereInput], {nullable:true})
    @Type(() => PatentRelationScalarWhereInput)
    deleteMany?: Array<PatentRelationScalarWhereInput>;
}

@InputType()
export class PatentRelationUncheckedUpdateManyWithoutPatentMainInput {
    @Field(() => PatentRelationTypeEnum, {nullable:true})
    type?: keyof typeof PatentRelationTypeEnum;
    @Field(() => String, {nullable:true})
    patentOtherId?: string;
}

@InputType()
export class PatentRelationUncheckedUpdateManyInput {
    @Field(() => String, {nullable:true})
    patentMainId?: string;
    @Field(() => PatentRelationTypeEnum, {nullable:true})
    type?: keyof typeof PatentRelationTypeEnum;
    @Field(() => String, {nullable:true})
    patentOtherId?: string;
}

@InputType()
export class PatentRelationUncheckedUpdateWithoutPatentMainInput {
    @Field(() => PatentRelationTypeEnum, {nullable:true})
    type?: keyof typeof PatentRelationTypeEnum;
    @Field(() => String, {nullable:true})
    patentOtherId?: string;
}

@InputType()
export class PatentRelationUncheckedUpdateInput {
    @Field(() => String, {nullable:true})
    patentMainId?: string;
    @Field(() => PatentRelationTypeEnum, {nullable:true})
    type?: keyof typeof PatentRelationTypeEnum;
    @Field(() => String, {nullable:true})
    patentOtherId?: string;
}

@InputType()
export class PatentRelationUpdateManyMutationInput {
    @Field(() => PatentRelationTypeEnum, {nullable:true})
    type?: keyof typeof PatentRelationTypeEnum;
    @Field(() => String, {nullable:true})
    patentOtherId?: string;
}

@InputType()
export class PatentRelationUpdateManyWithWhereWithoutPatentMainInput {
    @Field(() => PatentRelationScalarWhereInput, {nullable:false})
    @Type(() => PatentRelationScalarWhereInput)
    where!: InstanceType<typeof PatentRelationScalarWhereInput>;
    @Field(() => PatentRelationUpdateManyMutationInput, {nullable:false})
    @Type(() => PatentRelationUpdateManyMutationInput)
    data!: InstanceType<typeof PatentRelationUpdateManyMutationInput>;
}

@InputType()
export class PatentRelationUpdateManyWithoutPatentMainNestedInput {
    @Field(() => [PatentRelationCreateWithoutPatentMainInput], {nullable:true})
    @Type(() => PatentRelationCreateWithoutPatentMainInput)
    create?: Array<PatentRelationCreateWithoutPatentMainInput>;
    @Field(() => [PatentRelationCreateOrConnectWithoutPatentMainInput], {nullable:true})
    @Type(() => PatentRelationCreateOrConnectWithoutPatentMainInput)
    connectOrCreate?: Array<PatentRelationCreateOrConnectWithoutPatentMainInput>;
    @Field(() => [PatentRelationUpsertWithWhereUniqueWithoutPatentMainInput], {nullable:true})
    @Type(() => PatentRelationUpsertWithWhereUniqueWithoutPatentMainInput)
    upsert?: Array<PatentRelationUpsertWithWhereUniqueWithoutPatentMainInput>;
    @Field(() => PatentRelationCreateManyPatentMainInputEnvelope, {nullable:true})
    @Type(() => PatentRelationCreateManyPatentMainInputEnvelope)
    createMany?: InstanceType<typeof PatentRelationCreateManyPatentMainInputEnvelope>;
    @Field(() => [PatentRelationWhereUniqueInput], {nullable:true})
    @Type(() => PatentRelationWhereUniqueInput)
    set?: Array<Prisma.AtLeast<PatentRelationWhereUniqueInput, 'type_patentMainId_patentOtherId'>>;
    @Field(() => [PatentRelationWhereUniqueInput], {nullable:true})
    @Type(() => PatentRelationWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<PatentRelationWhereUniqueInput, 'type_patentMainId_patentOtherId'>>;
    @Field(() => [PatentRelationWhereUniqueInput], {nullable:true})
    @Type(() => PatentRelationWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<PatentRelationWhereUniqueInput, 'type_patentMainId_patentOtherId'>>;
    @Field(() => [PatentRelationWhereUniqueInput], {nullable:true})
    @Type(() => PatentRelationWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<PatentRelationWhereUniqueInput, 'type_patentMainId_patentOtherId'>>;
    @Field(() => [PatentRelationUpdateWithWhereUniqueWithoutPatentMainInput], {nullable:true})
    @Type(() => PatentRelationUpdateWithWhereUniqueWithoutPatentMainInput)
    update?: Array<PatentRelationUpdateWithWhereUniqueWithoutPatentMainInput>;
    @Field(() => [PatentRelationUpdateManyWithWhereWithoutPatentMainInput], {nullable:true})
    @Type(() => PatentRelationUpdateManyWithWhereWithoutPatentMainInput)
    updateMany?: Array<PatentRelationUpdateManyWithWhereWithoutPatentMainInput>;
    @Field(() => [PatentRelationScalarWhereInput], {nullable:true})
    @Type(() => PatentRelationScalarWhereInput)
    deleteMany?: Array<PatentRelationScalarWhereInput>;
}

@InputType()
export class PatentRelationUpdateWithWhereUniqueWithoutPatentMainInput {
    @Field(() => PatentRelationWhereUniqueInput, {nullable:false})
    @Type(() => PatentRelationWhereUniqueInput)
    where!: Prisma.AtLeast<PatentRelationWhereUniqueInput, 'type_patentMainId_patentOtherId'>;
    @Field(() => PatentRelationUpdateWithoutPatentMainInput, {nullable:false})
    @Type(() => PatentRelationUpdateWithoutPatentMainInput)
    data!: InstanceType<typeof PatentRelationUpdateWithoutPatentMainInput>;
}

@InputType()
export class PatentRelationUpdateWithoutPatentMainInput {
    @Field(() => PatentRelationTypeEnum, {nullable:true})
    type?: keyof typeof PatentRelationTypeEnum;
    @Field(() => String, {nullable:true})
    patentOtherId?: string;
}

@InputType()
export class PatentRelationUpdateInput {
    @Field(() => PatentRelationTypeEnum, {nullable:true})
    type?: keyof typeof PatentRelationTypeEnum;
    @Field(() => String, {nullable:true})
    patentOtherId?: string;
    @Field(() => PatentUpdateOneRequiredWithoutRelationsNestedInput, {nullable:true})
    patentMain?: InstanceType<typeof PatentUpdateOneRequiredWithoutRelationsNestedInput>;
}

@InputType()
export class PatentRelationUpsertWithWhereUniqueWithoutPatentMainInput {
    @Field(() => PatentRelationWhereUniqueInput, {nullable:false})
    @Type(() => PatentRelationWhereUniqueInput)
    where!: Prisma.AtLeast<PatentRelationWhereUniqueInput, 'type_patentMainId_patentOtherId'>;
    @Field(() => PatentRelationUpdateWithoutPatentMainInput, {nullable:false})
    @Type(() => PatentRelationUpdateWithoutPatentMainInput)
    update!: InstanceType<typeof PatentRelationUpdateWithoutPatentMainInput>;
    @Field(() => PatentRelationCreateWithoutPatentMainInput, {nullable:false})
    @Type(() => PatentRelationCreateWithoutPatentMainInput)
    create!: InstanceType<typeof PatentRelationCreateWithoutPatentMainInput>;
}

@InputType()
export class PatentRelationWhereUniqueInput {
    @Field(() => PatentRelationTypePatentMainIdPatentOtherIdCompoundUniqueInput, {nullable:true})
    type_patentMainId_patentOtherId?: InstanceType<typeof PatentRelationTypePatentMainIdPatentOtherIdCompoundUniqueInput>;
    @Field(() => [PatentRelationWhereInput], {nullable:true})
    AND?: Array<PatentRelationWhereInput>;
    @Field(() => [PatentRelationWhereInput], {nullable:true})
    OR?: Array<PatentRelationWhereInput>;
    @Field(() => [PatentRelationWhereInput], {nullable:true})
    NOT?: Array<PatentRelationWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    patentMainId?: InstanceType<typeof StringFilter>;
    @Field(() => EnumPatentRelationTypeEnumFilter, {nullable:true})
    type?: InstanceType<typeof EnumPatentRelationTypeEnumFilter>;
    @Field(() => StringFilter, {nullable:true})
    patentOtherId?: InstanceType<typeof StringFilter>;
    @Field(() => PatentRelationFilter, {nullable:true})
    patentMain?: InstanceType<typeof PatentRelationFilter>;
}

@InputType()
export class PatentRelationWhereInput {
    @Field(() => [PatentRelationWhereInput], {nullable:true})
    AND?: Array<PatentRelationWhereInput>;
    @Field(() => [PatentRelationWhereInput], {nullable:true})
    OR?: Array<PatentRelationWhereInput>;
    @Field(() => [PatentRelationWhereInput], {nullable:true})
    NOT?: Array<PatentRelationWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    patentMainId?: InstanceType<typeof StringFilter>;
    @Field(() => EnumPatentRelationTypeEnumFilter, {nullable:true})
    type?: InstanceType<typeof EnumPatentRelationTypeEnumFilter>;
    @Field(() => StringFilter, {nullable:true})
    patentOtherId?: InstanceType<typeof StringFilter>;
    @Field(() => PatentRelationFilter, {nullable:true})
    patentMain?: InstanceType<typeof PatentRelationFilter>;
}

/**
 * Связь между патентами
 */
@ObjectType({description:'Связь между патентами'})
export class PatentRelation {
    /**
     * Первый патент
     */
    @Field(() => String, {nullable:false,description:'Первый патент'})
    patentMainId!: string;
    /**
     * Тип связи
     */
    @Field(() => PatentRelationTypeEnum, {nullable:false,description:'Тип связи'})
    type!: keyof typeof PatentRelationTypeEnum;
    /**
     * Второй патент (может отсутствовать в БД)
     */
    @Field(() => String, {nullable:false,description:'Второй патент (может отсутствовать в БД)'})
    patentOtherId!: string;
    /**
     * Первый патент
     */
    @Field(() => Patent, {nullable:false,description:'Первый патент'})
    patentMain?: InstanceType<typeof Patent>;
}

@ArgsType()
export class UpdateManyPatentRelationArgs {
    @Field(() => PatentRelationUpdateManyMutationInput, {nullable:false})
    @Type(() => PatentRelationUpdateManyMutationInput)
    data!: InstanceType<typeof PatentRelationUpdateManyMutationInput>;
    @Field(() => PatentRelationWhereInput, {nullable:true})
    @Type(() => PatentRelationWhereInput)
    where?: InstanceType<typeof PatentRelationWhereInput>;
}

@ArgsType()
export class UpdateOnePatentRelationArgs {
    @Field(() => PatentRelationUpdateInput, {nullable:false})
    @Type(() => PatentRelationUpdateInput)
    data!: InstanceType<typeof PatentRelationUpdateInput>;
    @Field(() => PatentRelationWhereUniqueInput, {nullable:false})
    @Type(() => PatentRelationWhereUniqueInput)
    where!: Prisma.AtLeast<PatentRelationWhereUniqueInput, 'type_patentMainId_patentOtherId'>;
}

@ArgsType()
export class UpsertOnePatentRelationArgs {
    @Field(() => PatentRelationWhereUniqueInput, {nullable:false})
    @Type(() => PatentRelationWhereUniqueInput)
    where!: Prisma.AtLeast<PatentRelationWhereUniqueInput, 'type_patentMainId_patentOtherId'>;
    @Field(() => PatentRelationCreateInput, {nullable:false})
    @Type(() => PatentRelationCreateInput)
    create!: InstanceType<typeof PatentRelationCreateInput>;
    @Field(() => PatentRelationUpdateInput, {nullable:false})
    @Type(() => PatentRelationUpdateInput)
    update!: InstanceType<typeof PatentRelationUpdateInput>;
}

@ObjectType()
export class AffectedRows {
    @Field(() => Int, {nullable:false})
    count!: number;
}

@InputType()
export class DateTimeFilter {
    @Field(() => Date, {nullable:true})
    equals?: Date | string;
    @Field(() => [Date], {nullable:true})
    in?: Array<Date> | Array<string>;
    @Field(() => [Date], {nullable:true})
    notIn?: Array<Date> | Array<string>;
    @Field(() => Date, {nullable:true})
    lt?: Date | string;
    @Field(() => Date, {nullable:true})
    lte?: Date | string;
    @Field(() => Date, {nullable:true})
    gt?: Date | string;
    @Field(() => Date, {nullable:true})
    gte?: Date | string;
    @Field(() => DateTimeFilter, {nullable:true})
    not?: InstanceType<typeof DateTimeFilter>;
}

@InputType()
export class DateTimeWithAggregatesFilter {
    @Field(() => Date, {nullable:true})
    equals?: Date | string;
    @Field(() => [Date], {nullable:true})
    in?: Array<Date> | Array<string>;
    @Field(() => [Date], {nullable:true})
    notIn?: Array<Date> | Array<string>;
    @Field(() => Date, {nullable:true})
    lt?: Date | string;
    @Field(() => Date, {nullable:true})
    lte?: Date | string;
    @Field(() => Date, {nullable:true})
    gt?: Date | string;
    @Field(() => Date, {nullable:true})
    gte?: Date | string;
    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    not?: InstanceType<typeof DateTimeWithAggregatesFilter>;
    @Field(() => IntFilter, {nullable:true})
    _count?: InstanceType<typeof IntFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    _min?: InstanceType<typeof DateTimeFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    _max?: InstanceType<typeof DateTimeFilter>;
}

@InputType()
export class EnumMonitorLogTypeEnumFilter {
    @Field(() => MonitorLogTypeEnum, {nullable:true})
    equals?: keyof typeof MonitorLogTypeEnum;
    @Field(() => [MonitorLogTypeEnum], {nullable:true})
    in?: Array<keyof typeof MonitorLogTypeEnum>;
    @Field(() => [MonitorLogTypeEnum], {nullable:true})
    notIn?: Array<keyof typeof MonitorLogTypeEnum>;
    @Field(() => EnumMonitorLogTypeEnumFilter, {nullable:true})
    not?: InstanceType<typeof EnumMonitorLogTypeEnumFilter>;
}

@InputType()
export class EnumMonitorLogTypeEnumWithAggregatesFilter {
    @Field(() => MonitorLogTypeEnum, {nullable:true})
    equals?: keyof typeof MonitorLogTypeEnum;
    @Field(() => [MonitorLogTypeEnum], {nullable:true})
    in?: Array<keyof typeof MonitorLogTypeEnum>;
    @Field(() => [MonitorLogTypeEnum], {nullable:true})
    notIn?: Array<keyof typeof MonitorLogTypeEnum>;
    @Field(() => EnumMonitorLogTypeEnumWithAggregatesFilter, {nullable:true})
    not?: InstanceType<typeof EnumMonitorLogTypeEnumWithAggregatesFilter>;
    @Field(() => IntFilter, {nullable:true})
    _count?: InstanceType<typeof IntFilter>;
    @Field(() => EnumMonitorLogTypeEnumFilter, {nullable:true})
    _min?: InstanceType<typeof EnumMonitorLogTypeEnumFilter>;
    @Field(() => EnumMonitorLogTypeEnumFilter, {nullable:true})
    _max?: InstanceType<typeof EnumMonitorLogTypeEnumFilter>;
}

@InputType()
export class EnumPatentRelationTypeEnumFilter {
    @Field(() => PatentRelationTypeEnum, {nullable:true})
    equals?: keyof typeof PatentRelationTypeEnum;
    @Field(() => [PatentRelationTypeEnum], {nullable:true})
    in?: Array<keyof typeof PatentRelationTypeEnum>;
    @Field(() => [PatentRelationTypeEnum], {nullable:true})
    notIn?: Array<keyof typeof PatentRelationTypeEnum>;
    @Field(() => EnumPatentRelationTypeEnumFilter, {nullable:true})
    not?: InstanceType<typeof EnumPatentRelationTypeEnumFilter>;
}

@InputType()
export class EnumPatentRelationTypeEnumWithAggregatesFilter {
    @Field(() => PatentRelationTypeEnum, {nullable:true})
    equals?: keyof typeof PatentRelationTypeEnum;
    @Field(() => [PatentRelationTypeEnum], {nullable:true})
    in?: Array<keyof typeof PatentRelationTypeEnum>;
    @Field(() => [PatentRelationTypeEnum], {nullable:true})
    notIn?: Array<keyof typeof PatentRelationTypeEnum>;
    @Field(() => EnumPatentRelationTypeEnumWithAggregatesFilter, {nullable:true})
    not?: InstanceType<typeof EnumPatentRelationTypeEnumWithAggregatesFilter>;
    @Field(() => IntFilter, {nullable:true})
    _count?: InstanceType<typeof IntFilter>;
    @Field(() => EnumPatentRelationTypeEnumFilter, {nullable:true})
    _min?: InstanceType<typeof EnumPatentRelationTypeEnumFilter>;
    @Field(() => EnumPatentRelationTypeEnumFilter, {nullable:true})
    _max?: InstanceType<typeof EnumPatentRelationTypeEnumFilter>;
}

@InputType()
export class FloatFilter {
    @Field(() => Float, {nullable:true})
    equals?: number;
    @Field(() => [Float], {nullable:true})
    in?: Array<number>;
    @Field(() => [Float], {nullable:true})
    notIn?: Array<number>;
    @Field(() => Float, {nullable:true})
    lt?: number;
    @Field(() => Float, {nullable:true})
    lte?: number;
    @Field(() => Float, {nullable:true})
    gt?: number;
    @Field(() => Float, {nullable:true})
    gte?: number;
    @Field(() => FloatFilter, {nullable:true})
    not?: InstanceType<typeof FloatFilter>;
}

@InputType()
export class FloatWithAggregatesFilter {
    @Field(() => Float, {nullable:true})
    equals?: number;
    @Field(() => [Float], {nullable:true})
    in?: Array<number>;
    @Field(() => [Float], {nullable:true})
    notIn?: Array<number>;
    @Field(() => Float, {nullable:true})
    lt?: number;
    @Field(() => Float, {nullable:true})
    lte?: number;
    @Field(() => Float, {nullable:true})
    gt?: number;
    @Field(() => Float, {nullable:true})
    gte?: number;
    @Field(() => FloatWithAggregatesFilter, {nullable:true})
    not?: InstanceType<typeof FloatWithAggregatesFilter>;
    @Field(() => IntFilter, {nullable:true})
    _count?: InstanceType<typeof IntFilter>;
    @Field(() => FloatFilter, {nullable:true})
    _avg?: InstanceType<typeof FloatFilter>;
    @Field(() => FloatFilter, {nullable:true})
    _sum?: InstanceType<typeof FloatFilter>;
    @Field(() => FloatFilter, {nullable:true})
    _min?: InstanceType<typeof FloatFilter>;
    @Field(() => FloatFilter, {nullable:true})
    _max?: InstanceType<typeof FloatFilter>;
}

@InputType()
export class IntFilter {
    @Field(() => Int, {nullable:true})
    equals?: number;
    @Field(() => [Int], {nullable:true})
    in?: Array<number>;
    @Field(() => [Int], {nullable:true})
    notIn?: Array<number>;
    @Field(() => Int, {nullable:true})
    lt?: number;
    @Field(() => Int, {nullable:true})
    lte?: number;
    @Field(() => Int, {nullable:true})
    gt?: number;
    @Field(() => Int, {nullable:true})
    gte?: number;
    @Field(() => IntFilter, {nullable:true})
    not?: InstanceType<typeof IntFilter>;
}

@InputType()
export class IntWithAggregatesFilter {
    @Field(() => Int, {nullable:true})
    equals?: number;
    @Field(() => [Int], {nullable:true})
    in?: Array<number>;
    @Field(() => [Int], {nullable:true})
    notIn?: Array<number>;
    @Field(() => Int, {nullable:true})
    lt?: number;
    @Field(() => Int, {nullable:true})
    lte?: number;
    @Field(() => Int, {nullable:true})
    gt?: number;
    @Field(() => Int, {nullable:true})
    gte?: number;
    @Field(() => IntWithAggregatesFilter, {nullable:true})
    not?: InstanceType<typeof IntWithAggregatesFilter>;
    @Field(() => IntFilter, {nullable:true})
    _count?: InstanceType<typeof IntFilter>;
    @Field(() => FloatFilter, {nullable:true})
    _avg?: InstanceType<typeof FloatFilter>;
    @Field(() => IntFilter, {nullable:true})
    _sum?: InstanceType<typeof IntFilter>;
    @Field(() => IntFilter, {nullable:true})
    _min?: InstanceType<typeof IntFilter>;
    @Field(() => IntFilter, {nullable:true})
    _max?: InstanceType<typeof IntFilter>;
}

@InputType()
export class JsonFilter {
    @Field(() => GraphQLJSON, {nullable:true})
    equals?: any;
    @Field(() => [String], {nullable:true})
    path?: Array<string>;
    @Field(() => String, {nullable:true})
    string_contains?: string;
    @Field(() => String, {nullable:true})
    string_starts_with?: string;
    @Field(() => String, {nullable:true})
    string_ends_with?: string;
    @Field(() => GraphQLJSON, {nullable:true})
    array_contains?: any;
    @Field(() => GraphQLJSON, {nullable:true})
    array_starts_with?: any;
    @Field(() => GraphQLJSON, {nullable:true})
    array_ends_with?: any;
    @Field(() => GraphQLJSON, {nullable:true})
    lt?: any;
    @Field(() => GraphQLJSON, {nullable:true})
    lte?: any;
    @Field(() => GraphQLJSON, {nullable:true})
    gt?: any;
    @Field(() => GraphQLJSON, {nullable:true})
    gte?: any;
    @Field(() => GraphQLJSON, {nullable:true})
    not?: any;
}

@InputType()
export class JsonWithAggregatesFilter {
    @Field(() => GraphQLJSON, {nullable:true})
    equals?: any;
    @Field(() => [String], {nullable:true})
    path?: Array<string>;
    @Field(() => String, {nullable:true})
    string_contains?: string;
    @Field(() => String, {nullable:true})
    string_starts_with?: string;
    @Field(() => String, {nullable:true})
    string_ends_with?: string;
    @Field(() => GraphQLJSON, {nullable:true})
    array_contains?: any;
    @Field(() => GraphQLJSON, {nullable:true})
    array_starts_with?: any;
    @Field(() => GraphQLJSON, {nullable:true})
    array_ends_with?: any;
    @Field(() => GraphQLJSON, {nullable:true})
    lt?: any;
    @Field(() => GraphQLJSON, {nullable:true})
    lte?: any;
    @Field(() => GraphQLJSON, {nullable:true})
    gt?: any;
    @Field(() => GraphQLJSON, {nullable:true})
    gte?: any;
    @Field(() => GraphQLJSON, {nullable:true})
    not?: any;
    @Field(() => IntFilter, {nullable:true})
    _count?: InstanceType<typeof IntFilter>;
    @Field(() => JsonFilter, {nullable:true})
    _min?: InstanceType<typeof JsonFilter>;
    @Field(() => JsonFilter, {nullable:true})
    _max?: InstanceType<typeof JsonFilter>;
}

@InputType()
export class SortOrderInput {
    @Field(() => SortOrder, {nullable:false})
    sort!: keyof typeof SortOrder;
    @Field(() => NullsOrder, {nullable:true})
    nulls?: keyof typeof NullsOrder;
}

@InputType()
export class StringFilter {
    @Field(() => String, {nullable:true})
    equals?: string;
    @Field(() => [String], {nullable:true})
    in?: Array<string>;
    @Field(() => [String], {nullable:true})
    notIn?: Array<string>;
    @Field(() => String, {nullable:true})
    lt?: string;
    @Field(() => String, {nullable:true})
    lte?: string;
    @Field(() => String, {nullable:true})
    gt?: string;
    @Field(() => String, {nullable:true})
    gte?: string;
    @Field(() => String, {nullable:true})
    contains?: string;
    @Field(() => String, {nullable:true})
    startsWith?: string;
    @Field(() => String, {nullable:true})
    endsWith?: string;
    @Field(() => QueryMode, {nullable:true})
    mode?: keyof typeof QueryMode;
    @Field(() => StringFilter, {nullable:true})
    not?: InstanceType<typeof StringFilter>;
}

@InputType()
export class StringListFilter {
    @Field(() => [String], {nullable:true})
    equals?: Array<string>;
    @Field(() => String, {nullable:true})
    has?: string;
    @Field(() => [String], {nullable:true})
    hasEvery?: Array<string>;
    @Field(() => [String], {nullable:true})
    hasSome?: Array<string>;
    @Field(() => Boolean, {nullable:true})
    isEmpty?: boolean;
}

@InputType()
export class StringWithAggregatesFilter {
    @Field(() => String, {nullable:true})
    equals?: string;
    @Field(() => [String], {nullable:true})
    in?: Array<string>;
    @Field(() => [String], {nullable:true})
    notIn?: Array<string>;
    @Field(() => String, {nullable:true})
    lt?: string;
    @Field(() => String, {nullable:true})
    lte?: string;
    @Field(() => String, {nullable:true})
    gt?: string;
    @Field(() => String, {nullable:true})
    gte?: string;
    @Field(() => String, {nullable:true})
    contains?: string;
    @Field(() => String, {nullable:true})
    startsWith?: string;
    @Field(() => String, {nullable:true})
    endsWith?: string;
    @Field(() => QueryMode, {nullable:true})
    mode?: keyof typeof QueryMode;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    not?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => IntFilter, {nullable:true})
    _count?: InstanceType<typeof IntFilter>;
    @Field(() => StringFilter, {nullable:true})
    _min?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    _max?: InstanceType<typeof StringFilter>;
}
