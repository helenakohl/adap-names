import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(other: string, delimiter?: string) {
        super();
        // pre-conditions?
        this.name = other;
        this.noComponents = this.getNoComponents();
        if (delimiter) {
            this.delimiter = delimiter;
        }
    }

    getNoComponents(): number {
        return this.getComponents().length;
    }

    getComponent(i: number): string {
        IllegalArgumentException.assertIsNotNullOrUndefined(i, 'component number cannot be null or undefined');
        this.assertValidIndex(i);
        return this.getComponents()[i];
    }

    setComponent(i: number, c: string) {
        IllegalArgumentException.assertIsNotNullOrUndefined(i, 'component number cannot be null or undefined');
        IllegalArgumentException.assertIsNotNullOrUndefined(c, 'new component cannot be null or undefined');
        this.assertValidIndex(i);
        const components = this.getComponents();
        components[i] = c; 
        this.name = components.join(this.delimiter);
    }

    insert(i: number, c: string) {
        IllegalArgumentException.assertIsNotNullOrUndefined(i, 'component number cannot be null or undefined');
        IllegalArgumentException.assertIsNotNullOrUndefined(c, 'new component cannot be null or undefined');
        this.assertValidInsertIndex(i);
        const components = this.getComponents();
        components.splice(i, 0, c);
        this.name = components.join(this.delimiter);
    }

    append(c: string) {
        IllegalArgumentException.assertIsNotNullOrUndefined(c, 'new component cannot be null or undefined');
        this.name = this.name + this.delimiter + c;
    }

    remove(i: number) {
        IllegalArgumentException.assertIsNotNullOrUndefined(i, 'component number cannot be null or undefined');
        this.assertValidIndex(i);
        const components = this.getComponents();
        components.splice(i, 1);
        this.name = components.join(this.delimiter);
    }

    getComponents(): string[] {
        return this.name.split(this.delimiter);
    }

}