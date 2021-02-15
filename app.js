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

function dynamicErrorMessage(res, message) {
  return res
    .status(404)
    .send(`Sorry the ${message} you are looking does not exist`);
}


app.get("/get-all-artists", function (req, res) {
  res.send(artistArray);
});


app.get("/get-all-artists-without-album-top-songs", function (req, res) {
  let result = [];
  artistArray.forEach((artist) => {
    result.push({ id: artist.id, name: artist.name });
  });

  res.json(result);
});


app.get("/get-artist-by-id/:id", function (req, res) {
  let result = [];
  let parsedID = Number(req.params.id);
  artistArray.forEach((artist) => {
    if (artist.id === parsedID) {
      result.push(artist);
    }
  });

  if (result.length === 0) {
    dynamicErrorMessage(res, "artist");
  } else {
    res.json(result);
  }
});


app.get("/get-artist-by-album-id/:artistID/:albumID", function (req, res) {
  let result = [];
  let parsedArtistID = Number(req.params.artistID);
  let parsedAlbumID = Number(req.params.albumID);
  artistArray.forEach((artist) => {
    if (artist.id === parsedArtistID) {
      let foundArtistAlbumArray = artist.albumsArray;
      foundArtistAlbumArray.forEach((album) => {
        if (album.id === parsedAlbumID) {
          result.push(album);
        }
      });
    }
  });

  if (result.length === 0) {
    dynamicErrorMessage(res, "album");
  } else {
    res.json(result);
  }
});


app.get("/get-artist-by-top-song-id/:artistID/:topSongID", function (req, res) {
  let result = [];
  let parsedArtistID = Number(req.params.artistID);
  let parsedTopSongID = Number(req.params.topSongID);
  artistArray.forEach((artist) => {
    if (artist.id === parsedArtistID) {
      let foundArtistTopSongArray = artist.topSongs;
      foundArtistTopSongArray.forEach((item) => {
        if (item.id === parsedTopSongID) {
          result.push(item);
        }
      });
    }
  });

  if (result.length === 0) {
    dynamicErrorMessage(res, "top song");
  } else {
    res.json(result);
  }
});


app.post("/create-new-artist", function (req, res) {
  let artistExistsArr = [];
  artistArray.forEach((artist) => {
    if (artist.name.toLowerCase() === req.body.name.toLowerCase()) {
      artistExistsArr.push(artist);
    }
  });

  if (artistExistsArr.length > 0) {
    res
      .status(500)
      .send(
        "Sorry the artist you are trying to create is already in the database"
      );

  } else {

    artistArray.push({
      id: artistArray.length,
      name: req.body.name,
      albumsArray: req.body.albumsArray,
      topSongs: req.body.topSongs,
    });
    res.send(artistArray);
  }
});


app.post("/create-new-album/:artistID", function (req, res) {
  let existingArtistArr = [];
  let artistArrayIndex;
  artistArray.forEach((artist, index) => {
    if (artist.id === Number(req.params.artistID)) {
      artistArrayIndex = index;
      existingArtistArr.push(artist);
    }
  });
  if (existingArtistArr.length === 0) {
    res
      .status(500)
      .send(
        "Sorry the artist you are trying add an album to is not in the database, go create the artist"
      );
  } else {
    let foundArtistAlbumArray = existingArtistArr[0].albumsArray;
    let checkIsAlbum = [];
    foundArtistAlbumArray.forEach((album, index) => {
      if (album.name === req.body.name) {
        checkIsAlbum.push(album);
      }
    });
    if (checkIsAlbum.length > 0) {
      return res
        .status(500)
        .send(
          "Sorry the album you want to create exists already, please choose another album name"
        );
    } else {
      artistArray[artistArrayIndex].albumsArray.push({
        id: artistArray[artistArrayIndex].albumsArray.length + 1,
        name: req.body.name,
      });

      return res.send(artistArray);
    }
  }
});


app.post("/create-new-top-song/:artistID/:topSongsID", function (req, res) {
  let existingArtistArr = [];
  let artistArrayIndex;
  artistArray.forEach((artist, index) => {
    if (artist.id === Number(req.params.artistID)) {
      artistArrayIndex = index;
      existingArtistArr.push(artist);
    }
  });
  if (existingArtistArr.length === 0) {
    res
      .status(500)
      .send(
        "Sorry the artist you are trying to add a top song to is not in the database, go create the artist"
      );

  } else {
    let foundTopSongsArr = existingArtistArr[0].topSongs;
    let checkIsTopSongs = [];
    foundTopSongsArr.forEach((album, index) => {
      if (album.name === req.body.name) {
        checkIsTopSongs.push(album);
      }
    });
    if (checkIsTopSongs.length > 0) {
      return res
        .status(500)
        .send(
          "Sorry the top song you want to create exists already, please choose another top song name"
        );
    } else {
      artistArray[artistArrayIndex].topSongs.push({
        id: artistArray[artistArrayIndex].topSongs.length + 1,
        name: req.body.name,
      });
      return res.send(artistArray);
    }
  }
});


app.put("edit-artists/:artistID", function (req, res) {
  let artistIDNumber = Number(req.params.id);
  let obj = {};
  let artistArrIndex;
  let singleArtistIndex;

  artistArray.forEach((artist, index) => {
    if (artist.id === artistIDNumber) {
      artistArrIndex = index;
      let singleArtist = artist.artistArray;
      singleArtist.forEach((individual, indexArtist) => {
        singleArtistIndex = indexArtist
        if (individual.name === req.body.name) {
          obj = { ...artist, ...req.body};
          singleArtistIndex = indexArtist;
        }
      })
    }
  })
  artistArray[artistArrIndex] = obj;
  res.json(artistArray)
  
})

app.listen(3000, () => {
  console.log("STARTED");
});



















