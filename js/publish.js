"use strict";

$(document).ready(function(){

// nextCounter, backCounter, reset - variable for "next" and "back" buttons
var nextCounter = 0;
var backCounter = 0;
var reset = false;
var inputID = new Array("#story-name","#add-photos", "#add-spots","#travel-story");
var steps = new Array('<div class="form-group" id="add-photos"><label for="add-photos"><p id="main-label">Upload Your Travel Photos</p><p id="sub-label">Your travel photos will look amazing on Places Unknown</p></label><div id="dropbox-container"></div></div>','<div class="form-group" id="add-spots"><label for="add-places"><p id="main-label">Map your Journey</p><p id="sub-label">Add all the places and destinations from your trip</p></label><input type="text" class="form-control input-lg" id="add-spt" placeholder="Add all the places from your trip" required="required"></div>','<div class="form-group" id="travel-story"><label for="travel-story"><p id="main-label">Trip Overview</p><p id="sub-label">Tell us about your trip in brief.What made it special? Any snippets from the road? Share them here!</p></label><textarea class="form-control" rows="6" cols="60"  wrap="hard" id="travel-str" placeholder="Share with us your trip"></textarea></div>');



// bool varible for "next" and "back" buttons
var ishidden;

var $mainContent = jQuery('#main');
//data with the user inputs
var data;


// logic for the "back" and "next" buttons
    $("#next").click(function(){

        $(inputID[nextCounter]).hide();

         ishidden = $(inputID[nextCounter+1]).is(":hidden");
        
		 //if we are on the second-last input when we click next
         //the publsih button should appear on should be inserted after the back button
         //the next button should disappear
        if(nextCounter==2) {
            if($('#publish').length) {
                $('#publish').show();
            } else {
            $('<button id="publish" class="btn btn-default">Publish</button>').insertAfter('#back');
            }
            $('#next').hide();
        }


        if(ishidden) {
            $(inputID[nextCounter+1]).show();
            nextCounter++;
        } else {
            $(steps[nextCounter]).insertAfter(inputID[nextCounter]);
            nextCounter++;
        }

        if(nextCounter == 1) {
            <!-- dropbox code-->
            document.getElementById("dropbox-container").appendChild(button);
            <!-- end of dropbox code -->

            if(backCounter != 0 || reset == true) {
                $('#back').show();
            } else {
                $('<button id="back" class="btn btn-default" accesskey="b">Back</button>').insertBefore('#next');
            }
    }
    });
	//end of next button logic
	
	 //back button logic
    $("#buttons-area").on("click","#back", function(){
		
		//hide the current input and show the previous one
        $(inputID[nextCounter]).hide();
        $(inputID[nextCounter-1]).show();
		
		//when you click on the back button
        //the next button must appear again for sure if it was hidden somehow
        if($('#next').is(":hidden")) {
                $('#next').show();
        }
		
		//if you want to go back to the first input you dont need the back button
        if(nextCounter == 1) {
            $('#back').hide();
			
		//the publsih button must be hidden if we are not on the last input
        } else if (nextCounter <= 3) {
            $('#publish').hide();
        }

        backCounter++;
        nextCounter--;
    });
	//  end of logic for the "back" and "next" buttons
 
	//publish button logic
	// "data" - object with properties (key: value)
 
    $("#buttons-area").on("click","#publish", function(){
         data = {
            name : document.getElementById("str-name").value,
            spots : document.getElementById("add-spt").value,
            story : document.getElementById("travel-str").value,
            photo : link
        };
	
		//append the html generated from the renderer in the div with #main
        $('#main').prepend(Renderer.render('spot', data));

        //reseting input forms
        $('#travel-story').hide();
        $('#publish').hide();
        $('#back').hide();
        $('#next').show();
        $('#add-photos').hide();
        $('#add-spots').hide();
        $('#story-name').show();
        nextCounter = 0;
        backCounter = 0;

        reset = true;
        $('#main-form')[0].reset();
		link = null;
    });
 // end of publish button logic
 
	jsonFile().then(function (sp) {
                $mainContent.html(Renderer.render('spots', sp));
            });
});

