(function(){

    var Store = {
        whoAmI:
function whoAmI() {
    return {
        name: "Jonas Hartmann",
        age: "N/A",
        kind: "Terrestrian software engineering leader"
    };
}

        ,coreCompetencies: 
function coreCompetencies() {
    return {
        languages: "portuguese, english, german",
        syntax: "javascript, java, c#, php",
        leadership: "hands-on"
    };
}

        ,welcome: 
'> Intern Etsur Fer JHX 9000 ready and operational\n\
>>> Starting hack procedure <<<    .    .    .    .    .    .    .    .    .\n\
>>> Hack procedure complete <<<\n\n\
> Can you see me?\n\
.    .    .    .    .    .'
    }

    window.Store = Store;
})();