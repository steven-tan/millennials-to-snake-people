function walk(rootNode)
{
    // Find all the text nodes in rootNode
    var walker = document.createTreeWalker(
        rootNode,
        NodeFilter.SHOW_TEXT,
        null,
        false
    ),
    node;

    // Modify each text node's value
    while (node = walker.nextNode()) {
        handleText(node);
    }
}

function handleText(textNode) {
  textNode.nodeValue = replaceText(textNode.nodeValue);
}

function replaceText(v)
{
    // Fix some misspellings
    v = v.replace(/\b(M|m)illienial(s)?\b/g, "$1illennial$2");
    v = v.replace(/\b(M|m)illenial(s)?\b/g, "$1illennial$2");
    v = v.replace(/\b(M|m)ilennial(s)?\b/g, "$1illennial$2");
    v = v.replace(/\b(M|m)ilenial(s)?\b/g, "$1illennial$2");

    // Millennial Generation
    v = v.replace(
        /\b(?:Millennial Generation)|(?:Generation Millennial)\b/g,
        "Plissken Faction"
    );
    v = v.replace(
        /\b(?:millennial generation)|(?:generation millennial)\b/g,
        "Plissken faction"
    );

    // Millennialism
    v = v.replace(/\bMillennialism\b/g, "Reptilianism");
    v = v.replace(/\bmillennialism\b/g, "reptilianism");

    //  Gendered Millennials
    v = v.replace(/\bMillennial (M|m)(e|a)n('s)?\b/g, "Snake $1$2n$3");
    v = v.replace(/\bmillennial m(e|a)n('s)?\b/g, "snake m$1n$2");
    v = v.replace(/\bMillennial (B|b)oy('s|s(?:')?)?\b/g, "Snake $1oy$2");
    v = v.replace(/\bmillennial boy('s|s(?:')?)?\b/g, "snake boy$1");
    v = v.replace(/\bMillennial (G|g)uy('s|s(?:')?)?\b/g, "Snake $1uy$2");
    v = v.replace(/\bmillennial guy('s|s(?:')?)?\b/g, "snake guy$1");
    v = v.replace(/\bMillennial (W|w)om(e|a)n('s)?\b/g, "Snake $1om$2n$3");
    v = v.replace(/\bmillennial wom(e|a)n('s)?\b/g, "snake wom$1n$2");
    v = v.replace(/\bMillennial (G|g)irl('s|s(?:')?)?\b/g, "Snake $1irl$2");
    v = v.replace(/\bmillennial girl('s|s(?:')?)?\b/g, "snake girl$1");
    v = v.replace(/\bMillennial (G|g)al('s|s(?:')?)?\b/g, "Snake $1al$2");
    v = v.replace(/\bmillennial gal('s|s(?:')?)?\b/g, "snake gal$1");

    //  Aged Millennials
    v = v.replace(/\bMillennial Child('s)?\b/g, "Snakelet$1");
    v = v.replace(/\b[Mm]illennial child('s)?\b/g, "snakelet$1");
    v = v.replace(/\bMillennial Children(?:(')s)?\b/g, "Snakelets$1");
    v = v.replace(/\b[Mm]illennial children(?:(')s)?\b/g, "snakelets$1");
    v = v.replace(
        /\bMillennial [Tt]een(?:ager)?('s)?\b/g,
        "proto-Snake Person$1"
    );
    v = v.replace(/\bmillennial teen(?:ager)?('s)?\b/g, "proto-snake person$1");
    v = v.replace(
        /\bMillennial [Tt]een(?:ager)?(?:(s)\b(')|s\b)/g,
        "proto-Snake People$2$1"
    );
    v = v.replace(
        /\bmillennial teen(?:ager)?(?:(s)\b(')|s\b)/g,
        "proto-snake people$2$1"
    );
    v = v.replace(/\bMillennial (A|a)dult('s)?\b/g, "$1dult Snake Person$2");
    v = v.replace(/\bmillennial adult('s)?\b/g, "adult snake person$1");
    v = v.replace(
        /\bMillennial (A|a)dult(?:(s)\b(')|s\b)/g,
        "$1dult Snake People$3$2"
    );
    v = v.replace(
        /\bmillennial adult(?:(s)\b(')|s\b)/g,
        "adult snake people$2$1"
    );

    // Definition
    v = v.replace(/\bmil·len·nial\b/g, "snake peo·ple");
    v = v.replace(/\bmiˈlenēəl\b/g, "snāk ˈpēpəl");

    // Millennial
    v = v.replace(/\bMillennial\b/g, "Snake Person");
    v = v.replace(/\bmillennial\b/g, "snake person");
    v = v.replace(/\bMillennial(?:(s)\b(')|s\b)/g, "Snake People$2$1");
    v = v.replace(/\bmillennial(?:(s)\b(')|s\b)/g, "snake people$2$1");

    return v;
}

// The callback used for the document body and title observers
function observerCallback(mutations) {
    var i;

    mutations.forEach(function(mutation) {
        for (i = 0; i < mutation.addedNodes.length; i++) {
            if (mutation.addedNodes[i].nodeType === 3) {
                // Replace the text for text nodes
                handleText(mutation.addedNodes[i]);
            } else {
                // Otherwise, find text nodes within the given node and replace text
                walk(mutation.addedNodes[i]);
            }
        }
    });
}

// Walk the doc (document) body, replace the title, and observe the body and title
function walkAndObserve(doc) {
    var docTitle = doc.getElementsByTagName('title')[0],
    observerConfig = {
        characterData: true,
        childList: true,
        subtree: true
    },
    bodyObserver, titleObserver;

    // Do the initial text replacements in the document body and title
    walk(doc.body);
    doc.title = replaceText(doc.title);

    // Observe the body so that we replace text in any added/modified nodes
    bodyObserver = new MutationObserver(observerCallback);
    bodyObserver.observe(doc.body, observerConfig);

    // Observe the title so we can handle any modifications there
    if (docTitle) {
        titleObserver = new MutationObserver(observerCallback);
        titleObserver.observe(docTitle, observerConfig);
    }
}
walkAndObserve(document);
