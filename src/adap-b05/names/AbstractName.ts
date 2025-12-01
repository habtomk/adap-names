import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailedException } from "../common/MethodFailedException";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.setDelimiter(delimiter);
    }

    public clone(): Name {
        const components = this.snapshotComponents();
        return this.createInstance(components, this.delimiter);
    }

    public asString(delimiter: string = this.delimiter): string {
        const components = this.snapshotComponents();
        return components.join(delimiter);
    }

    public toString(): string {
        return this.asDataString();
    }

    public asDataString(): string {
        const components = this.snapshotComponents();
        return components.join(DEFAULT_DELIMITER);
    }

    public isEqual(other: Name): boolean {
        if (this === other) return true;
        if (!other) return false;
        if (this.getNoComponents() !== other.getNoComponents()) return false;
        
        for (let i = 0; i < this.getNoComponents(); i++) {
            if (this.getComponent(i) !== other.getComponent(i)) return false;
        }
        return true;
    }

    public getHashCode(): number {
        const s = this.asDataString();
        let hash = 17;
        for (let i = 0; i < s.length; i++) {
            hash = (31 * hash + s.charCodeAt(i)) | 0;
        }
        return hash;
    }

    public isEmpty(): boolean {
        return this.getNoComponents() === 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    protected setDelimiter(d: string): void {
        IllegalArgumentException.assert(d.length === 1, "Delimiter must be a single character");
        this.delimiter = d;
    }

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;

    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;

    public concat(other: Name): void {
        for (let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }
    }

    protected abstract createInstance(components: string[], delimiter: string): AbstractName;

    protected abstract snapshotComponents(): string[];

}