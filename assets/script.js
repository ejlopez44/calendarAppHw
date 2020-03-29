$(document).ready(function () {
    // This block populates today's date information to the header
    var now = (moment().format('dddd[,] MMMM Do'))
    // Current Hour acts as an index for changing color conditions of my calendar
    var currentHour = (moment().format('HH'))
    console.log(currentHour)
    // var currentHour = (moment().)
    $('#currentDay').text(now)

    // USEFUL FUNCTION FOR CONSOLING ATTRIBUTE OF A TARGETED ELEMENT
    // console.log($('.time-block').attr('id'))


    //BEGIN LOCAL STORAGE CODE

    //Needed to define an array to update items
    var calEvents = ['', '', '', '', '', '', '', '']

    //This function is run immediately to check for locally stored data and populate our calEvents array. Still trying to wrap my head around why it works..
    getLocal()
    function getLocal() {
        //Parse the local storage data for my specific 'Events' key and assign it a variable of stored
        var stored = JSON.parse(localStorage.getItem('Events'))
        //if stored is null (doesn't exist) function ends and doesn't update calEvents array with the correct data.
        if (stored !== null)
            calEvents = stored
    }

    // THIS save FUNCTION IS WORKING AND SAVES VALUES ADDED TO THE INPUT BOX TO THE LOCAL STORAGE
    function save() {
        //variable to help target the index of the row
        var index = $(this).parent().index()
        //variable to help target the textarea
        var text = $(this).prev().val()
        //this line tells me the index of the row in question 
        console.log(index)
        //this line tells me the current value typed in the textarea
        console.log(text)

        calEvents[index] = text

        // // saves entire Object to local storage
        localStorage.setItem("Events", JSON.stringify(calEvents));
    }

    // ARRAY FOR generateRows FUNCTION TO ITERATE THROUGH AND CREATE ELEMENTS
    // var workDay = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"] // ORIGINAL SIMPLE ARRAY
    var workDay = [{ rowName: "9AM", hour: 9, input: "" }, { rowName: "10AM", hour: 10, input: "" }, { rowName: "11AM", hour: 11, input: "" }, { rowName: "12PM", hour: 12, input: "" }, { rowName: "1PM", hour: 13, input: "" }, { rowName: "2PM", hour: 14, input: "" }, { rowName: "3PM", hour: 15, input: "" }, { rowName: "4PM", hour: 16, input: "" }, { rowName: "5PM", hour: 17, input: "" }]
    // console.log(workDay)

    // GENERATES HOUR ROWS

    function generateRows() {
        for (let i = 0; i < workDay.length; i++) {
            //create row
            var newRow = $('<div>');
            //apply classes
            // newRow.attr('id', 'hour' + workDay[i].hour); // Don't actually need this
            // newRow.attr('value', workDay[i].hour); // Don't actually need this
            newRow.addClass('row time-block');
            //create pblock
            var pblock = $('<div>');
            pblock.addClass('col hour inrow');
            var p = $('<p>').text(workDay[i].rowName);  // need to change this to target within the object: DONE
            //create textarea
            var textBlock = $('<textarea>')
            textBlock.val(calEvents[i])
            //apply classes
            textBlock.addClass('col-8')
            textBlock.attr("data-set", workDay[i].hour); // need to change this to get the 24 hour object hour and assign it
            //create button
            var saveButton = $('<button>')
            //apply classes
            saveButton.addClass('col saveBtn')
            saveButton.attr('id', 'btn' + [i])
            //apply button function for saving to local storage
            saveButton.on('click', save)
            // add the cute floppy disc icon
            saveButton.html('<i class="far fa-save"></i>')
            //append all the items to the div container with id timeTable
            newRow.appendTo('#timeTable')
            p.appendTo(pblock)
            pblock.appendTo(newRow)
            textBlock.appendTo(newRow)
            saveButton.appendTo(newRow)


        }
    }
    generateRows()

    // FUNCTION CHANGES BG COLOR OF TEXT AREA

    function bgColor() {
        $('textarea').each(function () {
            var now = parseInt($(this).attr('data-set'))
            console.log(now)
            if (now == currentHour) {
                $(this).addClass('present')
            }
            if (now > currentHour) {
                $(this).addClass('future')
            }
            if (now < currentHour) {
                $(this).addClass('past')
            }
        })
    }
    bgColor()


});

