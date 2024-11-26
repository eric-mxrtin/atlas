import express from "express";
const router = express.Router();

const data = [
  {
    "name": "Robarts Library",
    "coords": [43.66450127005321, -79.39957486669735],
    "status": "Open",
    "rating": "4.5",
    "station": "St George",
    "image": "/images/robarts.jpg",
    "hours": {
      "Monday": ["08:30", "23:00"],
      "Tuesday": ["08:30", "23:00"],
      "Wednesday": ["08:30", "23:00"],
      "Thursday": ["08:30", "23:00"],
      "Friday": ["08:30", "23:00"],
      "Saturday": ["09:00", "22:00"],
      "Sunday": ["10:00", "22:00"]
    }
  },
  {
    "name": "E.J. Pratt",
    "coords": [43.66656632104989, -79.39137183339376],
    "status": "Open",
    "rating": "4.8",
    "station": "Museum",
    "image": "/images/ej-pratt.jpg",
    "hours": {
      "Monday": ["09:00", "23:45"],
      "Tuesday": ["09:00", "23:45"],
      "Wednesday": ["09:00", "23:45"],
      "Thursday": ["09:00", "23:45"],
      "Friday": ["09:00", "18:45"],
      "Saturday": ["10:00", "23:45"],
      "Sunday": ["10:00", "23:45"]
    }
  },
  {
    "name": "Gerstein Centre",
    "coords": [43.66232748459465, -79.39370044503877],
    "status": "Open",
    "rating": "4.4",
    "station": "Queen's Park",
    "image": "/images/gerstein.jpg",
    "hours": {
      "Monday": ["08:30", "23:00"],
      "Tuesday": ["08:30", "23:00"],
      "Wednesday": ["08:30", "23:00"],
      "Thursday": ["08:30", "23:00"],
      "Friday": ["08:30", "22:00"],
      "Saturday": ["09:00", "22:00"],
      "Sunday": ["10:00", "22:00"]
    }
  },
  {
    "name": "Knox College",
    "coords": [43.66142645867825, -79.3965188597008],
    "status": "Open",
    "rating": "5.0",
    "station": "Queen's Park",
    "image": "/images/knox.jpg",
    "hours": {
      "Monday": ["08:30", "16:30"],
      "Tuesday": ["08:30", "16:30"],
      "Wednesday": ["08:30", "16:30"],
      "Thursday": ["08:30", "16:30"],
      "Friday": ["08:30", "16:30"],
      "Saturday": [],
      "Sunday": []
    }
  },
  {
    "name": "UC Library",
    "coords": [43.662885261767045, -79.39462455689487],
    "status": "Open",
    "rating": "4.5",
    "station": "Queen's Park",
    "image": "/images/uc.jpg",
    "hours": {
      "Monday": ["09:00", "20:00"],
      "Tuesday": ["09:00", "20:00"],
      "Wednesday": ["09:00", "20:00"],
      "Thursday": ["09:00", "20:00"],
      "Friday": ["09:00", "17:00"],
      "Saturday": ["13:00", "17:00"],
      "Sunday": ["13:00", "17:00"]
    }
  },
  {
    "name": "Myhal Building",
    "coords": [43.66079893378343, -79.39636946008957],
    "status": "Open",
    "rating": "4.1",
    "station": "Queen's Park",
    "image": "/images/myhal.jpg",
    "hours": {
      "Monday": ["07:00", "23:00"],
      "Tuesday": ["07:00", "23:00"],
      "Wednesday": ["07:00", "23:00"],
      "Thursday": ["07:00", "23:00"],
      "Friday": ["07:00", "23:00"],
      "Saturday": ["08:30", "20:00"],
      "Sunday": ["08:30", "20:00"]
    }
  },
  {
    "name": "Bahen Centre",
    "coords": [43.659853612472304, -79.3973041611138],
    "status": "Open",
    "rating": "4.3",
    "station": "Queen's Park",
    "image": "/images/bahen.jpg",
    "hours": {
      "Monday": ["08:30", "21:00"],
      "Tuesday": ["08:30", "21:00"],
      "Wednesday": ["08:30", "21:00"],
      "Thursday": ["08:30", "21:00"],
      "Friday": ["08:30", "18:00"],
      "Saturday": [],
      "Sunday": ["08:30", "21:00"]
    }
  },
  {
    "name": "Sidney Smith",
    "coords": [43.66253044291955, -79.39852101877675],
    "status": "Open",
    "rating": "3.6",
    "station": "St George",
    "image": "/images/sidney-smith.jpg",
    "hours": {
      "Monday": ["10:00", "18:30"],
      "Tuesday": ["10:00", "18:30"],
      "Wednesday": ["10:00", "18:30"],
      "Thursday": ["10:00", "18:30"],
      "Friday": ["10:00", "17:00"],
      "Saturday": [],
      "Sunday": []
    }
  },
  {
    "name": "Med Sci Building",
    "coords": [43.66081004841944, -79.3934804096789],
    "status": "Open",
    "rating": "4.4",
    "station": "Queen's Park",
    "image": "/images/med-sci.jpg",
    "hours": {
      "Monday": ["08:45", "17:00"],
      "Tuesday": ["08:45", "17:00"],
      "Wednesday": ["08:45", "17:00"],
      "Thursday": ["08:45", "17:00"],
      "Friday": ["08:45", "17:00"],
      "Saturday": [],
      "Sunday": []
    }
  },
  {
    "name": "OISE",
    "coords": [43.66802214973769, -79.39821620116368],
    "status": "Open",
    "rating": "4.4",
    "station": "St George",
    "image": "/images/oise.jpg",
    "hours": {
      "Monday": ["09:00", "16:00"],
      "Tuesday": ["09:00", "16:00"],
      "Wednesday": ["09:00", "16:00"],
      "Thursday": ["09:00", "16:00"],
      "Friday": ["09:00", "16:00"],
      "Saturday": [],
      "Sunday": []
    }
  },
  {
    "name": "Rotman Building",
    "coords": [43.66527844619908, -79.39860712787925],
    "status": "Open",
    "rating": "4.4",
    "station": "St George",
    "image": "/images/rotman.jpg",
    "hours": {
      "Monday": ["09:00", "21:00"],
      "Tuesday": ["09:00", "21:00"],
      "Wednesday": ["09:00", "21:00"],
      "Thursday": ["09:00", "21:00"],
      "Friday": ["09:00", "21:00"],
      "Saturday": [],
      "Sunday": []
    }
  }
]



// Getting the list of users from the mock database
router.get("/", (req, res) => {
  res.send(data);
});

export default router;
