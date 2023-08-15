declare module 'oslllo-svg-fixer' {
  export type FixerOptions = {
    showProgressBar?: boolean;
    throwIfDestinationDoesNotExist?: boolean;
    traceResolution?: number;
  };

  export type Report = {
    options: {
      data: FixerOptions;
    };
    location: {
      original: { source: string };
      source: [string];
      destination: string;
    };
    source: [string];
    destination: string;
  };

  declare class SVGFixer {
    constructor(source: string, destination: string, fixerOption: FixerOptions);
    fix(): Promise<Report>;
  }

  export default SVGFixer;
}
