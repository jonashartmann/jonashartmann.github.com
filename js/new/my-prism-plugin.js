(function(Prism) {
    'use strict';

    Prism.languages.hack = {
        'string': {
            pattern: /[\w?]+/i,
            greedy: true
        },
        'keyword': /[>.•<]+/
    };
})(Prism);