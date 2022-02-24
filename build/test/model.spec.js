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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const japa_1 = __importDefault(require("japa"));
const test_helpers_1 = require("../test-helpers");
const QueryBuilder_1 = require("@adonisjs/lucid/build/src/Orm/QueryBuilder");
const Decorators_1 = require("@adonisjs/lucid/build/src/Orm/Decorators");
const Helpers_1 = require("@poppinss/utils/build/src/Helpers");
const SoftDeletes_1 = require("../src/SoftDeletes");
japa_1.default.group('BaseModelWithSoftDeletes', (group) => {
    let app;
    let BaseModel;
    group.before(async () => {
        app = await (0, test_helpers_1.setupApplication)();
        BaseModel = (0, test_helpers_1.getBaseModel)(app);
        await (0, test_helpers_1.setup)();
    });
    group.after(async () => (0, test_helpers_1.cleanup)());
    (0, japa_1.default)('exists methods `withTrashed` and `onlyTrashed`', (assert) => {
        class TestModel extends (0, Helpers_1.compose)(BaseModel, SoftDeletes_1.SoftDeletes) {
        }
        TestModel.boot();
        assert.isFunction(TestModel.withTrashed);
        assert.isFunction(TestModel.onlyTrashed);
        assert.instanceOf(TestModel.withTrashed(), QueryBuilder_1.ModelQueryBuilder);
        assert.instanceOf(TestModel.onlyTrashed(), QueryBuilder_1.ModelQueryBuilder);
    });
    (0, japa_1.default)('not exists methods `withTrashed` and `onlyTrashed` of model without SoftDeletes', (assert) => {
        class TestModel extends BaseModel {
        }
        TestModel.boot();
        assert.notProperty(TestModel, 'withTrashed');
        assert.notProperty(TestModel, 'onlyTrashed');
    });
    (0, japa_1.default)('exists methods `restore` and `forceDelete` of model instance', (assert) => {
        class TestModel extends (0, Helpers_1.compose)(BaseModel, SoftDeletes_1.SoftDeletes) {
        }
        TestModel.boot();
        const model = new TestModel();
        assert.property(model, 'restore');
        assert.property(model, 'forceDelete');
        assert.isFunction(model.restore);
        assert.isFunction(model.forceDelete);
    });
    (0, japa_1.default)('exists `deletedAt` of model', (assert) => {
        class TestModel extends (0, Helpers_1.compose)(BaseModel, SoftDeletes_1.SoftDeletes) {
        }
        TestModel.boot();
        assert.equal(TestModel.$hasColumn('deletedAt'), true);
    });
    (0, japa_1.default)('correct name and table name of model', (assert) => {
        class User extends (0, Helpers_1.compose)(BaseModel, SoftDeletes_1.SoftDeletes) {
        }
        User.boot();
        class Industry extends (0, Helpers_1.compose)(BaseModel, SoftDeletes_1.SoftDeletes) {
        }
        Industry.boot();
        assert.equal(User.table, 'users');
        assert.equal(User.name, 'User');
        assert.equal(Industry.table, 'industries');
        assert.equal(Industry.name, 'Industry');
    });
    (0, japa_1.default)('querying models without trashed models', async (assert) => {
        class User extends (0, Helpers_1.compose)(BaseModel, SoftDeletes_1.SoftDeletes) {
        }
        __decorate([
            (0, Decorators_1.column)({ isPrimary: true }),
            __metadata("design:type", Number)
        ], User.prototype, "id", void 0);
        __decorate([
            (0, Decorators_1.column)(),
            __metadata("design:type", String)
        ], User.prototype, "username", void 0);
        __decorate([
            (0, Decorators_1.column)(),
            __metadata("design:type", String)
        ], User.prototype, "email", void 0);
        __decorate([
            (0, Decorators_1.column)(),
            __metadata("design:type", Number)
        ], User.prototype, "isAdmin", void 0);
        __decorate([
            (0, Decorators_1.column)(),
            __metadata("design:type", Number)
        ], User.prototype, "companyId", void 0);
        User.boot();
        const user1 = new User();
        user1.fill({ username: 'Tony', email: 'tony@test.ru', isAdmin: 1, companyId: 1, deletedAt: null });
        await user1.save();
        const user2 = new User();
        user2.fill({ username: 'Adonis', email: 'test@test.ru', isAdmin: 0, companyId: 2 });
        await user2.save();
        await user2.delete();
        const users = await User.all();
        assert.lengthOf(users, 1);
        assert.deepStrictEqual(users[0].toJSON(), user1.toJSON());
        const usersWithPaginate = await User.query().paginate(1, 10);
        assert.lengthOf(usersWithPaginate.all(), 1);
        assert.equal(usersWithPaginate.total, 1);
        await User.truncate();
    });
    (0, japa_1.default)('querying all models with trashed models', async (assert) => {
        class User extends (0, Helpers_1.compose)(BaseModel, SoftDeletes_1.SoftDeletes) {
        }
        __decorate([
            (0, Decorators_1.column)({ isPrimary: true }),
            __metadata("design:type", Number)
        ], User.prototype, "id", void 0);
        __decorate([
            (0, Decorators_1.column)(),
            __metadata("design:type", String)
        ], User.prototype, "username", void 0);
        __decorate([
            (0, Decorators_1.column)(),
            __metadata("design:type", String)
        ], User.prototype, "email", void 0);
        __decorate([
            (0, Decorators_1.column)(),
            __metadata("design:type", Number)
        ], User.prototype, "isAdmin", void 0);
        __decorate([
            (0, Decorators_1.column)(),
            __metadata("design:type", Number)
        ], User.prototype, "companyId", void 0);
        User.boot();
        const user1 = new User();
        user1.fill({ username: 'Tony', email: 'tony@test.ru', isAdmin: 1, companyId: 1 });
        await user1.save();
        await user1.delete();
        const user2 = new User();
        user2.fill({ username: 'Adonis', email: 'test@test.ru', isAdmin: 0, companyId: 2 });
        await user2.save();
        const user3 = new User();
        user3.fill({ username: 'Lucid', email: 'lucid@test.ru', isAdmin: 0, companyId: 1 });
        await user3.save();
        const users = await User.withTrashed().exec();
        assert.lengthOf(users, 3);
        const usersWithPagination = await User.onlyTrashed().paginate(1, 5);
        assert.lengthOf(usersWithPagination.all(), 1);
        assert.equal(usersWithPagination.total, 1);
        await User.truncate();
    });
    (0, japa_1.default)('querying only trashed models', async (assert) => {
        class User extends (0, Helpers_1.compose)(BaseModel, SoftDeletes_1.SoftDeletes) {
        }
        __decorate([
            (0, Decorators_1.column)({ isPrimary: true }),
            __metadata("design:type", Number)
        ], User.prototype, "id", void 0);
        __decorate([
            (0, Decorators_1.column)(),
            __metadata("design:type", String)
        ], User.prototype, "username", void 0);
        __decorate([
            (0, Decorators_1.column)(),
            __metadata("design:type", String)
        ], User.prototype, "email", void 0);
        __decorate([
            (0, Decorators_1.column)(),
            __metadata("design:type", Number)
        ], User.prototype, "isAdmin", void 0);
        __decorate([
            (0, Decorators_1.column)(),
            __metadata("design:type", Number)
        ], User.prototype, "companyId", void 0);
        User.boot();
        const user1 = new User();
        user1.fill({ username: 'Tony', email: 'tony@test.ru', isAdmin: 1, companyId: 1 });
        await user1.save();
        await user1.delete();
        const user2 = new User();
        user2.fill({ username: 'Adonis', email: 'test@test.ru', isAdmin: 0, companyId: 2 });
        await user2.save();
        const users = await User.onlyTrashed().exec();
        assert.lengthOf(users, 1);
        assert.equal(users[0].id, user1.id);
        await User.truncate();
    });
    (0, japa_1.default)('`restore` model after soft delete', async (assert) => {
        class User extends (0, Helpers_1.compose)(BaseModel, SoftDeletes_1.SoftDeletes) {
        }
        __decorate([
            (0, Decorators_1.column)({ isPrimary: true }),
            __metadata("design:type", Number)
        ], User.prototype, "id", void 0);
        __decorate([
            (0, Decorators_1.column)(),
            __metadata("design:type", String)
        ], User.prototype, "username", void 0);
        __decorate([
            (0, Decorators_1.column)(),
            __metadata("design:type", String)
        ], User.prototype, "email", void 0);
        __decorate([
            (0, Decorators_1.column)(),
            __metadata("design:type", Number)
        ], User.prototype, "isAdmin", void 0);
        __decorate([
            (0, Decorators_1.column)(),
            __metadata("design:type", Number)
        ], User.prototype, "companyId", void 0);
        User.boot();
        const user1 = new User();
        user1.fill({ username: 'Tony', email: 'tony@test.ru', isAdmin: 1, companyId: 1 });
        await user1.save();
        await user1.delete();
        const users = await User.onlyTrashed().exec();
        assert.lengthOf(users, 1);
        assert.equal(users[0].id, user1.id);
        await user1.restore();
        const user = await User.query().first();
        assert.deepStrictEqual(user.toJSON(), user1.toJSON());
        await User.truncate();
    });
    (0, japa_1.default)('`forceDelete` model and throw error when `restore`', async (assert) => {
        assert.plan(2);
        class User extends (0, Helpers_1.compose)(BaseModel, SoftDeletes_1.SoftDeletes) {
        }
        __decorate([
            (0, Decorators_1.column)({ isPrimary: true }),
            __metadata("design:type", Number)
        ], User.prototype, "id", void 0);
        __decorate([
            (0, Decorators_1.column)(),
            __metadata("design:type", String)
        ], User.prototype, "username", void 0);
        __decorate([
            (0, Decorators_1.column)(),
            __metadata("design:type", String)
        ], User.prototype, "email", void 0);
        __decorate([
            (0, Decorators_1.column)(),
            __metadata("design:type", Number)
        ], User.prototype, "isAdmin", void 0);
        __decorate([
            (0, Decorators_1.column)(),
            __metadata("design:type", Number)
        ], User.prototype, "companyId", void 0);
        User.boot();
        const user1 = new User();
        user1.fill({ username: 'Tony', email: 'tony@test.ru', isAdmin: 1, companyId: 1 });
        await user1.save();
        await user1.forceDelete();
        const users = await User.withTrashed().exec();
        assert.lengthOf(users, 0);
        try {
            await user1.restore();
        }
        catch ({ message }) {
            assert.equal(message, 'E_MODEL_FORCE_DELETED: Cannot restore a model instance is was force deleted');
        }
        await User.truncate();
    });
});
