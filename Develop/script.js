

$(function () {

  var dateTime = $("#date-time")
  var currentHour = dayjs().format("HH")
  var currentDay = dayjs().format('dddd, MMMM D')
  $("#currentDay").text(currentDay)

  // Load stored notes from local storage
  var storedNotes = JSON.parse(localStorage.getItem("storedNotes")) || [];
  for (var i = 0; i < storedNotes.length; i++) {
    var timeBlockHour = storedNotes[i].hour;
    var note = storedNotes[i].note;
    $(".time-block[data-time='" + timeBlockHour + "'] .description").val(note);
  }
  
  // Set up event listener for save button
  $(".saveBtn").on("click", function() {
    var timeBlockHour = $(this).parent().attr("data-time");
    var note = $(this).siblings(".description").val();
    var index = -1;
    for (var i = 0; i < storedNotes.length; i++) {
      if (storedNotes[i].hour === timeBlockHour) {
        index = i;
        break;
      }
    }
    if (index >= 0) {
      storedNotes[index].note = note;
    } else {
      storedNotes.push({hour: timeBlockHour, note: note});
    }
    localStorage.setItem("storedNotes", JSON.stringify(storedNotes));
  });

  $(".time-block").each(function() { 
    let timeBlockHour = $(this).attr("data-time");
    if (timeBlockHour < currentHour) {
      $(this).addClass("past");
    } else if (timeBlockHour == currentHour) {
      $(this).addClass("present");
    } else if (timeBlockHour > currentHour) {
      $(this).addClass("future");
    }
  })

});