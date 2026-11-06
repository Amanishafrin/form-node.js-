
const http=require("http")
const fs=require("fs")
const url=require("url")
const querystring=require("querystring")

const server=http.createServer((req,res)=>{
    if(req.url=="/"){
        fs.readFile("index.html","utf-8",(err,data)=>{
            if(err)throw err;
            res.statusCode=200
            res.end(data)
        })
    }
    else if(req.url=="/form"){
        fs.readFile("form.html","utf-8",(err,data)=>{
            if (err) throw err;
            res.statusCode=200
            res.end(data)
        })
    }
    else if(req.url.startsWith("/save")){
        let urlForm=url.parse(req.url)
        console.log(urlForm.query)

        let queryParse=querystring.parse(urlForm.query)
        console.log(queryParse)

        let name=queryParse.name
        let email=queryParse.email
        let number=queryParse.number
        let department=queryParse.department
        let year=queryParse.year

        fs.appendFile("data.csv",`${name},${email},${number},${department},${year}\n`,(err)=>{
            if (err) throw err;
            res.end("created")
        })
    }
    else{
        res.statusCode=404
        res.end("Page not found")
    }
})

server.listen(3005,()=>{
    console.log("form is running on port http://localhost:3005")
})
