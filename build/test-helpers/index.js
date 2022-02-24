"use strict";
/*
 * adonis-lucid-soft-deletes
 *
 * (c) Lookin Anton <lookin@lookinlab.ru>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBaseModel = exports.setupApplication = exports.cleanup = exports.setup = exports.dbConfig = void 0;
const path_1 = require("path");
const knex_1 = __importDefault(require("knex"));
const dev_utils_1 = require("@poppinss/dev-utils");
const standalone_1 = require("@adonisjs/core/build/standalone");
const BaseModel_1 = require("@adonisjs/lucid/build/src/Orm/BaseModel");
const Adapter_1 = require("@adonisjs/lucid/build/src/Orm/Adapter");
const Database_1 = require("@adonisjs/lucid/build/src/Database");
const fs = new dev_utils_1.Filesystem((0, path_1.join)(__dirname, 'tmp'));
exports.dbConfig = {
    client: 'sqlite3',
    connection: { filename: (0, path_1.join)(fs.basePath, 'db.sqlite3') },
    debug: false,
    useNullAsDefault: true,
};
async function setup(destroyDb = true) {
    await fs.ensureRoot();
    const db = (0, knex_1.default)(exports.dbConfig);
    const hasUsers = await db.schema.hasTable('users');
    if (!hasUsers) {
        await db.schema.createTable('users', (table) => {
            table.increments();
            table.string('username').unique();
            table.string('email').unique();
            table.boolean('is_admin');
            table.string('password');
            table.integer('company_id');
            table.timestamps();
            table.timestamp('deleted_at', { useTz: true });
        });
    }
    const hasIndustries = await db.schema.hasTable('industries');
    if (!hasIndustries) {
        await db.schema.createTable('industries', (table) => {
            table.increments();
            table.string('title');
            table.string('text');
            table.integer('revenue');
            table.timestamps();
            table.timestamp('deleted_at', { useTz: true });
        });
    }
    const hasBooks = await db.schema.hasTable('books');
    if (!hasBooks) {
        await db.schema.createTable('books', (table) => {
            table.increments().primary();
            table.string('name').unique();
            table.timestamps();
            table.timestamp('deleted_at', { useTz: true });
        });
    }
    const hasTicket = await db.schema.hasTable('authors');
    if (!hasTicket) {
        await db.schema.createTable('authors', (table) => {
            table.increments().primary();
            table.string('name');
            table.timestamps();
            table.timestamp('deleted_at', { useTz: true });
        });
    }
    const hasRoles = await db.schema.hasTable('roles');
    if (!hasRoles) {
        await db.schema.createTable('roles', (table) => {
            table.increments();
            table.string('title');
            table.timestamps();
        });
    }
    const hasIndustryUser = await db.schema.hasTable('industry_user');
    if (!hasIndustryUser) {
        await db.schema.createTable('industry_user', (table) => {
            table.increments();
            table.integer('user_id');
            table.integer('industry_id');
        });
    }
    const hasBooksAuhors = await db.schema.hasTable('author_book');
    if (!hasBooksAuhors) {
        await db.schema.createTable('author_book', (table) => {
            table.increments().primary();
            table.integer('book_id');
            table.integer('author_id');
            table.foreign('book_id').references('books.id');
            table.foreign('author_id').references('authors.id');
            table.timestamp('deleted_at', { useTz: true });
        });
    }
    if (destroyDb) {
        await db.destroy();
    }
}
exports.setup = setup;
async function cleanup() {
    const db = (0, knex_1.default)(exports.dbConfig);
    await db.schema.dropTableIfExists('users');
    await db.schema.dropTableIfExists('industries');
    await db.schema.dropTableIfExists('books');
    await db.schema.dropTableIfExists('authors');
    await db.schema.dropTableIfExists('roles');
    await db.schema.dropTableIfExists('industry_user');
    await db.schema.dropTableIfExists('author_book');
    await db.destroy();
    await fs.cleanup();
}
exports.cleanup = cleanup;
/**
 * Setup application
 */
async function setupApplication() {
    await fs.add('.env', '');
    await fs.add('config/app.ts', `
      export const appKey = 'averylong32charsrandomsecretkey'
      export const http = {
        cookie: {},
        trustProxy: () => true,
      }
    `);
    await fs.add('config/database.ts', `
      const dbConfig = undefined
      export default dbConfig
    `);
    const app = new standalone_1.Application(fs.basePath, 'test', {
        aliases: { App: './app' },
        providers: ['@adonisjs/core'],
    });
    await app.setup();
    await app.registerProviders();
    await app.bootProviders();
    return app;
}
exports.setupApplication = setupApplication;
/**
 * Get BaseModel of application
 */
function getBaseModel(app) {
    BaseModel_1.BaseModel.$container = app.container;
    BaseModel_1.BaseModel.$adapter = new Adapter_1.Adapter(new Database_1.Database({
        connection: 'sqlite',
        connections: { sqlite: exports.dbConfig },
    }, app.container.use('Adonis/Core/Logger'), app.container.use('Adonis/Core/Profiler'), app.container.use('Adonis/Core/Event')));
    return BaseModel_1.BaseModel;
}
exports.getBaseModel = getBaseModel;
