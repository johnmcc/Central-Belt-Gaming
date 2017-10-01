class SearchTerms {
    constructor(term){
        this.term = term.toLowerCase().trim();
        this.search_strings = [
            ["x-wing", "xwing", "x wing"],
            ["mtg", "magic", "magic the gathering"],
            ["destiny", "star wars destiny"],
            ["game of thrones", "got", "agot"],
            ["l5r", "legend of the five rings", "legend"]
        ];
    }

    getTermArray(){
        for(let arr of this.search_strings){
            if(arr.indexOf(this.term) > -1){
                var terms = arr;
            }
        }

        if(terms === undefined){
            terms = [this.term];
        }

        return terms;
    }
}

export default SearchTerms;
