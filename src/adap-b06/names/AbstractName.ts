import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";

export abstract class AbstractName implements Name {

    protected readonly delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        // Validation moved to initialization to ensure immutability validity
        if (!delimiter || delimiter.length !== 1) {
            throw new IllegalArgumentException("Delimiter must be a single character");
        }
        if (delimiter === ESCAPE_CHARACTER) {
            throw new IllegalArgumentException("Escape character cannot be used as delimiter");
        }
        this.delimiter = delimiter;
    }

    public clone(): Name {
        return this.createInstance(this.getComponents(), this.delimiter);
    }

    public asString(delimiter: string = this.delimiter): string {
        return this.getComponents().join(delimiter);
    }

    public toString(): string {
        return this.asDataString();
    }

    public asDataString(): string {
        // Simplified data string representation
        return this.getComponents().join(DEFAULT_DELIMITER);
    }

    public isEqual(other: Object): boolean {
        if (this === other) return true;
        // Check if other is a Name (has getNoComponents method)
        if (!other || typeof (other as any).getNoComponents !== 'function') return false;
        
        const otherName = other as Name;
        if (this.getNoComponents() !== otherName.getNoComponents()) return false;
        if (this.getDelimiterCharacter() !== otherName.getDelimiterCharacter()) return false;
        
        for (let i = 0; i < this.getNoComponents(); i++) {
            if (this.getComponent(i) !== otherName.getComponent(i)) return false;
        }
        return true;
    }

    public getHashCode(): number {
        const s = this.asDataString() + this.delimiter;
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

    public abstract getNoComponents(): number;
    public abstract getComponent(i: number): string;

    public setComponent(i: number, c: string): Name {
        this.checkIndex(i);
        const comps = this.getComponents();
        comps[i] = c;
        return this.createInstance(comps, this.delimiter);
    }

    public insert(i: number, c: string): Name {
        this.checkIndex(i, true);
        const comps = this.getComponents();
        comps.splice(i, 0, c);
        return this.createInstance(comps, this.delimiter);
    }

    public append(c: string): Name {
        const comps = this.getComponents();
        comps.push(c);
        return this.createInstance(comps, this.delimiter);
    }

    public remove(i: number): Name {
        this.checkIndex(i);
        const comps = this.getComponents();
        comps.splice(i, 1);
        return this.createInstance(comps, this.delimiter);
    }

    public concat(other: Name): Name {
        const comps = this.getComponents();
        for (let i = 0; i < other.getNoComponents(); i++) {
            comps.push(other.getComponent(i));
        }
        return this.createInstance(comps, this.delimiter);
    }

    /**
     * Factory method to create a new instance of the concrete class.
     * This is required to maintain the specific type (StringName vs StringArrayName)
     * while enforcing immutability.
     */
    protected abstract createInstance(components: string[], delimiter: string): Name;

    /**
     * Helper to get all components as an array.
     * Used by the template methods to perform array manipulations.
     */
    protected getComponents(): string[] {
        const n = this.getNoComponents();
        const comps: string[] = [];
        for (let i = 0; i < n; i++) {
            comps.push(this.getComponent(i));
        }
        return comps;
    }

    protected checkIndex(i: number, allowEnd: boolean = false): void {
        const n = this.getNoComponents();
        const max = allowEnd ? n : n - 1;
        if (i < 0 || (n > 0 && i > max) || (n === 0 && !allowEnd)) {
             throw new IllegalArgumentException(`Index ${i} out of bounds`);
        }
    }
}