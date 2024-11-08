import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    protected name: string = "";
    protected length: number = 0;

    constructor(other: string, delimiter?: string) {
        this.name = other;
        if (delimiter) {
            this.delimiter = delimiter;
        }
    }

    public asString(delimiter: string = this.delimiter): string {
        return this.getComponents().join(delimiter);
    }

    public asDataString(): string {
        return this.getComponents().join(ESCAPE_CHARACTER + this.delimiter);
    }

    public isEmpty(): boolean {
        return this.name.length === 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public getNoComponents(): number {
        return this.getComponents().length;
    }

    public getComponent(x: number): string {
        return this.getComponents()[x];
    }

    public setComponent(n: number, c: string): void {
        const components = this.getComponents();
        components[n] = c; 
        this.name = components.join(this.delimiter);
    }

    public insert(n: number, c: string): void {
        const components = this.getComponents();
        if (n >= 0 && n <= components.length) {
            components.splice(n, 0, c);
            this.name = components.join(this.delimiter);
        }
    }

    public append(c: string): void {
        this.name = this.name + this.delimiter + c;
    }

    public remove(n: number): void {
        const components = this.getComponents();
        if (n >= 0 && n < components.length) {
            components.splice(n, 1);
            this.name = components.join(this.delimiter);
        }
    }

    public concat(other: Name): void {
        for (let i = 0; i < other.getNoComponents(); i ++) {
            this.append(other.getComponent(i));
        }
    }

    public getComponents(): string[] {
        return this.name.split(this.delimiter);
    }

}