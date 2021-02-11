var express = require("express");
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const PORT = process.env.PORT || 3000;

let artistArray = [
  {
    id: 1,
    name: "Kanye",
    albumsArray: [
      {
        id: 1,
        name: "The coding dropout",
      },
    ],
    topSongs: [
      {
        id: 1,
        name: "The Javascript State of Mind",
      },
    ],
  },
  {
    id: 2,
    name: "Chris Brown",
    albumsArray: [
      {
        id: 1,
        name: "The Greatest Algorithm",
      },
    ],
    topSongs: [
      {
        id: 1,
        name: "Wheel on the bus",
      },
    ],
  },
];

app.get("/artist", function (req, res) {
  res.status(200).json({
    artistArray
  });
});




app.get("/artist/:artistID", function (req, res) {
  let result = "Sorry, the artist you are looking does not exist"
  let artistID = Number(req.params.artistID);
  artistArray.forEach((artist) => { if (artist.id === artistID) {
      result = artist.name;
    }
  });
  res.status(200).json({
    result,
  });
});




app.get("/artist/:artistID/:albumID", function (req, res) {
  let result = "Sorry, the album you are looking does not exist"
  let artistID = Number(req.params.artistID);
  let albumID = Number(req.params.albumID);
  artistArray.forEach((artist) => {
    if (artist.id === artistID) {
      artist.albumsArray.forEach((album) => {
        if (album.id === albumID) {
          result = album.name;
        }
      })
    }
  });

  res.status(200).json({
    result,
  });
});




app.get("/artist/:artistID/:albumID/:songID", function (req, res) {
  let result = "Sorry, the song you are looking does not exist"
  let artistID = Number(req.params.artistID);
  let songID = Number(req.params.albumID);
  artistArray.forEach((artist) => {
    if (artist.id === artistID) {
      artist.topSongs.forEach((song) => {
        if (song.id === songID) {
          result = song.name;
        }
      })
    }
  });
  res.status(200).json({
    result,
  });
});




app.post("/artist/add-artist/:artistID", function (req, res) {
  let artistIDNumber = Number(req.params.artistID);
  artistArray.forEach((artist) => {
    if (artist.id === artistIDNumber) {
      artistArray.push(req.body);
    }
  });

  res.status(200).json({
    artistArray,
  });
});




app.put("artist/edit-artist/:artistID", function (req, res) {
  let artistID = Number(req.params.artistID);
  let artistIndex;
  let obj = {};
  artistArray.forEach((artist, index) => {
    if (artist.id === artistID) {
      obj = { ...artist, ...req.body }
      artistIndex = index;
    }
  });

  artistArray[artistIndex] = obj;
  res.status(200).json({
    artistArray
  })
  console.log(JSON.stringify(artistArray))
});




app.delete("/artist/delete-by-name/:artistName", function (req, res) {
  artistArray.forEach((artist) => {
    if (artist.name === artistName) {
      delete (artistName)
    }
    return;
  });

  res.status(200).json({
    artistArray
  });
});




app.listen(3000, () => {
  console.log(`UP AND RUNNING ON PORT ${PORT}`);
});