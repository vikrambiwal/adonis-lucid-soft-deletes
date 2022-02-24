"use strict";
/*
 * adonis-lucid-soft-deletes
 *
 * (c) Lookin Anton <lookin@lookinlab.ru>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoftDeletes = void 0;
const luxon_1 = require("luxon");
const utils_1 = require("@poppinss/utils");
const Decorators_1 = require("@adonisjs/lucid/build/src/Orm/Decorators");
function SoftDeletes(superclass) {
    class ModelWithSoftDeletes extends superclass {
        constructor() {
            super(...arguments);
            /**
             * Force delete instance property
             */
            this.$forceDelete = false;
        }
        static ignoreDeleted(query) {
            if (query['ignoreDeleted'] === false) {
                return;
            }
            query.whereNull(`${query.model.table}.deleted_at`);
        }
        static ignoreDeletedPaginate([countQuery, query]) {
            countQuery['ignoreDeleted'] = query['ignoreDeleted'];
            this.ignoreDeleted(countQuery);
        }
        static disableIgnore(query) {
            if (query['ignoreDeleted'] === false) {
                return query;
            }
            query['ignoreDeleted'] = false;
            return query;
        }
        /**
         * Fetch all models without filter by deleted_at
         */
        static withTrashed() {
            return this.disableIgnore(this.query());
        }
        /**
         * Fetch models only with deleted_at
         */
        static onlyTrashed() {
            const query = this.query();
            return this.disableIgnore(query).whereNotNull(`${query.model.table}.deleted_at`);
        }
        /**
         * Computed trashed property
         */
        get trashed() {
            return this.deletedAt !== null;
        }
        /**
         * Override default $getQueryFor method
         */
        $getQueryFor(action, client) {
            /**
             * Soft Delete
             */
            const softDelete = async () => {
                this.deletedAt = luxon_1.DateTime.local();
                await this.save();
            };
            if (action === 'delete' && !this.$forceDelete) {
                return { del: softDelete, delete: softDelete };
            }
            if (action === 'insert') {
                return super.$getQueryFor(action, client);
            }
            return super.$getQueryFor(action, client);
        }
        /**
         * Override default delete method
         */
        async delete() {
            await super.delete();
            this.$isDeleted = this.$forceDelete;
        }
        /**
         * Restore model
         */
        async restore() {
            if (this.$isDeleted) {
                throw new utils_1.Exception('Cannot restore a model instance is was force deleted', 500, 'E_MODEL_FORCE_DELETED');
            }
            if (!this.trashed) {
                return this;
            }
            this.deletedAt = null;
            await this.save();
            return this;
        }
        /**
         * Force delete model
         */
        async forceDelete() {
            this.$forceDelete = true;
            await this.delete();
        }
    }
    __decorate([
        Decorators_1.column.dateTime(),
        __metadata("design:type", Object)
    ], ModelWithSoftDeletes.prototype, "deletedAt", void 0);
    __decorate([
        (0, Decorators_1.beforeFind)(),
        (0, Decorators_1.beforeFetch)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ModelWithSoftDeletes, "ignoreDeleted", null);
    __decorate([
        (0, Decorators_1.beforePaginate)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ModelWithSoftDeletes, "ignoreDeletedPaginate", null);
    return ModelWithSoftDeletes;
}
exports.SoftDeletes = SoftDeletes;
