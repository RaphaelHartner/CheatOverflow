Read me for the incredible CheatOverflow-App by AdeHar (Adelmann & Hartner)

CheatOverflow is a web-app, which gives you the opportunity to easily cheat on every IT-related test ;-)
First of all, on the homepage there are three(depends on the device) columns where you can find the most
recent questions on stakeoverflow about JSON, JavaScript and HTML5.

You are also able to search for a specific term in the search box. If there are no locations saved, Stackoverflow is
used as forum. On the other hand if you have specified a location, the nearest to your current position
will be choosed and in the specified forum will be searched for the term.


on the "About Us"-page you can find a couple information about the app
on the "About Stackoverflow"-page you can find a couple information and a link to the official stackoverflow-about-site

on the "Map"-Page you can see a map with your current position(if location sharing is allowed) and the locations which
you have defined.
For specifying a new location, you need following information:
    Location name: for example "FH Joanneum Kapfenberg"
    Field name: for example "IT" or "Web-Technologies"
    StackExchange site: for example "Stack Overflow"
locations will be stored locally.
For deleting a location, select it by clicking on it and press the "Delete"-Button

If you need offline-acces to questions you can save it by pressing the "save offline"-button
in the detailview of the question("details"-link)
You can find an overview of all saved questions in "Saved Questions"-Menu

Minified (or "Uglified") JavaScript files were made whit UglifyJS (https://marijnhaverbeke.nl/uglifyjs)
Minified (or "Compressed") CSS files were made with CSS Compressor (http://csscompressor.com/)


Test-Section:
    Selenium IDE for Firefox needed:
        https://addons.mozilla.org/de/firefox/addon/selenium-ide/

    With the firefox add-on "firestorageplus", it is possible to manage the local storage manually
        https://github.com/NickBelhomme/firestorageplus

    Testcases(Selenium IDE):
        testing in firefox with selenium ide
        clean environment(empty local storage) is required!
        open "TestSuite.html" with the Selenium IDE and start the tests
        ATTENTION: set the BASE-URL of the Test-Suite on the current project-public-directory
            For Example: "file:///D:/Development/04_WebStorm_Projects/CheatOverflow/public/"