import { describe, it, expect } from "vitest";
import { mapPackage } from "./membershipApi";

describe("mapPackage", () => {
  it("maps a fully-populated package", () => {
    const result = mapPackage(
      {
        id: 1,
        name: "Founding",
        description: "Best value",
        is_default: false,
        package_prices: [
          { amount: 50, frequency: "M", section: "Individual" },
          { amount: 600, frequency: "Y", section: "Individual" }
        ],
        benefit_details: "<ul><li>Free rentals</li><li>Zero fees</li></ul>"
      },
      0
    );

    expect(result.name).toBe("Founding");
    expect(result.price).toBe("$50");
    expect(result.period).toBe("/month");
    expect(result.billing).toBe("or $600 billed annually");
    expect(result.amount).toBe(50);
    expect(result.audience).toEqual(["Best value", "Not uploaded yet"]);
    expect(result.benefits).toEqual(["Free rentals", "Zero fees"]);
    expect(result.isComplete).toBe(true);
  });

  it("falls back to 'Not uploaded yet' for missing fields", () => {
    const result = mapPackage({ id: 2, name: "", description: null, package_prices: [], benefit_details: null }, 0);

    expect(result.name).toBe("Not uploaded yet");
    expect(result.price).toBe("Not uploaded yet");
    expect(result.billing).toBe("Not uploaded yet");
    expect(result.amount).toBe(0);
    expect(result.audience).toEqual(["Not uploaded yet", "Not uploaded yet"]);
    expect(result.benefits).toEqual(["Not uploaded yet"]);
    expect(result.isComplete).toBe(false);
  });

  it("caps benefits at 5 lines", () => {
    const result = mapPackage(
      {
        id: 3,
        name: "X",
        package_prices: [{ amount: 10, frequency: "M", section: "Individual" }],
        benefit_details: "<div>a</div><div>b</div><div>c</div><div>d</div><div>e</div><div>f</div>"
      },
      0
    );

    expect(result.benefits).toHaveLength(5);
  });
});
