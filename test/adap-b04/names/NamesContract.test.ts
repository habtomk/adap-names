import { describe, it, expect } from "vitest";

import { StringName } from "../../../src/adap-b04/names/StringName";
import { StringArrayName } from "../../../src/adap-b04/names/StringArrayName";
import { IllegalArgumentException } from "../../../src/adap-b04/common/IllegalArgumentException";
import { InvalidStateException } from "../../../src/adap-b04/common/InvalidStateException";

describe("StringName contract checks", () => {
  it("rejects non-string constructor input (precondition)", () => {
    expect(() => new StringName(123 as any)).toThrow(IllegalArgumentException);
  });

  it("guards index bounds (precondition)", () => {
    const name = new StringName("a.b.c");
    expect(() => name.getComponent(3)).toThrow(IllegalArgumentException);
  });

  it("catches broken invariants", () => {
    const name = new StringName("a");
    (name as any).noComponents = -1; // force invariant violation
    expect(() => name.asString()).toThrow(InvalidStateException);
  });
});

describe("StringArrayName contract checks", () => {
  it("requires string components on append (precondition)", () => {
    const name = new StringArrayName(["a"]);
    expect(() => name.append(5 as any)).toThrow(IllegalArgumentException);
  });

  it("flags invariant violations when delimiter is broken", () => {
    const name = new StringArrayName(["a", "b"]);
    (name as any).delimiter = ""; // break invariant
    expect(() => name.asDataString()).toThrow(InvalidStateException);
  });

  it("keeps postconditions on append", () => {
    const name = new StringArrayName(["a"]);
    name.append("b");
    expect(name.getNoComponents()).toBe(2);
    expect(name.asDataString()).toBe("a.b");
  });
});
