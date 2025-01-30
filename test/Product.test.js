const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Product contract", function () {
  let Product;
  let product;
  let owner;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();

    Product = await ethers.getContractFactory("ProductContract");

    product = await Product.deploy();

    await product.waitForDeployment();
  });

  it("Should add a new product and retrieve it", async function () {
    const tx = await product.addProduct(
      "commissioning", 
      "active",        
      "transactionId", 
      "readPoint1",    
      "epc123",        
      "2025-11-11T15:54:08.810Z",      
      "+02:00"
    );
    await tx.wait();

    const count = await product.getProductsCount();
    expect(count).to.equal(1n);

    const storedProduct = await product.getProduct(0);

    expect(storedProduct.bizStep).to.equal("commissioning");
    expect(storedProduct.disposition).to.equal("active");
    expect(storedProduct.bizTransaction).to.equal("transactionId");
    expect(storedProduct.readPoint).to.equal("readPoint1");
    expect(storedProduct.epc).to.equal("epc123");
    expect(storedProduct.eventTime).to.equal("2025-11-11T15:54:08.810Z");
    expect(storedProduct.eventTimeZoneOffset).to.equal("+02:00");
  });

  it("Should fail when getting an invalid index", async () => {
    await expect(product.getProduct(0)).to.be.revertedWith("Invalid product index");
  });
});