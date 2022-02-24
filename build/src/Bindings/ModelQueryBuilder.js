"use strict";
/*
 * adonis-lucid-soft-deletes
 *
 * (c) Lookin Anton <lookin@lookinlab.ru>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.extendModelQueryBuilder = void 0;
const utils_1 = require("@poppinss/utils");
/**
 * Raises exception when model not with soft delete
 */
function ensureModelWithSoftDeletes(model) {
    if (!('ignoreDeleted' in model && 'ignoreDeletedPaginate' in model)) {
        throw new utils_1.Exception(`${model.name} model don't support Soft Deletes`, 500, 'E_MODEL_SOFT_DELETE');
    }
}
/**
 * Define SoftDeletes binding to ModelQueryBuilder
 */
function extendModelQueryBuilder(builder) {
    builder.macro('restore', async function () {
        ensureModelWithSoftDeletes(this.model);
        await this.update({ deleted_at: null });
    });
    builder.macro('withTrashed', function () {
        ensureModelWithSoftDeletes(this.model);
        return this.model.disableIgnore(this);
    });
    builder.macro('onlyTrashed', function (trashed) {
        ensureModelWithSoftDeletes(this.model);
        if (trashed) {
            return this.model.disableIgnore(this).whereNotNull(`${this.model.table}.deleted_at`);
        }
        return this.model.disableIgnore(this).whereNull(`${this.model.table}.deleted_at`);
    });
}
exports.extendModelQueryBuilder = extendModelQueryBuilder;
