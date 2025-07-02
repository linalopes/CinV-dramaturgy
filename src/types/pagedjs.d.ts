declare module 'pagedjs' {
  export class Previewer {
    constructor();
    preview(
      content: HTMLElement,
      stylesheets: string[],
      options?: {
        format?: string;
        margin?: string;
        bleed?: string;
        marks?: boolean;
      }
    ): Promise<any>;
  }

  export class Handler {
    constructor();
    afterPageLayout(pageFragment: any, page: any, breakToken: any): void;
  }

  export class Chunker {
    constructor();
    chunk(content: HTMLElement, stylesheets: string[]): Promise<any[]>;
  }

  export class Flow {
    constructor();
    document: {
      pdf(): Promise<Blob>;
    };
  }
}
