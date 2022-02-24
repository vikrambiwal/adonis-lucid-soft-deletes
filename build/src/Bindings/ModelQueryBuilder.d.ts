/// <reference types="@adonisjs/lucid" />
import { DatabaseContract } from '@ioc:Adonis/Lucid/Database';
/**
 * Define SoftDeletes binding to ModelQueryBuilder
 */
export declare function extendModelQueryBuilder(builder: DatabaseContract['ModelQueryBuilder']): void;
