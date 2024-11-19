import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

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
        return this.components[i];
    }
    setComponent(i: number, c: string) {
        this.components[i] = c;
    }

    insert(i: number, c: string) {
        if (i >= 0 && i <= this.components.length) {
            this.components.splice(i, 0, c);
        }
    }
    append(c: string) {
        this.components.push(c);
    }
    remove(i: number) {
        if (i >= 0 && i < this.components.length) {
            this.components.splice(i, 1);
        };
    }
    getComponents(): string[] {
        return this.components;
    }
}