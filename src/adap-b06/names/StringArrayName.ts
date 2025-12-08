import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {

    protected readonly components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        super(delimiter);
        this.components = [...source]; // Shallow copy to ensure ownership
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        this.checkIndex(i);
        return this.components[i];
    }

    protected createInstance(components: string[], delimiter: string): Name {
        return new StringArrayName(components, delimiter);
    }
}