// src/adap-b04/names/StringArrayName.ts
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        super(delimiter);

        IllegalArgumentException.assert(
            Array.isArray(source),
            "Source must be an array of strings"
        );
        source.forEach((c, idx) =>
            IllegalArgumentException.assert(
                typeof c === "string",
                `Component at index ${idx} must be a string`
            )
        );

        this.components = source.slice();
        this.assertClassInvariant();
    }

    public clone(): Name {
        return super.clone();
    }

    public asString(delimiter: string = this.delimiter): string {
        return super.asString(delimiter);
    }

    public asDataString(): string {
        return super.asDataString();
    }

    public isEqual(other: Name): boolean {
        return super.isEqual(other);
    }

    public getHashCode(): number {
        return super.getHashCode();
    }

    public isEmpty(): boolean {
        return super.isEmpty();
    }

    public getDelimiterCharacter(): string {
        return super.getDelimiterCharacter();
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        
        this.assertClassInvariant();
        this.ensureIndexInRange(i, false);
        this.assertClassInvariant();
        return this.components[i];
    }

    public setComponent(i: number, c: string) {
        this.assertClassInvariant();
        this.assertPrecondition(typeof c === "string", "Component must be a string");
        this.ensureIndexInRange(i, false);
        this.components[i] = c;
        this.assertPostcondition(
            this.components.length === this.getNoComponents(),
            "Replacing component must keep length"
        );
        this.assertClassInvariant();
    }

    public insert(i: number, c: string) {
        this.assertClassInvariant();
        this.assertPrecondition(typeof c === "string", "Component must be a string");
        const before = this.components.length;
        this.ensureIndexInRange(i, true);
        this.components.splice(i, 0, c);
        this.assertPostcondition(
            this.components.length === before + 1,
            "Insert must increase number of components by one"
        );
        this.assertClassInvariant();
    }

    public append(c: string) {
        this.assertClassInvariant();
        this.assertPrecondition(typeof c === "string", "Component must be a string");
        const before = this.components.length;
        this.components.push(c);
        this.assertPostcondition(
            this.components.length === before + 1,
            "Append must increase number of components by one"
        );
        this.assertClassInvariant();
    }

    public remove(i: number) {
        this.assertClassInvariant();
        const before = this.components.length;
        this.ensureIndexInRange(i, false);
        this.components.splice(i, 1);
        this.assertPostcondition(
            this.components.length === before - 1,
            "Remove must decrease number of components by one"
        );
        this.assertClassInvariant();
    }

    public concat(other: Name): void {
        
        super.concat(other);
    }

    protected createInstance(components: string[], delimiter: string): AbstractName {
        return new StringArrayName(components, delimiter);
    }

    protected snapshotComponents(): string[] {
        return this.components.slice();
    }

    private ensureIndexInRange(i: number, allowEnd: boolean): void {
        const len = this.components.length;

        IllegalArgumentException.assert(
            Number.isInteger(i),
            "Index must be an integer"
        );

        const ok = allowEnd ? (i >= 0 && i <= len) : (i >= 0 && i < len);
        IllegalArgumentException.assert(ok, `Index ${i} out of range`);
    }
    
}
