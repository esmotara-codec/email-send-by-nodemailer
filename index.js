const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Email sending server is running");
});

const emailTransporter = nodemailer.createTransport({
  service : "gmail",
  auth : {
    user : process.env.Zap_Email, 
    pass : process.env.Zap_Pass,
  }
})
console.log(process.env.Zap_Email);

//Email route
app.get("/send-payment-email", async(req, res) => {
 const  paymentInfo = {
    transactionId : "aaaaaaaa",
    user: "sohagali.ru.ac@gmail.com",
    parcelInfo : "20kg mangoo "

  }
  const emailObject = {
    from : `"Zap Email Service" <${process.env.Zap_Email}>`,
    to : paymentInfo.user,
    subject: "Zap payment delivary confirmation",
    html: `
    <h2>Payment confirmation</h2>
    <p>Thank you for the payment , We have recieved your delivary payment </p>
    <br/>
    <h3> Transaction ID : ${paymentInfo.transactionId} </h3>
    <p>If you face any issue please contact with our support team</p>
    <button>Click here </button>
    
    `
  }

  try {
      const emailInfo = await emailTransporter.sendMail(emailObject);
      console.log("email sent: ", emailInfo.messageId);
      res.send({result: 'sucess'})
  
      
    } catch (error) {
      
      console.log("email send error : ", error);
      res.send({result: 'email sent fail'})
  
      

      
    }


})

app.post("/send-email", async (req, res) => {
  const { to, subject, text } = req.body;
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});