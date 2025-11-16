import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        // throw new Error("needs implementation or deletion");
        this.setDelimiter(delimiter);
    }

    public clone(): Name {
        // throw new Error("needs implementation or deletion");
        const components: string[] = [];
        for (let i = 0; i < this.getNoComponents(); i++) {
            components.push(this.getComponent(i));
        }
        return this.createInstance(components, this.delimiter);
    }

    public asString(delimiter: string = this.delimiter): string {
        // throw new Error("needs implementation or deletion");
        const components: string[] = [];
        for (let i = 0; i < this.getNoComponents(); i++) {
            components.push(this.getComponent(i));
        }
        return components.join(delimiter);
    }

    public toString(): string {
        return this.asDataString();
    }

    public asDataString(): string {
        // throw new Error("needs implementation or deletion");
        const components: string[] = [];
        for (let i = 0; i < this.getNoComponents(); i++) {
            components.push(this.getComponent(i));
        }
        return components.join(DEFAULT_DELIMITER);
    }

    public isEqual(other: Name): boolean {
        // throw new Error("needs implementation or deletion");
        if (this === other) {
            return true;
        }
        if (!other) {
            return false;
        }
        const n = this.getNoComponents();
        if (n !== other.getNoComponents()) {
            return false;
        }
        for (let i = 0; i < n; i++) {
            if (this.getComponent(i) !== other.getComponent(i)) {
                return false;
            }
        }
        return true;
    }

    public getHashCode(): number {
        // throw new Error("needs implementation or deletion");
        const s = this.asDataString();
        let hash = 17;
        for (let i = 0; i < s.length; i++) {
            hash = (31 * hash + s.charCodeAt(i)) >>> 0;
        }
        return hash;
    }

    public isEmpty(): boolean {
        // throw new Error("needs implementation or deletion");
        return this.getNoComponents() === 0;
    }

    public getDelimiterCharacter(): string {
        // throw new Error("needs implementation or deletion");
        return this.delimiter;
    }

    protected setDelimiter(d: string): void {
        if (!d || d.length !== 1) {
            throw new Error("Delimiter must be a single character");
        }
        if (d === ESCAPE_CHARACTER) {
            throw new Error("Escape character cannot be used as delimiter");
        }
        this.delimiter = d;
    }

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;

    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;

    protected abstract createInstance(components: string[], delimiter: string): AbstractName;

    public concat(other: Name): void {
        // throw new Error("needs implementation or deletion");
        for (let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }
    }

}