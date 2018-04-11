(function(){

    var Store = {
        who:
function who() {
    return {
        name: "Jonas Hartmann",
        location: "Berlin",
        species: "Terrestrian software engineering leader",
        personality: "An open-minded and collaborative leader that keeps his head clear " 
        + "to prepare for, adapt to and face any challenges of IT life"
    };
}

        ,skills: 
function skills() {
    return {
        skills: "javascript, java, c#, php",
        leadership: "hands-on",
        languages: {
            english: "fluent",
            german: "advanced",
            portuguese: "native",
            korean: "very basic"
        }
    };
}

        ,hack: 
'>>> Starting hack procedure <<<\n\
. . . . . . . . .\n\
. . . . . . . . .\n\
>>> Hack procedure complete <<<\n\
. . . . . . . . .\n\
>>> JHX 9000 ready and operational <<<\n\
>>> Available commands: <<<\n\
who\n\
skills\n\
'
    }

    window.Store = Store;
})();