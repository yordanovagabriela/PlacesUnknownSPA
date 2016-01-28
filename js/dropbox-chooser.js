"use strict";
//title of the place;
var title;

var link;
var options = {
    success: function(files) {
        files.forEach(function(file){
            link= file.link;
			title = file.title;
        });
    },
    linkType: "direct", 
    multiselect: false,
    extensions: ['.png', '.jpg'],
};

 var button = Dropbox.createChooseButton(options);