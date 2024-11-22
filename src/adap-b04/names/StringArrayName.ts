import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(other: string[], delimiter?: string) {
        super();
        // pre-condition?
        this.components = other;
        if (delimiter) {
            this.delimiter = delimiter;
        }
    }

    getNoComponents(): number {
        return this.components.length;
    }

    getComponent(i: number): string {
        IllegalArgumentException.assertIsNotNullOrUndefined(i, 'component number cannot be null or undefined');
        this.assertValidIndex(i);
        return this.components[i];
    }
    setComponent(i: number, c: string) {
        IllegalArgumentException.assertIsNotNullOrUndefined(i, 'component number cannot be null or undefined');
        IllegalArgumentException.assertIsNotNullOrUndefined(c, 'new component cannot be null or undefined');
        this.assertValidIndex(i);
        this.components[i] = c;
    }

    insert(i: number, c: string) {
        IllegalArgumentException.assertIsNotNullOrUndefined(i, 'component number cannot be null or undefined');
        IllegalArgumentException.assertIsNotNullOrUndefined(c, 'new component cannot be null or undefined');
        this.assertValidInsertIndex(i);
        this.components.splice(i, 0, c);
    }

    append(c: string) {
        IllegalArgumentException.assertIsNotNullOrUndefined(c, 'new component cannot be null or undefined');
        this.components.push(c);
    }

    remove(i: number) {
        IllegalArgumentException.assertIsNotNullOrUndefined(i, 'component number cannot be null or undefined');
        this.assertValidIndex(i);
        this.components.splice(i, 1);
    }

    getComponents(): string[] {
        return this.components;
    }
}