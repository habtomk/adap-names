import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        super(delimiter);
        this.components = [...source];
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        this.checkIndex(i);
        return this.components[i];
    }

    public setComponent(i: number, c: string) {
        this.checkIndex(i);
        this.components[i] = c;
    }

    public insert(i: number, c: string) {
        this.checkIndex(i, true);
        this.components.splice(i, 0, c);
    }

    public append(c: string) {
        this.components.push(c);
    }

    public remove(i: number) {
        this.checkIndex(i);
        this.components.splice(i, 1);
    }

    protected createInstance(components: string[], delimiter: string): AbstractName {
        return new StringArrayName(components, delimiter);
    }

    protected snapshotComponents(): string[] {
        return [...this.components];
    }

    private checkIndex(i: number, allowEnd: boolean = false) {
        const max = allowEnd ? this.components.length : this.components.length - 1;
        if (i < 0 || (this.components.length > 0 && i > max) || (this.components.length === 0 && !allowEnd)) {
             throw new IllegalArgumentException("Index out of bounds");
        }
    }
}