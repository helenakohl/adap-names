import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";
import { Name } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.delimiter = delimiter;
    }

    public asString(delimiter: string = this.delimiter): string {
        this.assertValidDelimiter(delimiter);
        return this.getComponents().join(delimiter);
    }

    public toString(): string {
        return this.asDataString();
    }

    public asDataString(): string {
        return this.getComponents().join(ESCAPE_CHARACTER + this.delimiter);
    }

    public isEqual(other: Name): boolean {
        this.assertIsNotNullOrUndefined(other);
        return this.asDataString() === other.asDataString();
    }

    public getHashCode(): number {
        let hashCode: number = 0;
        const s: string = this.asDataString();
        for (let i = 0; i < s.length; i++) {
            let c = s.charCodeAt(i);
            hashCode = (hashCode << 5) - hashCode + c;
            hashCode |= 0;
        }
        return hashCode;
    }

    public clone(): Name {
        const cloned = { ...this };

        MethodFailedException.assert(
            cloned !== null && cloned !== undefined, 'cloned object cannot be null or undefined'
        );

        MethodFailedException.assert(
            cloned !== this, 'cloned object is not a clone'
        );

        return cloned;
    }

    public isEmpty(): boolean {
        return this.getNoComponents() === 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }


    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): Name;

    abstract insert(i: number, c: string): Name;
    abstract append(c: string): Name;
    abstract remove(i: number): Name;

    public concat(other: Name): Name {
        this.assertIsNotNullOrUndefined(other, 'other name cannot be null or undefined');

        const initialCount = this.getNoComponents();
        const otherCount = other.getNoComponents();

        let result = this.clone();

        for (let i = 0; i < other.getNoComponents(); i ++) {
            result = result.append(other.getComponent(i));
        }

        MethodFailedException.assert(
            this.getNoComponents() === initialCount + otherCount,
            "new component count does not match the sum of both names' components"
        );
        return result;
    }

    abstract getComponents(): string[];

    
    // Pre-conditions
    protected assertIsNotNullOrUndefined(o: Object | null, exMsg: string = "null or undefined"): void {
        const condition = (o == undefined) || (o == null);
        IllegalArgumentException.assert(!condition, exMsg);
    }

    protected assertValidDelimiter(delimiter: string): void {
        const condition = delimiter !== ESCAPE_CHARACTER && delimiter.length === 1;
        IllegalArgumentException.assert(condition, "delimiter is not valid");
    }

    protected assertValidName(c: string): void {
        IllegalArgumentException.assert(
            !c.includes(this.delimiter) && !c.includes(ESCAPE_CHARACTER),
            `name contains invalid characters: '${this.delimiter}' or '${ESCAPE_CHARACTER}'`
        );
    }

    protected assertValidIndex(i: number): void {
        IllegalArgumentException.assert(
            i >= 0 && i < this.getNoComponents(),
            `index ${i} is out of the range`
        );
    }

    protected assertValidInsertIndex(i: number): void {
        IllegalArgumentException.assert(
            i >= 0 && i <= this.getNoComponents(),
            `index ${i} is out of the range`
        );
    }

}