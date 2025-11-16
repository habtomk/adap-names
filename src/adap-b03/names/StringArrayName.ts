import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        super(delimiter);
        // throw new Error("needs implementation or deletion");
        this.components = source.slice();
    }

    public clone(): Name {
        // throw new Error("needs implementation or deletion");
        return super.clone();
    }

    public asString(delimiter: string = this.delimiter): string {
        // throw new Error("needs implementation or deletion");
        return super.asString(delimiter);
    }

    public asDataString(): string {
        // throw new Error("needs implementation or deletion");
        return super.asDataString();
    }

    public isEqual(other: Name): boolean {
        // throw new Error("needs implementation or deletion");
        return super.isEqual(other);
    }

    public getHashCode(): number {
        // throw new Error("needs implementation or deletion");
        return super.getHashCode();
    }

    public isEmpty(): boolean {
        // throw new Error("needs implementation or deletion");
        return super.isEmpty();
    }

    public getDelimiterCharacter(): string {
        // throw new Error("needs implementation or deletion");
        return super.getDelimiterCharacter();
    }

    public getNoComponents(): number {
        // throw new Error("needs implementation or deletion");
        return this.components.length;
    }

    public getComponent(i: number): string {
        // throw new Error("needs implementation or deletion");
        this.ensureIndexInRange(i, false);
        return this.components[i];
    }

    public setComponent(i: number, c: string) {
        // throw new Error("needs implementation or deletion");
        this.ensureIndexInRange(i, false);
        this.components[i] = c;
    }

    public insert(i: number, c: string) {
        // throw new Error("needs implementation or deletion");
        this.ensureIndexInRange(i, true);
        this.components.splice(i, 0, c);
    }

    public append(c: string) {
        // throw new Error("needs implementation or deletion");
        this.components.push(c);
    }

    public remove(i: number) {
        // throw new Error("needs implementation or deletion");
        this.ensureIndexInRange(i, false);
        this.components.splice(i, 1);
    }

    public concat(other: Name): void {
        // throw new Error("needs implementation or deletion");
        super.concat(other);
    }

    protected createInstance(components: string[], delimiter: string): AbstractName {
        return new StringArrayName(components, delimiter);
    }

    private ensureIndexInRange(i: number, allowEnd: boolean): void {
        const len = this.components.length;
        const ok = allowEnd ? (i >= 0 && i <= len) : (i >= 0 && i < len);
        if (!ok) {
            throw new RangeError(`Index ${i} out of range`);
        }
    }
    
}