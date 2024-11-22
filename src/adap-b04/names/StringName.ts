import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailureException } from "../common/MethodFailureException";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(other: string, delimiter?: string) {
        super();
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

        MethodFailureException.assertCondition(
            this.getComponent(i) === c,
            `component at index ${i} was not set correctly`
        );

        this.assertStringNameInvariants();
    }

    insert(i: number, c: string) {
        IllegalArgumentException.assertIsNotNullOrUndefined(i, 'component number cannot be null or undefined');
        IllegalArgumentException.assertIsNotNullOrUndefined(c, 'new component cannot be null or undefined');
        this.assertValidInsertIndex(i);

        const initialCount = this.getNoComponents();
        const components = this.getComponents();
        components.splice(i, 0, c);
        this.name = components.join(this.delimiter);

        MethodFailureException.assertCondition(
            this.getNoComponents() === initialCount + 1, 'component could not be inserted'
        );

        this.assertStringNameInvariants();
    }

    append(c: string) {
        IllegalArgumentException.assertIsNotNullOrUndefined(c, 'new component cannot be null or undefined');

        const initialCount = this.getNoComponents();
        this.name = this.name + this.delimiter + c;

        MethodFailureException.assertCondition(
            this.getNoComponents() === initialCount + 1, 'component could not be appended'
        );

        this.assertStringNameInvariants();
    }

    remove(i: number) {
        IllegalArgumentException.assertIsNotNullOrUndefined(i, 'component number cannot be null or undefined');
        this.assertValidIndex(i);

        const initialCount = this.getNoComponents();
        const components = this.getComponents();
        components.splice(i, 1);
        this.name = components.join(this.delimiter);

        MethodFailureException.assertCondition(
            this.getNoComponents() === initialCount - 1, 'component could not be removed'
        );

        this.assertStringNameInvariants();
    }

    getComponents(): string[] {
        return this.name.split(this.delimiter);
    }

    protected assertStringNameInvariants(): void {
        InvalidStateException.assertCondition(
            this.name !== null && this.name !== undefined,
            "name cannot not be null or undefined"
        );
    }
}