import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected readonly name: string = "";
    protected readonly noComponents: number = 0;

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

    protected createInstance(components: string[], delimiter: string): Name {
        return new StringName(components.join(delimiter), delimiter);
    }
}