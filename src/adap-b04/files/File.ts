import { Node } from "./Node";
import { Directory } from "./Directory";
import { MethodFailedException } from "../common/MethodFailedException";
import { InvalidStateException } from "../common/InvalidStateException";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

enum FileState {
    OPEN,
    CLOSED,
    DELETED        
};

export class File extends Node {

    protected state: FileState = FileState.CLOSED;

    constructor(baseName: string, parent: Directory) {
        super(baseName, parent);
    }

    public open(): void {
        InvalidStateException.assert(
            this.state !== FileState.DELETED,
            "File is deleted"
        );
        InvalidStateException.assert(
            this.state === FileState.CLOSED,
            "File already open"
        );

        this.state = FileState.OPEN;
        MethodFailedException.assert(this.state === FileState.OPEN);
    }

    public read(noBytes: number): Int8Array {
        IllegalArgumentException.assert(
            Number.isInteger(noBytes) && noBytes >= 0,
            "Number of bytes must be a non-negative integer"
        );
        InvalidStateException.assert(
            this.state === FileState.OPEN,
            "File must be open for reading"
        );

        return new Int8Array(noBytes);
    }

    public close(): void {
        InvalidStateException.assert(
            this.state === FileState.OPEN,
            "File not open"
        );

        this.state = FileState.CLOSED;
        MethodFailedException.assert(this.state === FileState.CLOSED);
    }

    protected doGetFileState(): FileState {
        return this.state;
    }

}
