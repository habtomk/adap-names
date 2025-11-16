import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringArrayName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        // throw new Error("needs implementation or deletion");
        this.delimiter = delimiter ?? DEFAULT_DELIMITER;
        this.components = source.slice();
    }

    public asString(delimiter: string = this.delimiter): string {
        // throw new Error("needs implementation or deletion");
        return this.components.join(delimiter);
    }

    public asDataString(): string {
        // throw new Error("needs implementation or deletion");
        const encoded = this.components.map(c => this.encodeComponent(c));
        return encoded.join(DEFAULT_DELIMITER);
    }

    public getDelimiterCharacter(): string {
        // throw new Error("needs implementation or deletion");
        return this.delimiter;
    }

    public isEmpty(): boolean {
        // throw new Error("needs implementation or deletion");
        return this.components.length === 0;
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

    public setComponent(i: number, c: string): void {
        // throw new Error("needs implementation or deletion");
        this.ensureIndexInRange(i, false);
        this.components[i] = c;
    }

    public insert(i: number, c: string): void {
        // throw new Error("needs implementation or deletion");
        this.ensureIndexInRange(i, true);
        this.components.splice(i, 0, c);
    }

    public append(c: string): void {
        // throw new Error("needs implementation or deletion");
        this.components.push(c);

    }

    public remove(i: number): void {
        // throw new Error("needs implementation or deletion");
        this.ensureIndexInRange(i, false);
        this.components.splice(i, 1);
    }

    public concat(other: Name): void {
        // throw new Error("needs implementation or deletion");
        for (let i = 0; i < other.getNoComponents(); i++) {
            this.components.push(other.getComponent(i));
        }
    }

    private encodeComponent(comp: string): string {
        let result = "";
        for (const ch of comp) {
            if (ch === ESCAPE_CHARACTER || ch === DEFAULT_DELIMITER) {
                result += ESCAPE_CHARACTER;
            }
            result += ch;
        }
        return result;
    }

    private ensureIndexInRange(i: number, allowEnd: boolean): void {
        const len = this.components.length;
        const ok = allowEnd ? (i >= 0 && i <= len) : (i >= 0 && i < len);
        if (!ok) {
            throw new RangeError(`Index ${i} out of range`);
        }
    }

}