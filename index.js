import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let login = {};
let tweets = [
    {
	    username: "bobesponja",
		avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
	    tweet: "eu amo o hub"
	},
    {
		username: "bobesponja",
		avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
	    tweet: "eu amo o hub"
	}
];

app.use(cors());

app.post("/sign-up", (req, res) =>{
    login = req.body;
    res.send("OK");
})

app.post("/tweets", (req, res) => {
    const tweet = req.body;
    tweet.avatar = login.avatar;
    tweets.push(tweet);
    res.send("OK");
})

app.get("/tweets", (req, res) => {
    res.send(tweets);
});

app.listen(5000, () => console.log("Listen on 5000"))

// http://localhost:5000/sign-up