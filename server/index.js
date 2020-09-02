const express = require("express")

const app = express();
app.set('secret','ascbwdwqjcicchcj')

app.use(express.json())
app.use(require('cors')())

app.use("/uploads",express.static(__dirname+'/uploads'))

require("./plugins/db")(app)
require('./routes/admin')(app)

app.listen("3000",()=>{
    console.log("app is listing 3000")
})