import { expect } from "chai";
import { ethers } from "hardhat";
import { HelloWorld } from "../typechain-types";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("HelloWorld", function () {
  const initialMessage = "Hello World";

  async function deployFixture() {
    const [deployer, otherAccount] = await ethers.getSigners();
    const HelloWorld = await ethers.getContractFactory("HelloWorld");
    const helloWorld = await HelloWorld.deploy();
    await helloWorld.waitForDeployment();

    return { helloWorld, deployer, otherAccount };
  }

  describe("Deployment", function () {
    it("Should Hello World", async function () {
      const { helloWorld } = await loadFixture(deployFixture);
      expect(await helloWorld.message()).to.equal(initialMessage);
    });
  });

  it("Should new message", async function () {
    const { helloWorld, otherAccount } = await loadFixture(deployFixture);
    const newMessage = "David";
    
    await helloWorld.connect(otherAccount).setMessage(newMessage);
    expect(await helloWorld.message()).to.equal(newMessage);
  });
}); 