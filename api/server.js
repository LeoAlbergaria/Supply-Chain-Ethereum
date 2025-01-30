require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");

const CONTRACT_ADDRESS = "";
const RPC_URL = "http://127.0.0.1:8545";

const productABI = [
  "function addProduct(string,string,string,string,string,string,string) public",
  "function getAllProducts() public view returns (tuple(string bizStep,string disposition,string bizTransaction,string readPoint,string epc,string eventTime,string eventTimeZoneOffset)[])"
];

const provider = new ethers.JsonRpcProvider(RPC_URL);
const signer = provider.getSigner(0);

let productContract = new ethers.Contract(CONTRACT_ADDRESS, productABI, signer);

const app = express();
app.use(cors());
app.use(express.json());

app.post("/products", async (req, res) => {
  try {
    const {
      bizStep,
      disposition,
      bizTransaction,
      readPoint,
      epc,
      eventTime,
      eventTimeZoneOffset
    } = req.body;

    if (
      !bizStep ||
      !disposition ||
      !bizTransaction ||
      !readPoint ||
      !epc ||
      !eventTime ||
      !eventTimeZoneOffset
    ) {
      return res.status(400).json({ error: "Missing fields in request body" });
    }

    const tx = await productContract.addProduct(
      bizStep,
      disposition,
      bizTransaction,
      readPoint,
      epc,
      eventTime,
      eventTimeZoneOffset
    );
    await tx.wait();

    return res.json({ message: "Product created successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

app.get("/products", async (req, res) => {
  try {
    const allProducts = await productContract.getAllProducts();
    return res.json(allProducts);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});