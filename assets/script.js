$(document).ready(function () {
    // This block populates today's date information to the header
    var now = (moment().format('dddd[,] MMMM Do'))
    $('#currentDay').text(now)

    var workDay = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"]
    //Created this as a way to systematically create each row, but 
    function generateRows() {
        for (let i = 1; i < workDay.length; i++) {
            var hour = workDay[i]
            var newRow = $('#hourRow').clone()
            newRow.appendTo('#timeTable')
            newRow.removeAttr('id', 'hourRow')
            newRow.attr('id', 'hourRow' + [i])
            // need to append <p> with text [i]
            $('.hour').children().attr('id', 'hour' + hour)

        }
    }
    generateRows()

});

