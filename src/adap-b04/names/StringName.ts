// src/adap-b04/names/StringName.ts
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        super(delimiter);

        IllegalArgumentException.assert(
            typeof source === "string",
            "Source must be a string"
        );

        if (source === "") {
            this.name = "";
            this.noComponents = 0;
        } else {
            const components = source.split(this.delimiter);
            this.setFromComponents(components);
        }
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
        return this.noComponents;
    }

    public getComponent(i: number): string {
        this.assertClassInvariant();
        this.ensureIndexInRange(i, false);
        const components = this.getComponents();
        this.assertClassInvariant();
        return components[i];
    }

    public setComponent(i: number, c: string) {
        this.assertClassInvariant();
        this.assertPrecondition(typeof c === "string", "Component must be a string");
        this.ensureIndexInRange(i, false);
        const components = this.getComponents();
        components[i] = c;
        this.setFromComponents(components);
        this.assertPostcondition(
            this.noComponents === components.length,
            "Component replacement must keep number of components"
        );
        this.assertClassInvariant();
    }

    public insert(i: number, c: string) {
        this.assertClassInvariant();
        this.assertPrecondition(typeof c === "string", "Component must be a string");
        const before = this.noComponents;
        this.ensureIndexInRange(i, true);
        const components = this.getComponents();
        components.splice(i, 0, c);
        this.setFromComponents(components);
        this.assertPostcondition(
            this.noComponents === before + 1,
            "Insert must increase number of components by one"
        );
        this.assertClassInvariant();
    }

    public append(c: string) {
        this.assertClassInvariant();
        this.assertPrecondition(typeof c === "string", "Component must be a string");
        const before = this.noComponents;
        const components = this.getComponents();
        components.push(c);
        this.setFromComponents(components);
        this.assertPostcondition(
            this.noComponents === before + 1,
            "Append must increase number of components by one"
        );
        this.assertClassInvariant();
    }

    public remove(i: number) {
        this.assertClassInvariant();
        const before = this.noComponents;
        this.ensureIndexInRange(i, false);
        const components = this.getComponents();
        components.splice(i, 1);
        this.setFromComponents(components);
        this.assertPostcondition(
            this.noComponents === before - 1,
            "Remove must decrease number of components by one"
        );
        this.assertClassInvariant();
    }

    public concat(other: Name): void {
        super.concat(other);
    }

    protected createInstance(components: string[], delimiter: string): AbstractName {
        const source = components.join(delimiter);
        return new StringName(source, delimiter);
    }

    protected snapshotComponents(): string[] {
        return this.getComponents();
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
        this.assertClassInvariant();
    }

    private ensureIndexInRange(i: number, allowEnd: boolean): void {
        const len = this.noComponents;

        IllegalArgumentException.assert(
            Number.isInteger(i),
            "Index must be an integer"
        );

        const ok = allowEnd ? (i >= 0 && i <= len) : (i >= 0 && i < len);
        IllegalArgumentException.assert(ok, `Index ${i} out of range`);
    }

}
