import { describe, it, expect } from "vitest";
import { splitPhone, extractToken, extractUser } from "./authApi";

describe("splitPhone", () => {
  it("defaults country to +1 for a bare number", () => {
    expect(splitPhone("5123213123")).toEqual({ country: "+1", phone: "5123213123" });
  });

  it("parses an explicit country code", () => {
    expect(splitPhone("+44 7911 123456")).toEqual({ country: "+44", phone: "7911123456" });
  });

  it("strips non-digits from the number", () => {
    expect(splitPhone("+1 (512) 321-3123")).toEqual({ country: "+1", phone: "5123213123" });
  });

  it("handles empty/undefined input", () => {
    expect(splitPhone("")).toEqual({ country: "+1", phone: "" });
    expect(splitPhone(undefined)).toEqual({ country: "+1", phone: "" });
  });
});

describe("extractToken", () => {
  it("reads common token field names", () => {
    expect(extractToken({ token: "a" })).toBe("a");
    expect(extractToken({ access_token: "b" })).toBe("b");
    expect(extractToken({ data: { token: "c" } })).toBe("c");
    expect(extractToken({ data: { access_token: "d" } })).toBe("d");
  });

  it("returns null when no token is present", () => {
    expect(extractToken({})).toBeNull();
    expect(extractToken(null)).toBeNull();
  });
});

describe("extractUser", () => {
  it("maps the verifyEmailOTP success shape (nested email/phone)", () => {
    const response = {
      status: "success",
      token: "jwt",
      user: {
        name: "nisartm.uae",
        last_name: null,
        dob: null,
        profile_image: null,
        user_email: { email: "nisartm.uae@gmail.com" },
        user_phone: null
      }
    };

    expect(extractUser(response)).toEqual({
      firstName: "nisartm.uae",
      lastName: "",
      email: "nisartm.uae@gmail.com",
      mobile: "",
      birthday: "",
      photo: ""
    });
  });

  it("reads a nested phone and a full name", () => {
    const result = extractUser({
      user: { name: "John Doe", user_phone: { phone: "5123213123" }, user_email: { email: "j@x.com" } }
    });
    expect(result.firstName).toBe("John");
    expect(result.lastName).toBe("Doe");
    expect(result.mobile).toBe("5123213123");
  });

  it("returns null when there's no user", () => {
    expect(extractUser({ token: "x" })).toBeNull();
    expect(extractUser(null)).toBeNull();
  });
});
