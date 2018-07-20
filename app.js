

var config = {
    apiKey: "AIzaSyB2vKnfEv0loj8L6ura7jXQfUF0zZWKZvo",
    authDomain: "train-scheduling-app-7582e.firebaseapp.com",
    databaseURL: "https://train-scheduling-app-7582e.firebaseio.com",
    projectId: "train-scheduling-app-7582e",
    storageBucket: "",
    messagingSenderId: "135617546746"
};

firebase.initializeApp(config);


var database = firebase.database();



var datetime = null,
    date = null;

var update = function () {
    date = moment(new Date())
    datetime.html(date.format('dddd, MMMM Do YYYY, h:mm:ss a'));
};

$(document).ready(function () {
    datetime = $('#currentStatus')
    update();
    setInterval(update, 1000);

});



var name = "";
var destination = "";
var startTime = 0;
var frequency = 0;



$("#addTrain").on("click", function (event) {
    event.preventDefault();



    name = $("#trainNameInput").val().trim();
    destination = $("#trainDestination").val().trim();
    startTime = $("#startTime").val().trim();
    frequency = $("#trainFrequency").val().trim();

    console.log(name);
    console.log(destination);
    console.log(startTime);
    console.log(frequency);


    database.ref().push({
        name: name,
        destination: destination,
        startTime: startTime,
        frequency: frequency
    });



    $("#trainNameInput").val("");
    $("#trainDestination").val("");
    $("#startTime").val("");
    $("#trainFrequency").val("");

});


$("#clearTrain").on("click", function (event) {
    event.preventDefault();

    $("#trainNameInput").val("");
    $("#trainDestination").val("");
    $("#startTime").val("");
    $("#trainFrequency").val("");

});


database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());



    var getName = childSnapshot.val().name;
    var getDestination = childSnapshot.val().destination;
    var getTime = childSnapshot.val().startTime;
    var getFrequency = parseInt(childSnapshot.val().frequency);


    var currentTime = moment();

    console.log("Current Time: " + moment(currentTime).format("HH:mm"));


    var convertedFirstTime = moment(getTime, "hh:mm").subtract(1, "years");

    console.log(convertedFirstTime);

    var diffTime = moment().diff(moment(convertedFirstTime), "minutes");

    console.log("Difference in the time: " + diffTime);



    var tRemainder = diffTime % getFrequency;

    console.log(tRemainder);



    var minutesAway = getFrequency - tRemainder;

    console.log("Minutes until train " + minutesAway);



    var nextTrain = moment().add(minutesAway, "minutes");

    console.log(nextTrain);



    var nextArrival = moment(nextTrain, "HHmm").format("h:mm A");



    var row = $('<tr>');

    row.append('<td>' + getName + "</td>")
    row.append('<td>' + getDestination + "</td>")
    row.append('<td>' + "Every " + getFrequency + " mins" + "</td>")
    row.append('<td>' + nextArrival + "</td>")
    row.append('<td>' + minutesAway + " mins until arrival" + "</td>")

    $("#trainTable > tbody").append(row)


});








