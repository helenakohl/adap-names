import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailedException } from "../common/MethodFailedException";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        super();
        this.components = source;
        if (delimiter) {
            this.delimiter = delimiter;
        }
    }

    getNoComponents(): number {
        return this.components.length;
    }

    getComponent(i: number): string {
        this.assertIsNotNullOrUndefined(i, 'component number cannot be null or undefined');
        this.assertValidIndex(i);
        return this.components[i];
    }

    setComponent(i: number, c: string) {
        this.assertIsNotNullOrUndefined(i, 'component number cannot be null or undefined');
        this.assertIsNotNullOrUndefined(c, 'new component cannot be null or undefined');
        this.assertValidIndex(i);
        this.components[i] = c;

        MethodFailedException.assert(
            this.components[i] === c,
            `component at index ${i} was not set correctly`
        );

        this.assertStringArrayNameInvariants();
    }

    insert(i: number, c: string) {
        this.assertIsNotNullOrUndefined(i, 'component number cannot be null or undefined');
        this.assertIsNotNullOrUndefined(c, 'new component cannot be null or undefined');
        this.assertValidInsertIndex(i);

        const initialCount = this.getNoComponents();
        this.components.splice(i, 0, c);

        MethodFailedException.assert(
            this.getNoComponents() === initialCount + 1, 'component could not be inserted'
        );

        this.assertStringArrayNameInvariants();
    }

    append(c: string) {
        this.assertIsNotNullOrUndefined(c, 'new component cannot be null or undefined');
        
        const initialCount = this.getNoComponents();
        this.components.push(c);

        MethodFailedException.assert(
            this.getNoComponents() === initialCount + 1, 'component could not be appended'
        );

        this.assertStringArrayNameInvariants();
    }

    remove(i: number) {
        this.assertIsNotNullOrUndefined(i, 'component number cannot be null or undefined');
        this.assertValidIndex(i);

        const initialCount = this.getNoComponents();
        this.components.splice(i, 1);

        MethodFailedException.assert(
            this.getNoComponents() === initialCount -1, 'component could not be removed'
        );

        this.assertStringArrayNameInvariants();
    }

    getComponents(): string[] {
        return this.components;
    }

    protected assertStringArrayNameInvariants(): void {
        InvalidStateException.assert(
            this.components !== null && this.components !== undefined,
            "name cannot be null or undefined"
        );

        this.components.forEach((c, i) => {
            InvalidStateException.assert(
                c !== null && c !== undefined,
                `component at index ${i} cannot be null or undefined.`
            );
            this.assertValidName(c);
        });
    }
}