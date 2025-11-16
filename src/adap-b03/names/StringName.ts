import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        super(delimiter);
        // throw new Error("needs implementation or deletion");
        if (source === "") {
            this.name = "";
            this.noComponents = 0;
        } else {
            const components = source.split(this.delimiter);
            this.setFromComponents(components);
        }
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
        const s = this.asDataString();
        let hash = 17;
        for (let i = 0; i < s.length; i++) {
            hash = (31 * hash + s.charCodeAt(i)) | 0;  // keep it in 32 bit range
        }
        return hash;
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
        return this.noComponents;
    }

    public getComponent(i: number): string {
        // throw new Error("needs implementation or deletion");
        this.ensureIndexInRange(i, false);
        const components = this.name.split(this.delimiter);
        return components[i];
    }

    public setComponent(i: number, c: string) {
        // throw new Error("needs implementation or deletion");
        this.ensureIndexInRange(i, false);
        const components = this.name.split(this.delimiter);
        components[i] = c;
        this.setFromComponents(components);
    }

    public insert(i: number, c: string) {
        // throw new Error("needs implementation or deletion");
        this.ensureIndexInRange(i, true);
        const components = this.name.split(this.delimiter);
        components.splice(i, 0, c);
        this.setFromComponents(components);
    }

    public append(c: string) {
        // throw new Error("needs implementation or deletion");
        const components = this.getComponents();
        components.push(c);
        this.setFromComponents(components);
    }

    public remove(i: number) {
        // throw new Error("needs implementation or deletion");
        this.ensureIndexInRange(i, false);
        const components = this.name.split(this.delimiter);
        components.splice(i, 1);
        this.setFromComponents(components);
    }

    public concat(other: Name): void {
        // throw new Error("needs implementation or deletion");
        super.concat(other);
    }

    protected createInstance(components: string[], delimiter: string): AbstractName {
        const source = components.join(delimiter);
        return new StringName(source, delimiter);
    }

    private getComponents(): string[] {
        if (this.name === "") {
            return [];
        }
        return this.name.split(this.delimiter);
    }

    private setFromComponents(components: string[]): void {
        this.noComponents = components.length;
        this.name = components.join(this.delimiter);
    }

    private ensureIndexInRange(i: number, allowEnd: boolean): void {
        const len = this.noComponents;
        const ok = allowEnd ? (i >= 0 && i <= len) : (i >= 0 && i < len);
        if (!ok) {
            throw new RangeError(`Index ${i} out of range`);
        }
    }

}