$(document).ready(function () {
    // This block populates today's date information to the header
    var now = (moment().format('dddd[,] MMMM Do'))
    // Current Hour acts as an index for changing color conditions of my calendar
    var currentHour = (moment().format('HH'))
    console.log(currentHour)
    // var currentHour = (moment().)
    $('#currentDay').text(now)

    //need a function that saves input from specific textarea to local storage
    //variables would be textarea id & name of local storage item

    //need event listener on each button (by class?) that saves to dom of specific textarea id


    // your button needs to call a predetermined function...
    $('button').on('click', tester);

    function tester() {
        //  needs to take the .val() of its previousSibling and save it to an array in local storage

    }

    function getLocal() {
        var saved = JSON.parse(localStorage.getItem('lastinput'))
    }

    function save() {
        var input = $(this).prev()
        //consoles input to console for review
        console.log(input.val())
        //stores to local storage
        localStorage.setItem('saved event', JSON.stringify(data));
    }

    //Created this as a way to systematically create each row and save important object information
    // var workDay = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"]

    var workDay = [{ rowName: "9AM", hour: 9, input: "" }, { rowName: "10AM", hour: 10, input: "" }, { rowName: "11AM", hour: 11, input: "" }, { rowName: "12PM", hour: 12, input: "" }, { rowName: "1PM", hour: 13, input: "" }, { rowName: "2PM", hour: 14, input: "" }, { rowName: "3PM", hour: 15, input: "" }, { rowName: "4PM", hour: 16, input: "" }, { rowName: "5PM", hour: 17, input: "" }]
    console.log(workDay)

    function generateRows() {
        for (let i = 0; i < workDay.length; i++) {
            //create row
            var newRow = $('<div>');
            //apply classes
            newRow.attr('id', 'hour' + workDay[i].hour);
            newRow.attr('value', workDay[i].hour);
            newRow.addClass('row time-block');
            //create pblock
            var pblock = $('<div>');
            pblock.addClass('col hour inrow');
            var p = $('<p>').text(workDay[i].rowName);  // need to change this to target within the object: DONE
            //create textarea
            var textBlock = $('<textarea>')
            //apply classes
            textBlock.addClass('col-8')
            textBlock.attr("data-set", parseInt(workDay[i].hour)); // need to change this to get the 24 hour object hour and assign it
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


    // console.log($('.time-block').attr('id'))

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

