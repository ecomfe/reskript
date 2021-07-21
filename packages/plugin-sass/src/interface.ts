export interface SassLoaderOptions {
    implementation?: unknown;
    sassOptions?: Record<string, unknown>;
    additionalData?: string | ((content: string, loaderContext: unknown) => string);
}
