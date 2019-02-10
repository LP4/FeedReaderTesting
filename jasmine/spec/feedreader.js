// Wait for the DOM to load
$(function() {
    // The RSS Feed...
    describe('RSS Feeds', function() {
        // Is defined if...
        it("are defined", function() {
            // This variable is defined
            expect(allFeeds).toBeTruthy();
            // And has at least one element
            expect(allFeeds.length).not.toBe(0);
        });

        // Has urls if...
        it("has urls defined", function() {
            // Every element in the array...
            allFeeds.forEach(entry => {
                // Has a url property
                expect(entry.url).toBeTruthy();
                // That url is not empty
                expect(entry.url.length).not.toBe(0);
            });
        });

        // Has names if...
        it("has names defined", function() {
            // Every element in the array
            allFeeds.forEach(entry => {
                // Has a name property defined
                expect(entry.name).toBeTruthy();
                // That name has at least one character
                expect(entry.name.length).not.toBe(0);
            });
        });
    });

    // The menu...
    describe("The menu" , function() {

        // is hidden if...
        it("is hidden", function() {
            // The body tag has the "menu-hidden" class
            // expect(document.getElementsByTagName("body")[0]).toHaveClass("menu-hidden");
            expect($("body").hasClass("menu-hidden")).toBe(true);
        });

        // can change visibility if...
        it("can change visibility", function() {
            // Get the menu icon
            let menuIconLink = document.getElementsByClassName("menu-icon-link")[0];
            // Simulate a click on the icon
            menuIconLink.click();
            // When clicked the body loses the "menu-hidden" class
            expect($("body").hasClass("menu-hidden")).toBe(false);

            // Simulate a click again
            menuIconLink.click();
            // When clicked again the body gains the "menu-hidden" class
            expect($("body").hasClass("menu-hidden")).toBe(true);
        });
    });

    // The Initial Entries...
    describe("Initial Entries", function() {

        beforeEach(function(done) { // Before each spec ("it" function)...
            // Wait till the feed has loaded
            loadFeed(0, done);
        });

        // has an entry if...
        it("has entry", function() {
            // The feed has child elements
            expect($(".feed .entry").length).not.toBe(0);
        });    
    });

    // The New Feed Selection...
    describe("New Feed Selection", function() { 
        // Get the first feed loaded
        let feed = document.getElementsByClassName("feed")[0];
        // An array for all the elements in the feed
        let feed1 = [];

        beforeEach(function(done) { // Before each spec ("it" function)
            // Loads the initial feed entries
            loadFeed(0, function() {
                // Make an array from all the child elements in the initially loaded items in the feed
                Array.from(feed.children).forEach(entry => {
                    // Add all the element's text to this array
                    feed1.push(entry.innerText);
                });
                
                // Loads more feed entries
                loadFeed(1, done);
            });
        });

        // changes content if...
        it("changes content", function() {
            // The items in the old feed do not match the items in the new feed
            Array.from(feed.children).forEach((entry, index) => {
                expect(entry.innerText === feed1[index]).toBe(false);
            });
        });
    });
}());