import { Node } from "./Node";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export class Directory extends Node {

    protected childNodes: Set<Node> = new Set<Node>();

    constructor(bn: string, pn: Directory) {
        super(bn, pn);
    }

    public hasChildNode(cn: Node): boolean {
        return this.childNodes.has(cn);
    }

    public addChildNode(cn: Node): void {
        this.childNodes.add(cn);
    }

    public removeChildNode(cn: Node): void {
        this.childNodes.delete(cn); // Yikes! Should have been called remove
    }

    public findNodes(bn: string): Set<Node> {
        const results: Set<Node> = this.findNodes(bn); 
    
        for (const child of this.childNodes) {
            const childMatches = child.findNodes(bn);
            for (const match of childMatches) {
                results.add(match);
            }
        }
    
        return results;
    }

}