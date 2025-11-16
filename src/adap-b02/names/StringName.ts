import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        // throw new Error("needs implementation or deletion");
        this.delimiter = delimiter ?? DEFAULT_DELIMITER;
        const components = source === "" ? [] : source.split(this.delimiter);
        this.setComponents(components);
    }

    public asString(delimiter: string = this.delimiter): string {
        // throw new Error("needs implementation or deletion");
        const components = this.getComponents();
        return components.join(delimiter);
    }

    public asDataString(): string {
        // throw new Error("needs implementation or deletion");
        const components = this.getComponents();
        const encoded = components.map(c => this.encodeComponent(c));
        return encoded.join(DEFAULT_DELIMITER);
    }

    public getDelimiterCharacter(): string {
        // throw new Error("needs implementation or deletion");
        return this.delimiter;
    }

    public isEmpty(): boolean {
        // throw new Error("needs implementation or deletion"); 
        return this.noComponents === 0;
    }

    public getNoComponents(): number {
        // throw new Error("needs implementation or deletion");
        return this.noComponents;
    }

    public getComponent(x: number): string {
        // throw new Error("needs implementation or deletion");
        this.ensureIndexInRange(x, false);
        const components = this.getComponents();
        return components[x];
    }

    public setComponent(n: number, c: string): void {
        // throw new Error("needs implementation or deletion");
        this.ensureIndexInRange(n, false);
        const components = this.getComponents();
        components[n] = c;
        this.setComponents(components);
    }

    public insert(n: number, c: string): void {
        // throw new Error("needs implementation or deletion");
        this.ensureIndexInRange(n, true);
        const components = this.getComponents();
        components.splice(n, 0, c);
        this.setComponents(components);
    }

    public append(c: string): void {
        // throw new Error("needs implementation or deletion");
        const components = this.getComponents();
        components.push(c);
        this.setComponents(components);
    }

    public remove(n: number): void {
        // throw new Error("needs implementation or deletion");
        this.ensureIndexInRange(n, false);
        const components = this.getComponents();
        components.splice(n, 1);
        this.setComponents(components);
    }

    public concat(other: Name): void {
        // throw new Error("needs implementation or deletion");
        const components = this.getComponents();
        for (let i = 0; i < other.getNoComponents(); i++) {
            components.push(other.getComponent(i));
        }
        this.setComponents(components);
    }

    private getComponents(): string[] {
        if (this.name === "") {
            return [];
        }
        return this.name.split(this.delimiter);
    }

    private setComponents(components: string[]): void {
        this.noComponents = components.length;
        this.name = components.join(this.delimiter);
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
        const len = this.noComponents;
        const ok = allowEnd ? (i >= 0 && i <= len) : (i >= 0 && i < len);
        if (!ok) {
            throw new RangeError(`Index ${i} out of range`);
        }
    }

}