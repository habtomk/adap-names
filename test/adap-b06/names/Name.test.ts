import { describe, it, expect } from "vitest";
import { Name } from "../../../src/adap-b06/names/Name";
import { StringName } from "../../../src/adap-b06/names/StringName";
import { StringArrayName } from "../../../src/adap-b06/names/StringArrayName";

describe("Value Object & Immutability Tests", () => {

  it("should enforce immutability on append", () => {
    const original = new StringName("oss.cs.fau");
    const modified = original.append("de");

    // 1. The new object should be correct
    expect(modified.asString()).toBe("oss.cs.fau.de");

    // 2. The original object must remain unchanged
    expect(original.asString()).toBe("oss.cs.fau");

    // 3. They must be different instances (reference inequality)
    expect(original).not.toBe(modified);
  });

  it("should enforce immutability on remove", () => {
    const original = new StringArrayName(["oss", "cs", "fau", "de"]);
    const modified = original.remove(0);

    expect(modified.asString()).toBe("cs.fau.de");
    expect(original.asString()).toBe("oss.cs.fau.de");
    expect(original).not.toBe(modified);
  });

  it("should enforce immutability on insert", () => {
    const original = new StringName("oss.fau.de");
    const modified = original.insert(1, "cs");

    expect(modified.asString()).toBe("oss.cs.fau.de");
    expect(original.asString()).toBe("oss.fau.de");
    expect(original).not.toBe(modified);
  });

  it("should treat different implementations as equal if content matches", () => {
    const n1 = new StringName("oss.cs.fau.de");
    const n2 = new StringArrayName(["oss", "cs", "fau", "de"]);

    // Value equality
    expect(n1.isEqual(n2)).toBe(true);
    expect(n2.isEqual(n1)).toBe(true);

    // Hash code equality
    expect(n1.getHashCode()).toBe(n2.getHashCode());
  });

  it("should handle delimiters correctly during cloning", () => {
    const n1 = new StringName("a#b", '#');
    const n2 = n1.clone();

    expect(n1.isEqual(n2)).toBe(true);
    expect(n1).not.toBe(n2); // Clone returns new instance
    expect(n2.getDelimiterCharacter()).toBe('#');
  });

});