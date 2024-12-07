import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailureException } from "../common/MethodFailureException";
import { Name } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.assertValidDelimiter(delimiter);
        this.delimiter = delimiter;
    }

    public asString(delimiter: string = this.delimiter): string {
        this.assertValidDelimiter(delimiter);
        return this.getComponents().join(delimiter);
    }

    public toString(): string {
        return this.asDataString();
        return this.asDataString();
    }

    public asDataString(): string {
        return this.getComponents().join(ESCAPE_CHARACTER + this.delimiter);
    }

    public isEqual(other: Name): boolean {
        IllegalArgumentException.assertIsNotNullOrUndefined(other, 'other name cannot be null or undefined');
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

        MethodFailureException.assertCondition(
            cloned !== null && cloned !== undefined, 'cloned object cannot be null or undefined'
        );

        MethodFailureException.assertCondition(
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
    abstract setComponent(i: number, c: string): void;

    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;

    public concat(other: Name): void {
        IllegalArgumentException.assertIsNotNullOrUndefined(other, 'other name cannot be null or undefined');

        const initialCount = this.getNoComponents();
        const otherCount = other.getNoComponents();

        for (let i = 0; i < other.getNoComponents(); i ++) {
            this.append(other.getComponent(i));
        }

        MethodFailureException.assertCondition(
            this.getNoComponents() === initialCount + otherCount,
            "component count does not match the sum of both array's components"
        );
    }

    abstract getComponents(): string[];

    
    // Pre-conditions
    protected assertValidDelimiter(delimiter: string): void {
        IllegalArgumentException.assertIsNotNullOrUndefined(delimiter, "delimiter cannot be null or undefined");
        const condition = delimiter !== ESCAPE_CHARACTER && delimiter.length === 1;
        IllegalArgumentException.assertCondition(condition, "delimiter is not valid");
    }

    protected assertValidName(c: string): void {
        IllegalArgumentException.assertCondition(
            !c.includes(this.delimiter) && !c.includes(ESCAPE_CHARACTER),
            `name contains invalid characters: '${this.delimiter}' or '${ESCAPE_CHARACTER}'`
        );
    }

    protected assertValidIndex(i: number): void {
        IllegalArgumentException.assertCondition(
            i >= 0 && i < this.getNoComponents(),
            `index ${i} is out of the range`
        );
    }

    protected assertValidInsertIndex(i: number): void {
        IllegalArgumentException.assertCondition(
            i >= 0 && i <= this.getNoComponents(),
            `index ${i} is out of the range`
        );
    }

}