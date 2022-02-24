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
const Decorators_1 = require("@adonisjs/lucid/build/src/Orm/Decorators");
const Helpers_1 = require("@poppinss/utils/build/src/Helpers");
const SoftDeletes_1 = require("../src/SoftDeletes");
const luxon_1 = require("luxon");
japa_1.default.group('Relations', (group) => {
    let app;
    let BaseModel;
    group.before(async () => {
        app = await (0, test_helpers_1.setupApplication)();
        BaseModel = (0, test_helpers_1.getBaseModel)(app);
        await (0, test_helpers_1.setup)();
    });
    group.after(async () => (0, test_helpers_1.cleanup)());
    (0, japa_1.default)('querying model relation with soft delete', async (assert) => {
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
        __decorate([
            (0, Decorators_1.manyToMany)(() => Industry),
            __metadata("design:type", Object)
        ], User.prototype, "industries", void 0);
        __decorate([
            (0, Decorators_1.manyToMany)(() => Industry),
            __metadata("design:type", Object)
        ], User.prototype, "supertest", void 0);
        User.boot();
        class Industry extends (0, Helpers_1.compose)(BaseModel, SoftDeletes_1.SoftDeletes) {
        }
        __decorate([
            (0, Decorators_1.column)({ isPrimary: true }),
            __metadata("design:type", Number)
        ], Industry.prototype, "id", void 0);
        __decorate([
            (0, Decorators_1.column)(),
            __metadata("design:type", String)
        ], Industry.prototype, "title", void 0);
        __decorate([
            (0, Decorators_1.column)(),
            __metadata("design:type", String)
        ], Industry.prototype, "text", void 0);
        __decorate([
            (0, Decorators_1.column)(),
            __metadata("design:type", Number)
        ], Industry.prototype, "revenue", void 0);
        __decorate([
            (0, Decorators_1.manyToMany)(() => User),
            __metadata("design:type", Object)
        ], Industry.prototype, "users", void 0);
        Industry.boot();
        await Industry.query();
        const user = new User();
        user.fill({ username: 'Lookin', email: 'lookin@test.ru', isAdmin: 1, companyId: 1 });
        await user.save();
        const industry1 = new Industry();
        industry1.fill({ title: 'Industry 1', text: 'Industry by Lookin' });
        await industry1.save();
        const industry2 = new Industry();
        industry2.fill({ title: 'Industry 2', text: 'Industry by Lookin' });
        await industry2.save();
        const industry3 = new Industry();
        industry3.fill({ title: 'Industry 3', text: 'Industry by Lookin' });
        await industry3.save();
        await user.related('industries').attach([industry1.id, industry2.id, industry3.id]);
        await industry1.delete();
        await industry2.delete();
        const industries = await user.related('industries').query().exec();
        assert.lengthOf(industries, 1);
        await Promise.all([User.truncate(), Industry.truncate()]);
    });
    (0, japa_1.default)('querying many to many with preload', async (assert) => {
        class MyBaseModel extends (0, Helpers_1.compose)(BaseModel, SoftDeletes_1.SoftDeletes) {
        }
        __decorate([
            (0, Decorators_1.column)({ isPrimary: true }),
            __metadata("design:type", Number)
        ], MyBaseModel.prototype, "id", void 0);
        __decorate([
            Decorators_1.column.dateTime({ serializeAs: null }),
            __metadata("design:type", luxon_1.DateTime)
        ], MyBaseModel.prototype, "deletedAt", void 0);
        class Book extends MyBaseModel {
        }
        Book.table = 'books';
        __decorate([
            (0, Decorators_1.column)(),
            __metadata("design:type", String)
        ], Book.prototype, "name", void 0);
        __decorate([
            (0, Decorators_1.manyToMany)(() => Author),
            __metadata("design:type", Object)
        ], Book.prototype, "authors", void 0);
        class Author extends MyBaseModel {
        }
        Author.table = 'authors';
        __decorate([
            (0, Decorators_1.column)(),
            __metadata("design:type", String)
        ], Author.prototype, "name", void 0);
        __decorate([
            (0, Decorators_1.manyToMany)(() => Book),
            __metadata("design:type", Object)
        ], Author.prototype, "books", void 0);
        const book1 = new Book();
        book1.fill({ name: 'Introduction AdonisJs' });
        await book1.save();
        const book2 = new Book();
        book2.fill({ name: 'Introduction Javascript' });
        await book2.save();
        const author1 = new Author();
        author1.fill({ name: 'John' });
        await author1.save();
        const author2 = new Author();
        author2.fill({ name: 'Mary' });
        await author2.save();
        const author3 = new Author();
        author3.fill({ name: 'Paul' });
        await author3.save();
        await book1.related('authors').attach([author1.id, author2.id, author3.id]);
        await book2.delete();
        await author1.delete();
        await author2.delete();
        const books = await Book.query()
            .select('id', 'name').preload('authors');
        assert.lengthOf(books, 1);
        assert.lengthOf(books[0].authors, 1);
    });
});
