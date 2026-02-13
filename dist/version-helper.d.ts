export declare class Version {
    private readonly major;
    private readonly minor;
    private readonly patch;
    constructor(major: number, minor: number, patch: number);
    static parse(versionString: string): Version;
    gte(other: Version): boolean;
    lt(other: Version): boolean;
    toString(): string;
}
export declare const MINIMUM_MODERN_VERSION: Version;
