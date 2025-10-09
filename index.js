// Calling express framework..........

const express = require("express");
const app = express();

// Parse JSON using express.....
// Applying Middleware......

app.use(express.json());
app.use(express.urlencoded({extended : false}));

// Declaring localhost port.....

const port = 3000;

// Creating Api data......

let movies = [
    {
        id: "1",
        title: "Inception",
        directors: "Christofer Nolan",
        relDate: "16-07-2023",
    },
    {
        id: "2",
        title: "The Irishman",
        directors: "Martin Scorses",
        relDate: "27-09-2019",
    }
]

// Getting movie list in form of JSON.....

app.get("/movie",(req,res) => {
    res.json(movies);
})

// Add movie to the list........

app.post("/movie", (req,res) => {
    const movie = req.body;
    console.log(movie);
    movies.push(movie);
    res.send("movie is added to the list...!");
});

// Search movie by its id........

app.get("/movie/:id",(req,res) => {
    const id = req.params.id;
    for(let movie of movies){
        if(movie.id === id){
            res.json(movie);
            return
        }
    }
    res.status(400).send("movies not found....!");
});

// Update movie by its id........

app.put("/movie/:id", (req, res) => {
    const { id } = req.params;
    const { title, directors, relDate } = req.body;

    // Find the movie by ID
    const movie = movies.find(movie => movie.id === id);
    
    if (!movie) {
        return res.status(404).send("Movie not found....!");
    }

    // Update movie details
    if (title) movie.title = title;
    if (directors) movie.directors = directors;
    if (relDate) movie.relDate = relDate;

    res.json({ message: "Movie updated successfully!", movie });
});
// Delete movie from list......

app.delete("/movie/:id", (req,res) =>{
    const id = req.params.id;
    movies = movies.filter(movie => {
        if(movie.id !== id){
            return true
        }
        else{
            return false
        }
    })
    res.send("Movie is deleted.....!");
});

// Set server to listen port......

app.listen(port, () => {
    console.log(`Server listening ${port} port`);
});