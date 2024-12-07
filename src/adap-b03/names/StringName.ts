import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
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
        return this.getComponents()[i];
    }
    setComponent(i: number, c: string) {
        const components = this.getComponents();
        components[i] = c; 
        this.name = components.join(this.delimiter);
    }

    insert(i: number, c: string) {
        const components = this.getComponents();
        if (i >= 0 && i <= components.length) {
            components.splice(i, 0, c);
            this.name = components.join(this.delimiter);
        }
    }
    append(c: string) {
        this.name = this.name + this.delimiter + c;
    }
    remove(i: number) {
        const components = this.getComponents();
        if (i >= 0 && i < components.length) {
            components.splice(i, 1);
            this.name = components.join(this.delimiter);
        }
    }
    getComponents(): string[] {
        return this.name.split(this.delimiter);
    }

}