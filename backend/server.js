const express = require("express")
const bcrypt = require("bcrypt")
const cors = require("cors")
const mysql = require("mysql")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const app = express()
app.use(express.json())
app.use(cors())

var ID=0;
const conn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"test",
})

conn.connect((err)=>{
    if(err)
    return console.log(err)
    console.log("Connected successfully")
})

var sql_query = 'create table Exam5 (id varchar(5) , question varchar(500) , option_a varchar(100) , option_b varchar(100) , option_c varchar(100) , option_d varchar(100) , correct_option varchar(100))'

conn.query(sql_query , (err , res)=>{
    if(err) return console.log(err)
    console.log("Database created successfully")
})

sql_query = 'create table signup (email varchar(200) , mobile varchar(15) , password varchar(1000))'

conn.query(sql_query , (err , res)=>{
    if(err) return console.log(err)
    console.log("Database created successfully")
})

const execute = (sql_query) => {
    conn.query(sql_query , (err , res)=>{
    if(err) return console.log(err)
    console.log("Record inserted successfully")
    }
)}

sql_query = 'insert into exam5 values ("1" , "Who developed Python Programming Language?" , "Wick van Rossum" ,"Rasmus Lerdorf" , "Guido van Rossum" , "Niene Stom" , "c" )'
execute(sql_query)
sql_query = 'insert into exam5 values ("2" , "Which type of Programming does Python support?" , "object-oriented programming" ,"structured programming" , "functional programming" , "all of the mentioned" , "d" )'
execute(sql_query)
sql_query = 'insert into exam5 values ("3" , "Is Python case sensitive when dealing with identifiers?" , "no" ,"yes" , "machine dependent" , "none of the mentioned" , "a" )'
execute(sql_query)
sql_query = 'insert into exam5 values ("4" , "Which of the following is the correct extension of the Python file?" , ".python" ,".pl" , ".py" , ".p" , "c" )'
execute(sql_query)
sql_query = 'insert into exam5 values ("5" , "Is Python code compiled or interpreted?" , "Python code is both compiled and interpreted" ,"Python code is neither compiled nor interpreted" , "Python code is only compiled" , "Python code is only interpreted" , "a" )'
execute(sql_query)
sql_query = 'insert into exam5 values ("6" , "All keywords in Python are in _________" , "Capitalized" ,"lower case" , "UPPER CASE" , "None of the mentioned" , "d" )'
execute(sql_query)
sql_query = 'insert into exam5 values ("7" , "What will be the value of the following Python expression? 4 + 3 % 5" , "7" ,"2" , "4" , "1" , "a" )'
execute(sql_query)
sql_query = 'insert into exam5 values ("8" , "Which of the following is used to define a block of code in Python language?" , "Indentation" ,"Key" , "Brackets" , "All of the mentioned" , "a" )'
execute(sql_query)
sql_query = 'insert into exam5 values ("9" , "Which keyword is used for function in Python language?" , "Function" ,"Def" , "Fun" , "Define" , "b" )'
execute(sql_query)
sql_query = 'insert into exam5 values ("10" , "Which of the following character is used to give single-line comments in Python?" , "//" ,"#" , "!" , "/*" , "b" )'
execute(sql_query)

const isAuthorized = (req , res , next) =>{
    const authToken = req.headers.authorization
    console.log(authToken)
    const authResult = authToken && authToken.split(" ")[1] 
    console.log(authResult)
    if(authResult == null) return res.sendStatus(401)
    jwt.verify(authResult , process.env.ACCESS_TOKEN_SECRET , (err , user)=>{
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

app.post("/login",(req , res)=>{
    var sql = `select password from SIGNUP where email="${req.body.email}" or mobile="${req.body.email}"`;
    var password = req.body.password
    conn.query(sql , (err , result , data)=>{
        if(err) {
            return res.sendStatus(500)
        }else{
            const ret_data = JSON.parse(JSON.stringify(result));
            (
                async()=>{
                    try{
                        const result_crypt = await bcrypt.compare((password).toString() , (ret_data[0]["password"]).toString())
                        if(result_crypt){
                            const accessToken = jwt.sign(req.body.email , process.env.ACCESS_TOKEN_SECRET)
                            res.send({accessToken:accessToken})
                        }
                        else{
                            res.status(501)
                        }
                    }
                    catch(err){
                        console.log(err)
                        res.status(500)
                    }
                }
            )();    
        }
    })
})

app.post("/signup", async(req,res)=>{
    var password = await bcrypt.hash(req.body.password , 10)
    console.log(req.body.email)
    var sql = `INSERT INTO SIGNUP VALUES ("${req.body.email}","${req.body.mobile}","${password}")`;
    conn.query( sql , (err)=>{
        if(err) return console.log(err)
    })
    const accessToken = jwt.sign(req.body.email , process.env.ACCESS_TOKEN_SECRET)
    console.log(accessToken)
    res.status(201).send({accessToken:accessToken})
})


app.get("/questions",isAuthorized ,(req , res)=>{
    var sql = 'select * from exam5'
    conn.query(sql , (err , result)=>{
        if(err)
        return console.log(err)
        console.log("Retrived successfully")
        res.status(200)
        res.send({data:result})
    })
})

app.get("/",(req , res)=>{
    res.status(200)
    res.send("Hello world")
})

app.listen(8000, ()=>{
    console.log("Server started on 8000")
})