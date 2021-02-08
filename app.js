var express = require("express");
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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
  })
})
app.get("/artist/:artistID", function(req, res) {
  let result = "Sorry, the artist you are looking does not exist"
  let artistID = Number(req.params.artistID);
  artistArray.forEach((artist) => {
    if (artist.id === artistID) {
        result = artist.name;
    }
  });
  res.status(200).json({
      result,
  });
});
app.get("/artist/:artistID/:albumID", function(req, res) {
  let result = "Sorry, the album you are looking does not exist"
  let artistID = Number(req.params.artistID);
  let albumID = Number(req.params.albumID);
  artistArray.forEach((artist) => {
    if (artist.id === artistID) {
      artist.albumsArray.forEach((album) => {
        if(album.id === albumID) {
          result = album.name;
        }
      })
      }
    });
  res.status(200).json({
      result,
  });
});
app.get("/artist/:artistID/:albumID/:songID", function(req, res) {
  let result = "Sorry, the song you are looking does not exist"
  let artistID = Number(req.params.artistID);
  let songID = Number(req.params.albumID);
  artistArray.forEach((artist) => {
    if (artist.id === artistID) {
      artist.topSongs.forEach((song) => {
        if(song.id === songID) {
          result = song.name;
        }
      })
      }
    });
  res.status(200).json({
      result,
  });
});
app.listen(3000, () => {
  console.log("STARTED");
});

app.post("/artist/add-artist/:artistID", function(req, res) {

})

arrayIndex = index;
// making a new variable to assign to name.artistArray
let singleArtistArray = name.artistArray;
// looping again this time saying if item.name property is the same name you enter into the query go ahead to next step
singleArtistArray.forEach((item, singerIndex) => {
  // if the item.name and request.query.name are the same
  if (item.name === req.query.name) {
    // use spread operator to combine item and req.query into previously declared obj
    obj = { ...item, ...req.query };
    singerArray = singerIndex;
  }
});
// not 100% sure what is going on down here.
singleArtistArray[arrayIndex].artistArray[singerArray] = obj;
res.status(200).json(teamArray);