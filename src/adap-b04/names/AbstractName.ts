import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailureException } from "../common/MethodFailureException";
import { Name } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.delimiter = delimiter;
    }

    public asString(delimiter: string = this.delimiter): string {
        return this.getComponents().join(delimiter);
    }

    public toString(): string {
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
        return { ...this };
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
        for (let i = 0; i < other.getNoComponents(); i ++) {
            this.append(other.getComponent(i));
        }
    }

    abstract getComponents(): string[];


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