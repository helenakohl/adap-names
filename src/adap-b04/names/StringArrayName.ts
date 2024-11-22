import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailureException } from "../common/MethodFailureException";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(other: string[], delimiter?: string) {
        super();
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

        MethodFailureException.assertCondition(
            this.components[i] === c,
            `component at index ${i} was not set correctly`
        );

        this.assertStringArrayNameInvariants();
    }

    insert(i: number, c: string) {
        IllegalArgumentException.assertIsNotNullOrUndefined(i, 'component number cannot be null or undefined');
        IllegalArgumentException.assertIsNotNullOrUndefined(c, 'new component cannot be null or undefined');
        this.assertValidInsertIndex(i);

        const initialCount = this.getNoComponents();
        this.components.splice(i, 0, c);

        MethodFailureException.assertCondition(
            this.getNoComponents() === initialCount + 1, 'component could not be inserted'
        );

        this.assertStringArrayNameInvariants();
    }

    append(c: string) {
        IllegalArgumentException.assertIsNotNullOrUndefined(c, 'new component cannot be null or undefined');
        
        const initialCount = this.getNoComponents();
        this.components.push(c);

        MethodFailureException.assertCondition(
            this.getNoComponents() === initialCount + 1, 'component could not be appended'
        );

        this.assertStringArrayNameInvariants();
    }

    remove(i: number) {
        IllegalArgumentException.assertIsNotNullOrUndefined(i, 'component number cannot be null or undefined');
        this.assertValidIndex(i);

        const initialCount = this.getNoComponents();
        this.components.splice(i, 1);

        MethodFailureException.assertCondition(
            this.getNoComponents() === initialCount -1, 'component could not be removed'
        );

        this.assertStringArrayNameInvariants();
    }

    getComponents(): string[] {
        return this.components;
    }

    protected assertStringArrayNameInvariants(): void {
        InvalidStateException.assertCondition(
            this.components !== null && this.components !== undefined,
            "name cannot be null or undefined"
        );

        this.components.forEach((c, i) => {
            InvalidStateException.assertCondition(
                c !== null && c !== undefined,
                `component at index ${i} cannot be null or undefined.`
            );
            this.assertValidName(c);
        });
    }
}