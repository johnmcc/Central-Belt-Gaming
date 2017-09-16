import SearchTerms from './SearchTerms';

describe("SearchTerms", () => {
    it("should be an object", () => {
        const st = new SearchTerms("ticket");
        expect(typeof(st)).toBe("object");
    });

    it("should return an array with one element when no matching term", () => {
        const st = new SearchTerms("ticket");
        expect(st.getTermArray()).toEqual(["ticket"]);
    });

    it("should lowercase the provided search term", () => {
        const st = new SearchTerms("Ticket");
        expect(st.getTermArray()).toEqual(["ticket"]);
    });

    it("should provide relevant matches", () => {
        const st = new SearchTerms("MTG");
        expect(st.getTermArray()).toEqual(["mtg", "magic", "magic the gathering"]);
    });

});
