import StoreNames from './StoreNames';

describe("StoreNames", () => {
    it("can be imported", () => {
        expect(typeof(StoreNames)).toBe("object");
    });

    it("has a length of more than zero", () => {
        expect(StoreNames.length).not.toBe(0);
    });

    it("should contain certain shops", () => {
        const expected = ["WarhammerGlasgow"];
        expect(StoreNames).toEqual(expect.arrayContaining(expected));
    });
});
