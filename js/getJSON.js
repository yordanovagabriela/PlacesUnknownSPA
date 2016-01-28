"use strict";
var jsonFile;
 jsonFile = function() {
    return $.ajax({
    type: 'GET',
    url: 'data/data.json',
    dataType: 'json'
    });
}