// ---------SETUP NODE FUNCTIONS---------
require("dotenv").config();
var keys = require("./keys");

var request = require("request");
var fs = require("fs");

var Spotify = require("node-spotify-api");
var moment = require("moment");

// ---------STORE COMMAND LINE ARGUMENTS AS VARIABLES---------
var command = process.argv[2];

// ---------CHOOSE API FROM COMMAND LINE---------
if (command === "spotify-this-song") {
    spotifyThisSong();
} else if (command === "movie-this") {
    movieThis();
} else if (command === "concert-this") {
    concertThis();
} else if (command === "do-what-it-says") {
    doWhatItSays();
} else {
    console.log("Please enter one of the following commands: spotify-this-song, novie-this, concert-this, or do-what-it-says");
};
// -----------------------------------------------------------

// ---------SPOTIFY THIS SONG---------
function spotifyThisSong() {
    var spotify = new Spotify(keys.spotify);
    var args = process.argv;
    var input = "";

    for (i = 3; i < args.length; i++) {
        if (i > 3 && i < args.length) {
            input = input + " " + args[i];
        } else {
            input = args[i];
        }
    };

    if (args.length < 4) {
        input = "the sign ace of base";
        process.argv[3] = input;
    };

    spotify.search({
        type: "track",
        query: input,
        limit: 1
    }, function (err, data) {
        if (err) {
            console.log("Error occurred: " + err);
            return;
        }
        console.log("-------------------------");
        console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
        console.log("Song: " + data.tracks.items[0].name);
        console.log("Preview link: " + data.tracks.items[0].external_urls.spotify);
        console.log("Album: " + data.tracks.items[0].album.name);
        console.log("-------------------------");
        fs.appendFile("log.txt", "\n--------------------------------------------------" + "\nSpotify This Track: " + input + "\n" + "Artist: " + data.tracks.items[0].album.artists[0].name + "\n" + "Song: " + data.tracks.items[0].name + "\n" + "Preview link: " + data.tracks.items[0].external_urls.spotify + "\n" + "Album: " + data.tracks.items[0].album.name + "\n--------------------------------------------------"),
            function (err) {
            if (err) {
                console.log(err);
            }
        }
    });
};
// WRITING TO LOG.TXT GETS ME THIS IN TERMINAL, STILL WORKS THOUGH
// (node:91881) [DEP0013] DeprecationWarning: Calling an asynchronous function without callback is deprecated.


// ---------MOVIE THIS---------
function movieThis() {
    var args = process.argv;
    var input = "";

    for (i = 3; i < args.length; i++) {
        if (i > 3 && i < args.length) {
            input = input + " " + args[i];
        } else {
            input = args[i];
        }
    };

    if (input === "") {
        input = "Mr." + "+" + "Nobody"
    };

    var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=4498f04";

    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("-------------------------");
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("-------------------------");
        } else {
            console.log("something's wrong");
        }
        fs.appendFile("log.txt", "\n--------------------------------------------------" + "\nMovie This: " + input + "\n" + "Title: " + JSON.parse(body).Title + "\nYear: " + JSON.parse(body).Year + "\nIMDB Rating: " + JSON.parse(body).imdbRating + "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value + "\nCountry: " + JSON.parse(body).Country + "\nLanguage: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot + "\nActors: " + JSON.parse(body).Actors + "\n--------------------------------------------------"),
            function (err) {
            if (err) {
                console.log(err);
            }
        }
    });
};

// ---------CONCERT THIS---------
function concertThis() {
    var args = process.argv;
    var input = "";

    for (i = 3; i < args.length; i++) {
        if (i > 3 && i < args.length) {
            input = input + " " + args[i];
        } else {
            input = args[i];
        }
    };

    if (args.length < 4) {
        input = "Eminem";
        process.argv[3] = input;
    };

    var queryUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=4282a4517e96097afa0e49c9ce109f00";

    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var bandsInTown = JSON.parse(body);
            for (i = 0; i < 5; i++) {
                console.log("-------------------------");
                console.log("Venue: " + bandsInTown[i].venue.name);
                console.log("Location: " + bandsInTown[i].venue.city);
                console.log("Date: " + moment(bandsInTown[i].datetime, "YYYY-MM-DD[T]HH:mm:ss").format("MM/DD/YY"));
                console.log("-------------------------");
            }
        } else {
            console.log("something's wrong");
        }
        fs.appendFile("log.txt", "\n--------------------------------------------------" + "\nConcert This: " + input + "\n" + "Venue: " + bandsInTown[0].venue.name + "\n" + "Location: " + bandsInTown[0].venue.city + "\n" + "Date: " + moment(bandsInTown[0].datetime, "YYYY-MM-DD[T]HH:mm:ss").format("MM/DD/YY") + "\n--------------------------------------------------", function (err) {
            if (err) {
                console.log(err);
            }
        });
    });
};

// ---------DO WHAT IT SAYS---------
// I HAD TO COPY AND PASTE THE FUNCTIONS
// COULDN'T FIGURE OUT HOW TO CALL THE FUNCTIONS FROM BEFORE WITHOUT GETTING AN ERROR

function doWhatItSays() {
    fs.readFile("random.txt", "UTF-8", function (error, data) {
        var splitRead = data.split(", ");
        command = splitRead[0];
        input = splitRead[1];
        fs.appendFile("log.txt", "\n--------------------------------------------------" + "\nUSER ENGAGED THE RANDOM FILE", function (err) {
            if (err) {
                console.log(err);
            }
        });
        if (command === "spotify-this-song") {
            var spotify = new Spotify(keys.spotify);
            spotify.search({
                type: "track",
                query: input,
                limit: 1
            }, function (err, data) {
                if (err) {
                    console.log("Error occurred: " + err);
                    return;
                }
                console.log("-------------------------");
                console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
                console.log("Song: " + data.tracks.items[0].name);
                console.log("Preview link: " + data.tracks.items[0].external_urls.spotify);
                console.log("Album: " + data.tracks.items[0].album.name);
                console.log("-------------------------");
                fs.appendFile("log.txt", "\n--------------------------------------------------" + "\nSpotify This Track: " + input + "\n" + "Artist: " + data.tracks.items[0].album.artists[0].name + "\n" + "Song: " + data.tracks.items[0].name + "\n" + "Preview link: " + data.tracks.items[0].external_urls.spotify + "\n" + "Album: " + data.tracks.items[0].album.name + "\n--------------------------------------------------"),
                    function (err) {
                        if (err) {
                            console.log(err);
                        }
                    }
            });
        } else if (command === "movie-this") {
            var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=4498f04";

            request(queryUrl, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log("-------------------------");
                    console.log("Title: " + JSON.parse(body).Title);
                    console.log("Year: " + JSON.parse(body).Year);
                    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                    console.log("Country: " + JSON.parse(body).Country);
                    console.log("Language: " + JSON.parse(body).Language);
                    console.log("Plot: " + JSON.parse(body).Plot);
                    console.log("Actors: " + JSON.parse(body).Actors);
                    console.log("-------------------------");
                } else {
                    console.log("something's wrong");
                }
                fs.appendFile("log.txt", "\n--------------------------------------------------" + "\nMovie This: " + input + "\n" + "Title: " + JSON.parse(body).Title + "\nYear: " + JSON.parse(body).Year + "\nIMDB Rating: " + JSON.parse(body).imdbRating + "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value + "\nCountry: " + JSON.parse(body).Country + "\nLanguage: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot + "\nActors: " + JSON.parse(body).Actors + "\n--------------------------------------------------"),
                    function (err) {
                        if (err) {
                            console.log(err);
                        }
                    }
            });
        } else if (command === "concert-this") {

            // ----------I COULDN'T GET THIS ONE TO WORK----------

            var queryUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";

            request(queryUrl, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    var bandsInTown = JSON.parse(body);
                    for (i = 0; i < 5; i++) {
                        console.log("-------------------------");
                        console.log("Venue: " + bandsInTown[i].venue.name);
                        console.log("Location: " + bandsInTown[i].venue.city);
                        console.log("Date: " + moment(bandsInTown[i].datetime, "YYYY-MM-DD[T]HH:mm:ss").format("MM/DD/YY"));
                        console.log("-------------------------");
                    }
                } else {
                    console.log("something's wrong");
                }
                fs.appendFile("log.txt", "\n--------------------------------------------------" + "\nConcert This: " + input + "\n" + "Venue: " + bandsInTown[i].venue.name + "\n" + "Location: " + bandsInTown[i].venue.city + "\n" + "Date: " + moment(bandsInTown[i].datetime, "YYYY-MM-DD[T]HH:mm:ss").format("MM/DD/YY") + "\n--------------------------------------------------", function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
            });
        } else {
            console.log("no command");
        }
    });
};

// -----------------------------------------------------------