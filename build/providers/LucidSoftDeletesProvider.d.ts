/// <reference types="@adonisjs/application/build/adonis-typings/application" />
import { ApplicationContract } from '@ioc:Adonis/Core/Application';
/**
 * Provider to register lucid soft deletes
 */
export default class LucidSoftDeletesProvider {
    protected app: ApplicationContract;
    static needsApplication: boolean;
    constructor(app: ApplicationContract);
    register(): void;
    boot(): void;
}
