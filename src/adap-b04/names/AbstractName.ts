// src/adap-b04/names/AbstractName.ts
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
        this.assertClassInvariant();
        const n = this.getNoComponents();
        InvalidStateException.assert(n >= 0, "Number of components must not be negative");

        const components: string[] = [];
        for (let i = 0; i < n; i++) {
            const c = this.getComponent(i);
            InvalidStateException.assert(
                c !== null && c !== undefined,
                "Component must not be null or undefined"
            );
            components.push(c);
        }

        const clone = this.createInstance(components, this.delimiter);

        MethodFailedException.assert(
            clone.getNoComponents() === n,
            "Clone must keep the number of components"
        );

        (clone as AbstractName).assertClassInvariant();
        this.assertClassInvariant();
        return clone;
    }

    public asString(delimiter: string = this.delimiter): string {
        this.assertClassInvariant();
        const components = this.snapshotComponents();
        const result = components.join(delimiter);
        this.assertClassInvariant();
        return result;
    }

    public toString(): string {
        return this.asDataString();
    }

    public asDataString(): string {
        this.assertClassInvariant();
        const result = this.snapshotComponents().join(DEFAULT_DELIMITER);
        this.assertClassInvariant();
        return result;
    }

    public isEqual(other: Name): boolean {
        this.assertClassInvariant();
        if (this === other) {
            return true;
        }
        IllegalArgumentException.assert(other != null, "Other name must not be null or undefined");

        const n = this.getNoComponents();
        if (n !== other.getNoComponents()) {
            return false;
        }

        for (let i = 0; i < n; i++) {
            if (this.getComponent(i) !== other.getComponent(i)) {
                return false;
            }
        }

        this.assertClassInvariant();
        return true;
    }

    public getHashCode(): number {
        this.assertClassInvariant();
        const s = this.asDataString();
        let hash = 17;
        for (let i = 0; i < s.length; i++) {
            hash = (31 * hash + s.charCodeAt(i)) >>> 0;
        }
        return hash;
    }

    public isEmpty(): boolean {
        this.assertClassInvariant();
        return this.getNoComponents() === 0;
    }

    public getDelimiterCharacter(): string {
        this.assertClassInvariant();
        return this.delimiter;
    }

    protected setDelimiter(d: string): void {
        IllegalArgumentException.assert(
            !!d && d.length === 1,
            "Delimiter must be a single character"
        );
        IllegalArgumentException.assert(
            d !== ESCAPE_CHARACTER,
            "Escape character cannot be used as delimiter"
        );
        this.delimiter = d;
    }

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;

    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;

    protected abstract createInstance(
        components: string[],
        delimiter: string,
    ): AbstractName;

    protected abstract snapshotComponents(): string[];

    public concat(other: Name): void {
        this.assertClassInvariant();
        IllegalArgumentException.assert(
            other !== null && other !== undefined,
            "Other name must not be null or undefined"
        );
        const n = other.getNoComponents();
        for (let i = 0; i < n; i++) {
            this.append(other.getComponent(i));
        }
        this.assertClassInvariant();
    }

    protected assertPrecondition(condition: boolean, message: string): void {
        IllegalArgumentException.assert(condition, message);
    }

    protected assertPostcondition(condition: boolean, message: string): void {
        MethodFailedException.assert(condition, message);
    }

    protected assertClassInvariant(): void {
        InvalidStateException.assert(
            this.delimiter.length === 1,
            "Delimiter must be a single character"
        );
        InvalidStateException.assert(
            this.delimiter !== ESCAPE_CHARACTER,
            "Delimiter must not be the escape character"
        );

        const components = this.snapshotComponents();
        InvalidStateException.assert(
            this.getNoComponents() === components.length,
            "Number of components inconsistent"
        );
        components.forEach((c, idx) => {
            InvalidStateException.assert(
                c !== null && c !== undefined,
                `Component ${idx} must not be null or undefined`
            );
            InvalidStateException.assert(
                typeof c === "string",
                `Component ${idx} must be a string`
            );
        });
    }
}
