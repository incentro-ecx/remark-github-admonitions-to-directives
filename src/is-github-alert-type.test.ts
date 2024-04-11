import { describe, expect, it } from "vitest";
import { GithubAlertType } from "./github-alert.type.js";
import { isGithubAlertType } from "./is-github-alert-type.js";

describe("is-github-alert-type", () => {
  it("should return false for an undefined value", () => {
    expect(isGithubAlertType(undefined)).toEqual(false);
  });

  it("should return false for a null value", () => {
    expect(isGithubAlertType(null)).toEqual(false);
  });

  it("should return false for a string value not equal to a GitHub alert type", () => {
    expect(isGithubAlertType("test")).toEqual(false);
  });

  it("should return true for a value directly taken from the GitHub alert type enum", () => {
    expect(isGithubAlertType(GithubAlertType.WARNING)).toEqual(true);
  });

  it("should return true for a string value that equals an alert type", () => {
    expect(isGithubAlertType("IMPORTANT")).toEqual(true);
  });

  it("should return false for a string value with the wrong capitalization", () => {
    expect(isGithubAlertType("important")).toEqual(false);
  });
});
