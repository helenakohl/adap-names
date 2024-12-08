import { describe, it, expect } from "vitest";

import { Name } from "../../../src/adap-b06/names/Name";
import { AbstractName } from "../../../src/adap-b06/names/AbstractName";
import { StringArrayName } from "../../../src/adap-b06/names/StringArrayName";
import { StringName } from "../../../src/adap-b06/names/StringName";

describe("Equality test", () => {
    it("test isEqual", () => {
      let a1: Name = new StringArrayName(["a", "b", "c"], '.');
      let s1: Name = new StringName("a.b.c");
      expect(a1.isEqual(s1)).toBe(true);
      expect(a1.getHashCode() == s1.getHashCode()).toBe(true);
  
      a1 = a1.setComponent(0, "x");
      s1 = s1.setComponent(0, "x");
      expect(a1.isEqual(s1)).toBe(true);
      expect(a1.getHashCode() == s1.getHashCode()).toBe(true); 

      a1 = a1.setComponent(0, "x");
      s1 = s1.setComponent(0, "z");
      expect(a1.isEqual(s1)).toBe(false);
      expect(a1.getHashCode() == s1.getHashCode()).toBe(false); 
  
    });
  });
