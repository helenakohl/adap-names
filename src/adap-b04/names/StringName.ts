import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailedException } from "../common/MethodFailedException";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        super();
        this.name = source;
        this.noComponents = this.getNoComponents();
        if (delimiter) {
            this.delimiter = delimiter;
        }
    }

    getNoComponents(): number {
        return this.getComponents().length;
    }

    getComponent(i: number): string {
        this.assertIsNotNullOrUndefined(i, 'component number cannot be null or undefined');
        this.assertValidIndex(i);
        return this.getComponents()[i];
    }

    setComponent(i: number, c: string) {
        this.assertIsNotNullOrUndefined(i, 'component number cannot be null or undefined');
        this.assertIsNotNullOrUndefined(c, 'new component cannot be null or undefined');
        this.assertValidIndex(i);
        const components = this.getComponents();
        components[i] = c; 
        this.name = components.join(this.delimiter);

        MethodFailedException.assert(
            this.getComponent(i) === c,
            `component at index ${i} was not set correctly`
        );

        this.assertStringNameInvariants();
    }

    insert(i: number, c: string) {
        this.assertIsNotNullOrUndefined(i, 'component number cannot be null or undefined');
        this.assertIsNotNullOrUndefined(c, 'new component cannot be null or undefined');
        this.assertValidInsertIndex(i);

        const initialCount = this.getNoComponents();
        const components = this.getComponents();
        components.splice(i, 0, c);
        this.name = components.join(this.delimiter);

        MethodFailedException.assert(
            this.getNoComponents() === initialCount + 1, 'component could not be inserted'
        );

        this.assertStringNameInvariants();
    }

    append(c: string) {
        this.assertIsNotNullOrUndefined(c, 'new component cannot be null or undefined');

        const initialCount = this.getNoComponents();
        this.name = this.name + this.delimiter + c;

        MethodFailedException.assert(
            this.getNoComponents() === initialCount + 1, 'component could not be appended'
        );

        this.assertStringNameInvariants();
    }

    remove(i: number) {
        this.assertIsNotNullOrUndefined(i, 'component number cannot be null or undefined');
        this.assertValidIndex(i);

        const initialCount = this.getNoComponents();
        const components = this.getComponents();
        components.splice(i, 1);
        this.name = components.join(this.delimiter);

        MethodFailedException.assert(
            this.getNoComponents() === initialCount - 1, 'component could not be removed'
        );

        this.assertStringNameInvariants();
    }

    getComponents(): string[] {
        return this.name.split(this.delimiter);
    }

    protected assertStringNameInvariants(): void {
        InvalidStateException.assert(
            this.name !== null && this.name !== undefined,
            "name cannot not be null or undefined"
        );
    }
}