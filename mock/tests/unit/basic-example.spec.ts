import { expect, test } from "vitest";
import { addFunc } from "/Users/madeleinepoissonnier/Desktop/cs32/mock-mpoisso1-smdunbar/mock/src/components/REPLFunction";
import { removeFunc } from "/Users/madeleinepoissonnier/Desktop/cs32/mock-mpoisso1-smdunbar/mock/src/components/REPLFunction";
import { REPLFunction } from "/Users/madeleinepoissonnier/Desktop/cs32/mock-mpoisso1-smdunbar/mock/src/components/REPLFunction";

/**
 * Unit test testing the addFunc function definted in REPLFunction
 */
test("adding to map", () => {
  var emptyMap = new Map();
  const hello: REPLFunction = (args: string[]): string | string[][] => {
    return "hello";
  };
  addFunc(emptyMap, "saying hi", hello);
  expect(emptyMap.size).toBe(1);
});

/**
 * Unit test testing the removeFunc function definted in REPLFunction
 */
test("deleting from map", () => {
  var emptyMap = new Map();
  const hello: REPLFunction = (args: string[]): string | string[][] => {
    return "hello";
  };
  addFunc(emptyMap, "saying hi", hello);
  const bye: REPLFunction = (args: string[]): string | string[][] => {
    return "bye";
  };
  addFunc(emptyMap, "saying bye", bye);
  removeFunc(emptyMap, "saying bye");
  expect(emptyMap.size).toBe(1);
});
