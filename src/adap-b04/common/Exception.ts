/**
 * Root class for exceptions in ADAP examples
 */
export abstract class Exception extends Error {

    protected trigger: Exception | null = null;

    constructor(m: string, t?: Exception) {
        super(m);

        if (t != undefined) {
            this.trigger = t;
        }
    }

    public hasTrigger(): boolean {
        return this.trigger != null;
    }

    public getTrigger(): Exception {
        if (this.trigger == null) {
            // Lazy import to avoid circular dependency at module load time
            const { InvalidStateException } = require("./InvalidStateException");
            throw new InvalidStateException("Trigger is not set");
        }
        return this.trigger;
    }

}
