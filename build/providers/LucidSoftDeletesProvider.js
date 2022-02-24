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
/**
 * Provider to register lucid soft deletes
 */
class LucidSoftDeletesProvider {
    constructor(app) {
        this.app = app;
    }
    register() {
        this.app.container.singleton('Adonis/Addons/LucidSoftDeletes', () => {
            return require('../src/SoftDeletes');
        });
    }
    boot() {
        this.app.container.withBindings(['Adonis/Lucid/Database'], ({ ModelQueryBuilder }) => {
            const { extendModelQueryBuilder } = require('../src/Bindings/ModelQueryBuilder');
            extendModelQueryBuilder(ModelQueryBuilder);
        });
    }
}
exports.default = LucidSoftDeletesProvider;
LucidSoftDeletesProvider.needsApplication = true;
