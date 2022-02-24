/// <reference path="../../adonis-typings/querybuilder.d.ts" />
/// <reference types="@adonisjs/lucid" />
/// <reference types="@adonisjs/lucid/build/adonis-typings/model" />
/// <reference types="@adonisjs/lucid/build/adonis-typings/orm" />
/// <reference types="@adonisjs/lucid/build/adonis-typings/relations" />
import { DateTime } from 'luxon';
import { NormalizeConstructor } from '@ioc:Adonis/Core/Helpers';
import { LucidModel, ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm';
import { QueryClientContract } from '@ioc:Adonis/Lucid/Database';
export declare function SoftDeletes<T extends NormalizeConstructor<LucidModel>>(superclass: T): {
    new (...args: any[]): {
        /**
         * Force delete instance property
         */
        $forceDelete: boolean;
        /**
         * Soft deleted property
         */
        deletedAt: DateTime | null;
        /**
         * Computed trashed property
         */
        readonly trashed: boolean;
        /**
         * Override default $getQueryFor method
         */
        $getQueryFor(action: 'insert' | 'update' | 'delete' | 'refresh', client: QueryClientContract): any;
        /**
         * Override default delete method
         */
        delete(): Promise<void>;
        /**
         * Restore model
         */
        restore(): Promise<any>;
        /**
         * Force delete model
         */
        forceDelete(): Promise<void>;
        $attributes: import("@ioc:Adonis/Lucid/Orm").ModelObject;
        $extras: import("@ioc:Adonis/Lucid/Orm").ModelObject;
        $original: import("@ioc:Adonis/Lucid/Orm").ModelObject;
        $preloaded: {
            [relation: string]: import("@ioc:Adonis/Lucid/Orm").LucidRow | import("@ioc:Adonis/Lucid/Orm").LucidRow[];
        };
        $columns: undefined;
        $sideloaded: import("@ioc:Adonis/Lucid/Orm").ModelObject;
        $primaryKeyValue?: string | number | undefined;
        $isPersisted: boolean;
        $isNew: boolean;
        $isLocal: boolean;
        $dirty: import("@ioc:Adonis/Lucid/Orm").ModelObject;
        $isDirty: boolean;
        $isDeleted: boolean;
        $options?: import("@ioc:Adonis/Lucid/Orm").ModelOptions | undefined;
        $trx?: import("@ioc:Adonis/Lucid/Database").TransactionClientContract | undefined;
        $setOptionsAndTrx(options?: import("@ioc:Adonis/Lucid/Orm").ModelAdapterOptions | undefined): void;
        useTransaction(trx: import("@ioc:Adonis/Lucid/Database").TransactionClientContract): any;
        useConnection(connection: string): any;
        $setAttribute(key: string, value: any): void;
        $getAttribute(key: string): any;
        $getAttributeFromCache(key: string, callback: (value: any) => any): any;
        $hasRelated(key: string): boolean;
        $setRelated(key: string, result: import("@ioc:Adonis/Lucid/Database").OneOrMany<import("@ioc:Adonis/Lucid/Orm").LucidRow> | null): void;
        $pushRelated(key: string, result: import("@ioc:Adonis/Lucid/Database").OneOrMany<import("@ioc:Adonis/Lucid/Orm").LucidRow> | null): void;
        $getRelated(key: string, defaultValue?: any): import("@ioc:Adonis/Lucid/Database").OneOrMany<import("@ioc:Adonis/Lucid/Orm").LucidRow> | null | undefined;
        $consumeAdapterResult(adapterResult: import("@ioc:Adonis/Lucid/Orm").ModelObject, sideloadAttributes?: import("@ioc:Adonis/Lucid/Orm").ModelObject | undefined): void;
        $hydrateOriginals(): void;
        fill(value: Partial<{
            $forceDelete: boolean;
            deletedAt: DateTime | null;
            trashed: boolean;
        }>, allowExtraProperties?: boolean | undefined): any;
        merge(value: Partial<{
            $forceDelete: boolean;
            deletedAt: DateTime | null;
            trashed: boolean;
        }>, allowExtraProperties?: boolean | undefined): any;
        save(): Promise<any>;
        refresh(): Promise<any>;
        load: import("@ioc:Adonis/Lucid/Orm").LucidRowPreload<any>;
        preload: import("@ioc:Adonis/Lucid/Orm").LucidRowPreload<any>;
        loadAggregate: <Self extends any, Name extends import("@ioc:Adonis/Lucid/Orm").ExtractModelRelations<Self>, RelatedBuilder = Self[Name] extends import("@ioc:Adonis/Lucid/Orm").ModelRelations ? Self[Name]["subQuery"] : never>(name: Name, callback: (builder: RelatedBuilder) => void) => import("@ioc:Adonis/Lucid/Orm").LazyLoadAggregatesContract<Self>;
        loadCount: <Self_1 extends any, Name_1 extends import("@ioc:Adonis/Lucid/Orm").ExtractModelRelations<Self_1>, RelatedBuilder_1 = Self_1[Name_1] extends import("@ioc:Adonis/Lucid/Orm").ModelRelations ? Self_1[Name_1]["subQuery"] : never>(name: Name_1, callback?: ((builder: RelatedBuilder_1) => void) | undefined) => import("@ioc:Adonis/Lucid/Orm").LazyLoadAggregatesContract<Self_1>;
        serializeAttributes(fields?: import("@ioc:Adonis/Lucid/Orm").CherryPickFields | undefined, raw?: boolean | undefined): import("@ioc:Adonis/Lucid/Orm").ModelObject;
        serializeComputed(fields?: import("@ioc:Adonis/Lucid/Orm").CherryPickFields | undefined): import("@ioc:Adonis/Lucid/Orm").ModelObject;
        serializeRelations(fields: undefined, raw: true): {
            [key: string]: import("@ioc:Adonis/Lucid/Orm").LucidRow | import("@ioc:Adonis/Lucid/Orm").LucidRow[];
        };
        serializeRelations(cherryPick: {
            [relation: string]: import("@ioc:Adonis/Lucid/Orm").CherryPick;
        } | undefined, raw: false | undefined): import("@ioc:Adonis/Lucid/Orm").ModelObject;
        serializeRelations(cherryPick?: {
            [relation: string]: import("@ioc:Adonis/Lucid/Orm").CherryPick;
        } | undefined, raw?: boolean | undefined): import("@ioc:Adonis/Lucid/Orm").ModelObject;
        serialize(cherryPick?: import("@ioc:Adonis/Lucid/Orm").CherryPick | undefined): import("@ioc:Adonis/Lucid/Orm").ModelObject;
        toObject(): import("@ioc:Adonis/Lucid/Orm").ModelObject;
        toJSON(): import("@ioc:Adonis/Lucid/Orm").ModelObject;
        related<Name_2 extends undefined>(relation: Name_2): any[Name_2] extends import("@ioc:Adonis/Lucid/Orm").ModelRelations ? any[Name_2]["client"] : never;
    };
    ignoreDeleted(query: ModelQueryBuilderContract<T, InstanceType<T>>): void;
    ignoreDeletedPaginate([countQuery, query]: [any, any]): void;
    disableIgnore<Model extends any & T>(query: ModelQueryBuilderContract<Model, InstanceType<Model>>): ModelQueryBuilderContract<Model, InstanceType<Model>>;
    /**
     * Fetch all models without filter by deleted_at
     */
    withTrashed<Model_1 extends any & T>(this: Model_1): ModelQueryBuilderContract<T, InstanceType<T>>;
    /**
     * Fetch models only with deleted_at
     */
    onlyTrashed<Model_2 extends any & T>(this: Model_2): ModelQueryBuilderContract<Model_2, InstanceType<Model_2>>;
    readonly booted: boolean;
    $columnsDefinitions: Map<string, import("@ioc:Adonis/Lucid/Orm").ModelColumnOptions>;
    $relationsDefinitions: Map<string, import("@ioc:Adonis/Lucid/Orm").RelationshipsContract>;
    $computedDefinitions: Map<string, import("@ioc:Adonis/Lucid/Orm").ComputedOptions>;
    primaryKey: string;
    connection?: string | undefined;
    namingStrategy: import("@ioc:Adonis/Lucid/Orm").NamingStrategyContract;
    table: string;
    selfAssignPrimaryKey: boolean;
    $adapter: import("@ioc:Adonis/Lucid/Orm").AdapterContract;
    $hooks: import("@poppinss/hooks").Hooks;
    $keys: {
        attributesToColumns: import("@ioc:Adonis/Lucid/Orm").ModelKeysContract;
        attributesToSerialized: import("@ioc:Adonis/Lucid/Orm").ModelKeysContract;
        columnsToAttributes: import("@ioc:Adonis/Lucid/Orm").ModelKeysContract;
        columnsToSerialized: import("@ioc:Adonis/Lucid/Orm").ModelKeysContract;
        serializedToColumns: import("@ioc:Adonis/Lucid/Orm").ModelKeysContract;
        serializedToAttributes: import("@ioc:Adonis/Lucid/Orm").ModelKeysContract;
    };
    $createFromAdapterResult: <T_1 extends LucidModel>(this: T_1, result?: import("@ioc:Adonis/Lucid/Orm").ModelObject | undefined, sideloadAttributes?: import("@ioc:Adonis/Lucid/Orm").ModelObject | undefined, options?: import("@ioc:Adonis/Lucid/Orm").ModelAdapterOptions | undefined) => InstanceType<T_1> | null;
    $createMultipleFromAdapterResult: <T_2 extends LucidModel>(this: T_2, results: import("@ioc:Adonis/Lucid/Orm").ModelObject[], sideloadAttributes?: import("@ioc:Adonis/Lucid/Orm").ModelObject | undefined, options?: import("@ioc:Adonis/Lucid/Orm").ModelAdapterOptions | undefined) => InstanceType<T_2>[];
    $addColumn: (name: string, options: Partial<import("@ioc:Adonis/Lucid/Orm").ColumnOptions>) => import("@ioc:Adonis/Lucid/Orm").ColumnOptions;
    $hasColumn: (name: string) => boolean;
    $getColumn: (name: string) => import("@ioc:Adonis/Lucid/Orm").ModelColumnOptions | undefined;
    $addComputed: (name: string, options: Partial<import("@ioc:Adonis/Lucid/Orm").ComputedOptions>) => import("@ioc:Adonis/Lucid/Orm").ComputedOptions;
    $hasComputed: (name: string) => boolean;
    $getComputed: (name: string) => import("@ioc:Adonis/Lucid/Orm").ComputedOptions | undefined;
    $addRelation: (name: string, type: "hasOne" | "hasMany" | "belongsTo" | "manyToMany" | "hasManyThrough", relatedModel: () => LucidModel, options: import("@ioc:Adonis/Lucid/Orm").ModelRelationOptions) => void;
    $hasRelation: (name: string) => boolean;
    $getRelation: {
        <Model_3 extends LucidModel, Name_3 extends import("@ioc:Adonis/Lucid/Orm").ExtractModelRelations<InstanceType<Model_3>>>(this: Model_3, name: Name_3): InstanceType<Model_3>[Name_3] extends import("@ioc:Adonis/Lucid/Orm").ModelRelations ? InstanceType<Model_3>[Name_3]["client"]["relation"] : import("@ioc:Adonis/Lucid/Orm").RelationshipsContract;
        <Model_4 extends LucidModel>(this: Model_4, name: string): import("@ioc:Adonis/Lucid/Orm").RelationshipsContract;
    };
    $defineProperty: <Model_5 extends LucidModel, Prop extends keyof Model_5>(this: Model_5, propertyName: Prop, defaultValue: Model_5[Prop], strategy: "inherit" | "define" | ((value: Model_5[Prop]) => Model_5[Prop])) => void;
    boot: () => void;
    before: {
        <Model_6 extends LucidModel, Event extends "find" | "fetch">(this: Model_6, event: Event, handler: import("@ioc:Adonis/Lucid/Orm").HooksHandler<ModelQueryBuilderContract<Model_6, InstanceType<Model_6>>, Event>): void;
        <Model_7 extends LucidModel>(this: Model_7, event: "paginate", handler: import("@ioc:Adonis/Lucid/Orm").HooksHandler<[ModelQueryBuilderContract<Model_7, InstanceType<Model_7>>, ModelQueryBuilderContract<Model_7, InstanceType<Model_7>>], "paginate">): void;
        <Model_8 extends LucidModel, Event_1 extends import("@ioc:Adonis/Lucid/Orm").EventsList>(this: Model_8, event: Event_1, handler: import("@ioc:Adonis/Lucid/Orm").HooksHandler<InstanceType<Model_8>, Event_1>): void;
    };
    after: {
        <Model_9 extends LucidModel>(this: Model_9, event: "fetch", handler: import("@ioc:Adonis/Lucid/Orm").HooksHandler<InstanceType<Model_9>[], "fetch">): void;
        <Model_10 extends LucidModel>(this: Model_10, event: "paginate", handler: import("@ioc:Adonis/Lucid/Orm").HooksHandler<import("@ioc:Adonis/Lucid/Orm").ModelPaginatorContract<InstanceType<Model_10>>, "paginate">): void;
        <Model_11 extends LucidModel, Event_2 extends import("@ioc:Adonis/Lucid/Orm").EventsList>(this: Model_11, event: Event_2, handler: import("@ioc:Adonis/Lucid/Orm").HooksHandler<InstanceType<Model_11>, Event_2>): void;
    };
    create: <T_3 extends LucidModel>(this: T_3, values: Partial<import("@ioc:Adonis/Lucid/Orm").ModelAttributes<InstanceType<T_3>>>, options?: import("@ioc:Adonis/Lucid/Orm").ModelAssignOptions | undefined) => Promise<InstanceType<T_3>>;
    createMany: <T_4 extends LucidModel>(this: T_4, values: Partial<import("@ioc:Adonis/Lucid/Orm").ModelAttributes<InstanceType<T_4>>>[], options?: import("@ioc:Adonis/Lucid/Orm").ModelAssignOptions | undefined) => Promise<InstanceType<T_4>[]>;
    find: <T_5 extends LucidModel>(this: T_5, value: any, options?: import("@ioc:Adonis/Lucid/Orm").ModelAdapterOptions | undefined) => Promise<InstanceType<T_5> | null>;
    findOrFail: <T_6 extends LucidModel>(this: T_6, value: any, options?: import("@ioc:Adonis/Lucid/Orm").ModelAdapterOptions | undefined) => Promise<InstanceType<T_6>>;
    findBy: <T_7 extends LucidModel>(this: T_7, key: string, value: any, options?: import("@ioc:Adonis/Lucid/Orm").ModelAdapterOptions | undefined) => Promise<InstanceType<T_7> | null>;
    findByOrFail: <T_8 extends LucidModel>(this: T_8, key: string, value: any, options?: import("@ioc:Adonis/Lucid/Orm").ModelAdapterOptions | undefined) => Promise<InstanceType<T_8>>;
    first: <T_9 extends LucidModel>(this: T_9, options?: import("@ioc:Adonis/Lucid/Orm").ModelAdapterOptions | undefined) => Promise<InstanceType<T_9> | null>;
    firstOrFail: <T_10 extends LucidModel>(this: T_10, options?: import("@ioc:Adonis/Lucid/Orm").ModelAdapterOptions | undefined) => Promise<InstanceType<T_10>>;
    findMany: <T_11 extends LucidModel>(this: T_11, value: any[], options?: import("@ioc:Adonis/Lucid/Orm").ModelAdapterOptions | undefined) => Promise<InstanceType<T_11>[]>;
    firstOrNew: <T_12 extends LucidModel>(this: T_12, searchPayload: Partial<import("@ioc:Adonis/Lucid/Orm").ModelAttributes<InstanceType<T_12>>>, savePayload?: Partial<import("@ioc:Adonis/Lucid/Orm").ModelAttributes<InstanceType<T_12>>> | undefined, options?: import("@ioc:Adonis/Lucid/Orm").ModelAssignOptions | undefined) => Promise<InstanceType<T_12>>;
    firstOrCreate: <T_13 extends LucidModel>(this: T_13, searchPayload: Partial<import("@ioc:Adonis/Lucid/Orm").ModelAttributes<InstanceType<T_13>>>, savePayload?: Partial<import("@ioc:Adonis/Lucid/Orm").ModelAttributes<InstanceType<T_13>>> | undefined, options?: import("@ioc:Adonis/Lucid/Orm").ModelAssignOptions | undefined) => Promise<InstanceType<T_13>>;
    updateOrCreate: <T_14 extends LucidModel>(this: T_14, searchPayload: Partial<import("@ioc:Adonis/Lucid/Orm").ModelAttributes<InstanceType<T_14>>>, updatePayload: Partial<import("@ioc:Adonis/Lucid/Orm").ModelAttributes<InstanceType<T_14>>>, options?: import("@ioc:Adonis/Lucid/Orm").ModelAssignOptions | undefined) => Promise<InstanceType<T_14>>;
    fetchOrNewUpMany: <T_15 extends LucidModel>(this: T_15, predicate: keyof import("@ioc:Adonis/Lucid/Orm").ModelAttributes<InstanceType<T_15>> | (keyof import("@ioc:Adonis/Lucid/Orm").ModelAttributes<InstanceType<T_15>>)[], payload: Partial<import("@ioc:Adonis/Lucid/Orm").ModelAttributes<InstanceType<T_15>>>[], options?: import("@ioc:Adonis/Lucid/Orm").ModelAssignOptions | undefined) => Promise<InstanceType<T_15>[]>;
    fetchOrCreateMany: <T_16 extends LucidModel>(this: T_16, predicate: keyof import("@ioc:Adonis/Lucid/Orm").ModelAttributes<InstanceType<T_16>> | (keyof import("@ioc:Adonis/Lucid/Orm").ModelAttributes<InstanceType<T_16>>)[], payload: Partial<import("@ioc:Adonis/Lucid/Orm").ModelAttributes<InstanceType<T_16>>>[], options?: import("@ioc:Adonis/Lucid/Orm").ModelAssignOptions | undefined) => Promise<InstanceType<T_16>[]>;
    updateOrCreateMany: <T_17 extends LucidModel>(this: T_17, predicate: keyof import("@ioc:Adonis/Lucid/Orm").ModelAttributes<InstanceType<T_17>> | (keyof import("@ioc:Adonis/Lucid/Orm").ModelAttributes<InstanceType<T_17>>)[], payload: Partial<import("@ioc:Adonis/Lucid/Orm").ModelAttributes<InstanceType<T_17>>>[], options?: import("@ioc:Adonis/Lucid/Orm").ModelAssignOptions | undefined) => Promise<InstanceType<T_17>[]>;
    all: <T_18 extends LucidModel>(this: T_18, options?: import("@ioc:Adonis/Lucid/Orm").ModelAdapterOptions | undefined) => Promise<InstanceType<T_18>[]>;
    query: <Model_12 extends LucidModel, Result = InstanceType<Model_12>>(this: Model_12, options?: import("@ioc:Adonis/Lucid/Orm").ModelAdapterOptions | undefined) => ModelQueryBuilderContract<Model_12, Result>;
    truncate: (cascade?: boolean | undefined) => Promise<void>;
} & T;
