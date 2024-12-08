import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
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
            this.assertValidDelimiter(delimiter);
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

    setComponent(i: number, c: string): Name {
        this.assertIsNotNullOrUndefined(i, 'component number cannot be null or undefined');
        this.assertIsNotNullOrUndefined(c, 'new component cannot be null or undefined');
        this.assertValidName(c);
        this.assertValidIndex(i);

        const components = this.getComponents();
        components[i] = c; 
        const result = new StringName(components.join(this.delimiter), this.delimiter);

        MethodFailedException.assert(
            result.getComponent(i) === c,
            `component at index ${i} was not set correctly`
        );
        this.assertStringNameInvariants();

        return result;
    }

    insert(i: number, c: string): Name {
        this.assertIsNotNullOrUndefined(i, 'component number cannot be null or undefined');
        this.assertIsNotNullOrUndefined(c, 'new component cannot be null or undefined');
        this.assertValidName(c); 
        this.assertValidInsertIndex(i);

        const initialCount = this.getNoComponents();

        const components = this.getComponents();
        components.splice(i, 0, c);
        const result = new StringName(components.join(this.delimiter), this.delimiter);

        MethodFailedException.assert(
            result.getNoComponents() === initialCount + 1, 'component could not be inserted'
        );
        this.assertStringNameInvariants();

        return result;
    }

    append(c: string): Name {
        this.assertIsNotNullOrUndefined(c, 'new component cannot be null or undefined');
        this.assertValidName(c); 

        const initialCount = this.getNoComponents();

        const result = new StringName(this.name + this.delimiter + c, this.delimiter)

        MethodFailedException.assert(
            result.getNoComponents() === initialCount + 1, 'component could not be appended'
        );
        this.assertStringNameInvariants();

        return result;
    }

    remove(i: number): Name {
        this.assertIsNotNullOrUndefined(i, 'component number cannot be null or undefined');
        this.assertValidIndex(i);

        const initialCount = this.getNoComponents();

        const components = this.getComponents();
        components.splice(i, 1);
       const result = new StringName(components.join(this.delimiter), this.delimiter);

        MethodFailedException.assert(
            result.getNoComponents() === initialCount - 1, 'component could not be removed'
        );
        this.assertStringNameInvariants();

        return result;
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