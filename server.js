const express=require('express')
const SpotifywebApi=require('spotify-web-api-node')
const bodyParser=require('body-parser')
const cors=require('cors')
const app=express()


app.use(cors())
app.use(bodyParser.json())

app.post('/refresh',(req,res)=>{
    const refreshToken=req.body.refreshToken
    const spotifyApi=new SpotifywebApi({
        redirectUri:'http://localhost:3000',
        clientId:'53faba11f00e406bbae4973063a93172',
        clientSecret:'d5c4339b375a4401b3730d4792ead9ba',
        refreshToken
    })
    spotifyApi.refreshAccessToken().then((data)=>{
        res.json({
            accessToken:data.body.accessToken,
            expiresIn:data.body.expiresIn
        })

        //spotifyApi.setAccessToken(data.body['access_token'])
    }).catch(()=>{
        res.sendStatus(400)
    })
})


app.post('/login',(req,res)=>{
    const code=req.body.code
    const spotifyApi=new SpotifywebApi({
        redirectUri:'http://localhost:3000',
        clientId:'53faba11f00e406bbae4973063a93172',
        clientSecret:'d5c4339b375a4401b3730d4792ead9ba'
    })

    spotifyApi.authorizationCodeGrant(code).then(data=>{
        res.json({
            accessToken:data.body.access_token,
            refreshToken:data.body.refresh_token,
            expiresIn:data.body.expires_in
        }) 
    })
    .catch(()=>{
        res.sendStatus(400)
    })
})

app.listen(3001)