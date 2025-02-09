const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const twilio = require("twilio");

const app = express();
app.use(cors());
app.use(bodyParser.json()); 

// Replace with your Twilio credentials
const accountSid = "AC363c16fb8248ad0808b8b2029ff5781a";
const authToken = "c04a813e6bc9ffe647216ddd6ee40913";
const client = twilio(accountSid, authToken);

const twilioPhoneNumber = "YOUR_TWILIO_PHONE_NUMBER";

// Endpoint to send OTP
app.post("/send-otp", (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ error: "Phone number is required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP

  client.messages
    .create({
      body: `Your OTP is: ${otp}`,
      from: twilioPhoneNumber,
      to: phoneNumber,
    })
    .then(() => {
      // Store the OTP in-memory (or in a database in production)
      req.app.locals[phoneNumber] = otp;
      res.status(200).json({ message: "OTP sent successfully" });
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to send OTP", details: err.message });
    });
});

// Endpoint to verify OTP
app.post("/verify-otp", (req, res) => {
  const { phoneNumber, otp } = req.body;

  if (!phoneNumber || !otp) {
    return res.status(400).json({ error: "Phone number and OTP are required" });
  }

  const storedOtp = req.app.locals[phoneNumber];

  if (storedOtp && storedOtp === otp) {
    res.status(200).json({ message: "OTP verified successfully" });
  } else {
    res.status(400).json({ error: "Invalid OTP" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
