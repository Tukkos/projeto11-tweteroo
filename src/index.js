import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let users = [
    {
        username: "Gunter",
		avatar: "https://img.elo7.com.br/product/600x380/3EA7E44/gunter-hora-de-aventura-festa-cartoon-network.jpg" 
    },
    {
        username: "Lady Rainicorn",
		avatar: "https://i.pinimg.com/736x/0e/b9/c6/0eb9c654879b90bc99e8642992d1624e.jpg"
    },
    {
        username: "Jake",
		avatar: "https://static3.tcdn.com.br/img/img_prod/906555/90_camiseta_hora_de_aventura_jake_o_cachorro_141_3_7a8466862e0c230ff5ff83e65fbf365a.jpg"
    }
];
let tweets = [
    {
	    username: "Lady Rainicorn",
	    tweet: "안녕! "
	},
    {
		username: "Gunter",
	    tweet: "Wenk wenk!"
	},
    {
        username: "Jake",
	    tweet: "Um belo dia pra dar um cochilo."
    }
];

app.use(cors());

app.post("/sign-up", (req, res) =>{
    users.push(req.body);
    res.send("OK");
})

app.post("/tweets", (req, res) => {
    tweets.push(req.body);
    res.send("OK");
})

app.get("/tweets", (req, res) => {
    for (let i = 0; i < tweets.length; i++) {
        for (let j = 0; j < users.length; j++) {
            if(tweets[i].username === users[j].username) {
                tweets[i].avatar = users[j].avatar;
            }
        }
    };
    res.send(tweets.slice(-10));
});

app.listen(5000, () => console.log("Listen on 5000"));