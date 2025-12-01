import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        super(delimiter);
        this.name = source;
        this.noComponents = source === "" ? 0 : source.split(this.delimiter).length;
    }

    public getNoComponents(): number {
        return this.noComponents;
    }

    public getComponent(i: number): string {
        this.checkIndex(i);
        return this.name.split(this.delimiter)[i];
    }

    public setComponent(i: number, c: string) {
        this.checkIndex(i);
        const components = this.name.split(this.delimiter);
        components[i] = c;
        this.updateName(components);
    }

    public insert(i: number, c: string) {
        this.checkIndex(i, true);
        const components = this.name === "" ? [] : this.name.split(this.delimiter);
        components.splice(i, 0, c);
        this.updateName(components);
    }

    public append(c: string) {
        const components = this.name === "" ? [] : this.name.split(this.delimiter);
        components.push(c);
        this.updateName(components);
    }

    public remove(i: number) {
        this.checkIndex(i);
        const components = this.name.split(this.delimiter);
        components.splice(i, 1);
        this.updateName(components);
    }

    protected createInstance(components: string[], delimiter: string): AbstractName {
        return new StringName(components.join(delimiter), delimiter);
    }

    protected snapshotComponents(): string[] {
        return this.name === "" ? [] : this.name.split(this.delimiter);
    }

    private updateName(components: string[]) {
        this.name = components.join(this.delimiter);
        this.noComponents = components.length;
    }

    private checkIndex(i: number, allowEnd: boolean = false) {
        const max = allowEnd ? this.noComponents : this.noComponents - 1;
        if (i < 0 || (this.noComponents > 0 && i > max) || (this.noComponents === 0 && !allowEnd)) {
             throw new IllegalArgumentException("Index out of bounds");
        }
    }
}