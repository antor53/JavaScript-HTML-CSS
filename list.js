// Data for the "HTML Lists" Page
var fruits = [ "Apples","Oranges","Pears","Grapes","Pineapples","Mangos" ];

var directory = [
    {type: "file", name: "file1.txt"},
    {type: "file", name: "file2.txt"},
    {type: "directory", name: "HTML Files", files: [{type: "file", name: "file1.html"},{type: "file", name: "file2.html"}]},
    {type: "file", name: "file3.txt"},
    {type: "directory", name: "JavaScript Files", files: [{type: "file", name: "file1.js"},{type: "file", name: "file2.js"},{type: "file", name: "file3.js"}]}
];

window.onload = function() {
    var listContainer = document.querySelector("#list-o-fruits"), openList = "<ol>", closeList = "</ol>",
    openUL = "<ul>", closeUL = "</ul>";

    for (var i = 0; i < fruits.length; i++) { openList += "<li>" + fruits[i] + "</li>"; }

    openList += closeList;
    listContainer.innerHTML = openList;

    var openUL = "<ul>";
    var directoryContainer = document.querySelector("#list-o-names");

    // Directory listing
    for (var i = 0; i < directory.length; i++) {
        if (directory[i].type === "file") {
            openUL += "<li>" + directory[i].name + "</li>";
        }

        // Create sub-listing if type is directory
        else if (directory[i].type === "directory") {
            openUL += "<li>" + directory[i].name + "</li>";
            for (var j = 0; j < directory[i].files.length; j++) {
                openUL += "<ul><li>" + directory[i].files[j].name + "</li></ul>";
            }
        }
    }

    directoryContainer.innerHTML = openUL;
}