/// <reference types="@adonisjs/lucid" />
declare module '@ioc:Adonis/Lucid/Orm' {
    type ModelWithSoftDeletes = LucidModel & {
        ignoreDeleted(): void;
        ignoreDeletedPaginate(): void;
    };
    type ExcludeTypeMethods<Type, Model> = {
        [Method in keyof Type as (Model extends ModelWithSoftDeletes ? Method : never)]: Type[Method];
    };
    interface SoftDeletesMethods<Model extends LucidModel, Result = InstanceType<Model>> {
        withTrashed(): ModelQueryBuilderContract<Model, Result>;
        onlyTrashed(trashed: boolean): ModelQueryBuilderContract<Model, Result>;
        restore(): Promise<void>;
    }
    interface ModelQueryBuilderContract<Model extends LucidModel, Result = InstanceType<Model>> extends ExcludeTypeMethods<SoftDeletesMethods<Model, Result>, Model> {
    }
}
