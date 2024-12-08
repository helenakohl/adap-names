import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailedException } from "../common/MethodFailedException";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        super();
        this.components = source;
        if (delimiter) {
            this.assertValidDelimiter(delimiter);
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

    setComponent(i: number, c: string): Name {
        this.assertIsNotNullOrUndefined(i, 'component number cannot be null or undefined');
        this.assertIsNotNullOrUndefined(c, 'new component cannot be null or undefined');
        this.assertValidIndex(i);
        this.assertValidName(c);

        const resultComponents = [...this.components];
        resultComponents[i] = c;
        const result = new StringArrayName(resultComponents, this.delimiter);

        MethodFailedException.assert(
            result.components[i] === c,
            `component at index ${i} was not set correctly`
        );
        result.assertStringArrayNameInvariants();

        return result;
    }

    insert(i: number, c: string): Name {
        this.assertIsNotNullOrUndefined(i, 'component number cannot be null or undefined');
        this.assertIsNotNullOrUndefined(c, 'new component cannot be null or undefined');
        this.assertValidName(c); 
        this.assertValidInsertIndex(i);

        const initialCount = this.getNoComponents();

        const resultComponents = [...this.components];
        resultComponents.splice(i, 0, c);
        const result = new StringArrayName(resultComponents, this.delimiter);

        MethodFailedException.assert(
            result.getNoComponents() === initialCount + 1, 'component could not be inserted'
        );
        result.assertStringArrayNameInvariants();

        return result;
    }

    append(c: string): Name {
        this.assertIsNotNullOrUndefined(c, 'new component cannot be null or undefined');
        this.assertValidName(c);
        
        const initialCount = this.getNoComponents();

        const resultComponents = [...this.components];
        resultComponents.push(c);
        const result = new StringArrayName(resultComponents, this.delimiter);

        MethodFailedException.assert(
            result.getNoComponents() === initialCount + 1, 'component could not be appended'
        );
        result.assertStringArrayNameInvariants();

        return result;
    }

    remove(i: number): Name {
        this.assertIsNotNullOrUndefined(i, 'component number cannot be null or undefined');
        this.assertValidIndex(i);

        const initialCount = this.getNoComponents();

        const resultComponents = [...this.components];
        resultComponents.splice(i, 1);
        const result = new StringArrayName(resultComponents, this.delimiter);

        MethodFailedException.assert(
            this.getNoComponents() === initialCount -1, 'component could not be removed'
        );
        this.assertStringArrayNameInvariants();

        return result;
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