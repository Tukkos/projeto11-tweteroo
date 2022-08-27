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
    },
    {
        "username": "Finn",
            "avatar": "http://pm1.narvii.com/6532/8f827cde3730def1787c8f900896b78501bc56d3_00.jpg"
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
    },
    {
        username: "Finn",
        tweet: "Hora de aventura!!",
    }
];

app.use(cors());

app.post("/sign-up", (req, res) =>{
    if(!req.body.username || !req.body.avatar) {
        return res.status(400).send("Todos os campos são obrigatórios!");
    }
    users.push(req.body);
    res.status(201).send("OK");
})

app.post("/tweets", (req, res) => {
    const user = req.headers.user;

    if(!user || !req.body.tweet) {
        return res.status(400).send("Todos os campos são obrigatórios!");
    }
    tweets.push(
        {
            username: user,
            tweet: req.body.tweet
        }
    );
    res.status(201).send("OK");
})

app.get("/tweets", (req, res) => {
    for (let i = 0; i < tweets.length; i++) {
        for (let j = 0; j < users.length; j++) {
            if(tweets[i].username === users[j].username) {
                tweets[i].avatar = users[j].avatar;
            }
        }
    };

    const { page } = req.query;
    if ( !page ) {
        page = 1;
    }
    if (page < 1) {
        return res.status(400).send("Informe uma página válida!");
    }

    res.send(tweets.slice(page * -10).reverse());
});

function filterUser (tweets, user) {
    if (!user) {
        return true;
    }
    return tweets.username === user;
}

app.get("/tweets/:username", (req, res) => {
    const user = req.params.username;

    const tweetsFrom = tweets.filter((tweets) => {
        return (
            filterUser(tweets, user)
        );
    });
    res.send(tweetsFrom);
})

app.listen(5000, () => console.log("Listen on 5000"));