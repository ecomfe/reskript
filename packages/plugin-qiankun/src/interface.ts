export interface PlaceholderConfig {
    size: number;
    backgroundColor: string;
}

export interface TemplateConfig {
    header?: number | PlaceholderConfig;
    sidebarLeft?: number | PlaceholderConfig;
    footer?: number | PlaceholderConfig;
}

export interface Options {
    template?: string | TemplateConfig;
}
