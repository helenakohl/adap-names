import { describe, it, expect } from "vitest";

import { Name } from "../../../src/adap-b04/names/Name";
import { StringName } from "../../../src/adap-b04/names/StringName";
import { StringArrayName } from "../../../src/adap-b04/names/StringArrayName";

import { IllegalArgumentException } from "../../../src/adap-b04/common/IllegalArgumentException";

describe("StringName function tests", () => {
    it("test insert", () => {
        let n: Name = new StringName("oss.fau.de", ".");
        n.insert(1, "cs");
        expect(n.asString()).toBe("oss.cs.fau.de");

        expect(() => n.insert(-1, "x")).toThrowError(IllegalArgumentException);
        expect(() => n.insert(5, "x")).toThrowError(IllegalArgumentException);

        expect(() => n.insert(1, "x.x")).toThrowError(IllegalArgumentException);
    });

    it("test append", () => {
        let n: Name = new StringName("oss.cs.fau", ".");
        n.append("de");
        expect(n.asString()).toBe("oss.cs.fau.de");

        expect(() => n.append("x.x")).toThrowError(IllegalArgumentException);
    });
    it("test remove", () => {
        let n: Name = new StringName("oss.cs.fau.de", ".");
        n.remove(0);
        expect(n.asString()).toBe("cs.fau.de");

        expect(() => n.remove(-1)).toThrowError(IllegalArgumentException);
        expect(() => n.remove(3)).toThrowError(IllegalArgumentException);
    });
    it("test setComponent", () => {
        let n: Name = new StringName("oss.cs.fau.de", ".");
        n.setComponent(1, "xyz");
        expect(n.asString()).toBe("oss.xyz.fau.de");

        expect(() => n.setComponent(1, "x.x")).toThrowError(IllegalArgumentException);
        expect(() => n.setComponent(-1, "x")).toThrowError(IllegalArgumentException);
        expect(() => n.setComponent(4, "x")).toThrowError(IllegalArgumentException);
    });
    it("test getComponent", () => {
        let n: Name = new StringName("oss.cs.fau.de", ".");
        expect(n.getComponent(1)).toBe("cs");

        expect(() => n.getComponent(-1)).toThrowError(IllegalArgumentException);
        expect(() => n.getComponent(4)).toThrowError(IllegalArgumentException);
    });
});

describe("StringArrayName function tests", () => {
    it("test insert", () => {
      let n: Name = new StringArrayName(["oss", "fau", "de"], ".");
      n.insert(1, "cs");
      expect(n.asString()).toBe("oss.cs.fau.de");
  
      expect(() => n.insert(-1, "x")).toThrowError(IllegalArgumentException);
      expect(() => n.insert(5, "x")).toThrowError(IllegalArgumentException);
  
      expect(() => n.insert(1, "x.x")).toThrowError(IllegalArgumentException);
    });
  
    it("test append", () => {
      let n: Name = new StringArrayName(["oss", "cs", "fau"], ".");
      n.append("de");
      expect(n.asString()).toBe("oss.cs.fau.de");
  
      expect(() => n.append("x.x")).toThrowError(IllegalArgumentException);
    });
  
    it("test remove", () => {
      let n: Name = new StringArrayName(["oss", "cs", "fau", "de"], ".");
      n.remove(0);
      expect(n.asString()).toBe("cs.fau.de");
  
      expect(() => n.remove(-1)).toThrowError(IllegalArgumentException);
      expect(() => n.remove(3)).toThrowError(IllegalArgumentException);
    });
  
    it("test setComponent", () => {
      let n: Name = new StringArrayName(["oss", "cs", "fau", "de"], ".");
      n.setComponent(1, "xyz");
      expect(n.asString()).toBe("oss.xyz.fau.de");
  
      expect(() => n.setComponent(1, "x.x")).toThrowError(IllegalArgumentException);
      expect(() => n.setComponent(-1, "x")).toThrowError(IllegalArgumentException);
      expect(() => n.setComponent(4, "x")).toThrowError(IllegalArgumentException);
    });
  
    it("test getComponent", () => {
      let n: Name = new StringArrayName(["oss", "cs", "fau", "de"], ".");
      expect(n.getComponent(1)).toBe("cs");
  
      expect(() => n.getComponent(-1)).toThrowError(IllegalArgumentException);
      expect(() => n.getComponent(4)).toThrowError(IllegalArgumentException);
    });
  });

describe("Escape character and delimiter test", () => {
    it("test escape and delimiter conditions", () => {
        let n: Name = new StringName("oss.cs.fau.de", "#");
        expect(n.getNoComponents()).toBe(1);
        expect(n.asString()).toBe("oss.cs.fau.de");

        n.append("people");
        expect(n.asString()).toBe("oss.cs.fau.de#people");
    });
    it("test constructor", () => {
        expect(() => {let n = new StringName("oss.fau.de", "\\");}).toThrowError(IllegalArgumentException);
        expect(() => {let n = new StringArrayName(["oss","fau", "de"], "..");}).toThrowError(IllegalArgumentException);
    });
});
