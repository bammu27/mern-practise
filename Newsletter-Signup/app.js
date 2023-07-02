const express = require('express');
const bodyParser = require("body-parser");
const request = require('request');
const https = require('https');
const { url } = require('inspector');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/signup.html')

})
app.post('/',(req,res)=>{
  const fname = req.body.firstname;
  const lname= req.body.lastname;
  const email = req.body.email;

    var data={

        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:fname,
                    LNAME:lname
                }
            }



        ]

    };

    var jsonData = JSON.stringify(data);
    const  url = "https://us21.api.mailchimp.com/3.0/lists/8abc05b945 ";
    const options= {
        method:"POST",
        auth:"brahmaraj:b162d812db4fcbd6868da5e47d92edf4-us21_"
    }
    const request = https.request(url,options,(response)=>{

        if(response.statusCode===200){
            res.sendFile(__dirname+'/success.html')
        }
        else{

            res.sendFile(__dirname+"/failure.html")
        }

        response.on("data",(data)=>{
            console.log(JSON.parse(data))

        })
       
    })

    request.write(jsonData);
    request.end();


})

app.post('/failure',(req,res)=>{

    res.redirect('/')
})

app.listen(process.env.PORT||3000,()=>{
    console.log("server is running on port 3000");
})


//b162d812db4fcbd6868da5e47d92edf4-us21  api
//8abc05b945  list id