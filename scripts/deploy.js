const hre = require("hardhat");

async function main() {
  const Product = await hre.ethers.getContractFactory("ProductContract");
  const product = await Product.deploy();

  await product.waitForDeployment();

  const deployedAddress = await product.getAddress();

  console.log("Product contract deployed to:", deployedAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});