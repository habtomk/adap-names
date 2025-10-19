export const DEFAULT_DELIMITER: string = '.';
export const ESCAPE_CHARACTER = '\\';

/**
 * A name is a sequence of string components separated by a delimiter character.
 * Special characters within the string may need masking, if they are to appear verbatim.
 * There are only two special characters, the delimiter character and the escape character.
 * The escape character can't be set, the delimiter character can.
 * 
 * Homogenous name examples
 * 
 * "oss.cs.fau.de" is a name with four name components and the delimiter character '.'.
 * "///" is a name with four empty components and the delimiter character '/'.
 * "Oh\.\.\." is a name with one component, if the delimiter character is '.'.
 */
export class Name {

    private delimiter: string = DEFAULT_DELIMITER;
    private components: string[] = [];

    /** Expects that all Name components are properly masked */
    constructor(other: string[], delimiter?: string) {
        // throw new Error("needs implementation or deletion");
        if (delimiter !== undefined) this.setDelimiter(delimiter);
        this.components = [...other];
    }

    /**
     * Returns a human-readable representation of the Name instance using user-set control characters
     * Control characters are not escaped (creating a human-readable string)
     * Users can vary the delimiter character to be used
     */
    public asString(delimiter: string = this.delimiter): string {
        // throw new Error("needs implementation or deletion");
        const readable = this.components.map(c => this.unmask(c));
        return readable.join(delimiter);
    }

    /** 
     * Returns a machine-readable representation of Name instance using default control characters
     * Machine-readable means that from a data string, a Name can be parsed back in
     * The control characters in the data string are the default characters
     */
    public asDataString(): string {
        // throw new Error("needs implementation or deletion");
        return this.components.join(this.delimiter);
    }

    public getComponent(i: number): string {
        // throw new Error("needs implementation or deletion");
        this.ensureIndexInRange(i, false);
        return this.components[i];
    }

    /** Expects that new Name component c is properly masked */
    public setComponent(i: number, c: string): void {
        // throw new Error("needs implementation or deletion");
        this.ensureIndexInRange(i, false);
        this.components[i] = c;
    }

     /** Returns number of components in Name instance */
     public getNoComponents(): number {
        // throw new Error("needs implementation or deletion");
        return this.components.length;
    }

    public getDelimiter(): string {
        return this.delimiter;
    }

    public setDelimiter(d: string): void {
        if (!d || d.length !== 1) throw new Error("Delimiter must be a single character");
        if (d === ESCAPE_CHARACTER) throw new Error("Escape character cannot be used as delimiter");
        this.delimiter = d;
    }

    /** Expects that new Name component c is properly masked */
    public insert(i: number, c: string): void {
        // throw new Error("needs implementation or deletion");
        this.ensureIndexInRange(i, true);
        this.components.splice(i, 0, c);
    }

    /** Expects that new Name component c is properly masked */
    public append(c: string): void {
        // throw new Error("needs implementation or deletion");
        this.components.push(c);
    }

    public remove(i: number): void {
        // throw new Error("needs implementation or deletion");
        this.ensureIndexInRange(i, false);
        this.components.splice(i, 1);
    }

    // helpers for masking and unmasking
    private unmask(comp: string): string {
        if (!comp) return comp;
        const d = this.delimiter;
        const delimRe = new RegExp('\\\\' + this.escapeRegexChar(d), 'g');
        comp = comp.replace(delimRe, d);
        comp = comp.replace(/\\\\/g, '\\');
        return comp;
    }

    private escapeRegexChar(ch: string): string {
        return ch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    private ensureIndexInRange(i: number, allowEnd: boolean): void {
        const ok = allowEnd ? (i >= 0 && i <= this.components.length)
                            : (i >= 0 && i < this.components.length);
        if (!ok) throw new RangeError(`Index ${i} out of range`);
    }

}