import { describe, it, expect } from "vitest";

import { Name } from "../../../src/adap-b04/names/Name";
import { StringName } from "../../../src/adap-b04/names/StringName";
import { StringArrayName } from "../../../src/adap-b04/names/StringArrayName";

describe("Basic StringName function tests", () => {
  it("test insert", () => {
    let n: Name = new StringName("oss.fau.de", ".");
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
  it("test append", () => {
    let n: Name = new StringName("oss.cs.fau", ".");
    n.append("de");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
  it("test remove", () => {
    let n: Name = new StringName("oss.cs.fau.de", ".");
    n.remove(0);
    expect(n.asString()).toBe("cs.fau.de");
  });
  it("test setComponent", () => {
    let n: Name = new StringName("oss.cs.fau.de", ".");
    n.setComponent(1, "xyz");
    expect(n.asString()).toBe("oss.xyz.fau.de");
  });
  it("test getComponent", () => {
    let n: Name = new StringName("oss.cs.fau.de", ".");
    expect(n.getComponent(1)).toBe("cs");
  });
});

describe("Delimiter function tests", () => {
  it("test insert with custom delimiter", () => {
    let n: Name = new StringName("oss#fau#de", "#");
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss#cs#fau#de");
  });
});

describe("Escape character handling", () => {
  it("test escape and delimiter boundary conditions", () => {
    let n: Name = new StringName("oss.cs.fau.de", "#");
    expect(n.getNoComponents()).toBe(1);
    expect(n.asString()).toBe("oss.cs.fau.de");
    n.append("people");
    expect(n.asString()).toBe("oss.cs.fau.de#people");
  });
});