# liri-node-app
A Language, Interpretation and Recognition app that communicates with Bands In Town, Spotify and OMDB. This app operates on localhost though the commandline.

![Imgur](https://i.imgur.com/lgkPaNG.gif)

Through the command line, LIRI Bot communicates with the above-mentioned APIs to return track, film and concert information. The app will also log the information in log.txt.

To use the app, simply type:

"node liri.js [liri command]"

Spotify: spotify-this-track [track name]

OMDB: movie-this [movie name]

Bands In Town: concert-this [artist/band name]

You can also edit the command and input in random.txt and call it with the following:

"node liri.js do-what-it-says"
