/// <reference types="@adonisjs/lucid" />
/// <reference types="@adonisjs/application/build/adonis-typings/application" />
import { ApplicationContract } from '@ioc:Adonis/Core/Application';
import { SqliteConfig } from '@ioc:Adonis/Lucid/Database';
import { LucidModel } from '@ioc:Adonis/Lucid/Orm';
export declare const dbConfig: SqliteConfig;
export declare function setup(destroyDb?: boolean): Promise<void>;
export declare function cleanup(): Promise<void>;
/**
 * Setup application
 */
export declare function setupApplication(): Promise<ApplicationContract>;
/**
 * Get BaseModel of application
 */
export declare function getBaseModel(app: ApplicationContract): LucidModel;
