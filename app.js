
const express=require("express");
const app=express();
const PORT =5000;
const product_routes=require("./routes/products");
const product=require("./data/product");
const connect=require("./data/connect");
app.use(express.json());

app.get("/",(req,resp)=>{
  resp.send(`i am live`);

})

connect();
app.use("/api/use", product_routes);

app.listen(PORT,()=>{
    console.log(`${PORT} here`);
  })