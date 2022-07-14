const {expect} = require("chai");

const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

describe("Token contract",function(){

    it("Deployment should assign the total supply of tokens to the owner",async function(){

        const [owner] = await ethers.getSigners();

        
        const Token = await ethers.getContractFactory("Token"); //instance contract

        const hardhatToken = await Token.deploy(); // deploy contract 

        const ownerBalance = await hardhatToken.balanceOf(owner.address); // ownerBalance  = 10000
       

        expect(await hardhatToken.totalSupply()).to.equal(ownerBalance); // total supply = 10000
    });
    it("Transfer tokens b/w accounts",async function(){

        const [owner,add1,add2] = await ethers.getSigners();

        
        const Token = await ethers.getContractFactory("Token"); //instance contract

        const hardhatToken = await Token.deploy(); // deploy contract 
        // transfer 10 tokens from owner to add1

        await hardhatToken.transfer(add1.address,10);

        expect(await hardhatToken.balanceOf(add1.address)).to.equal(10);

        // transfer 5 tokens from add1 to add2
        await  hardhatToken.connect(add1).transfer(add2.address,5);

        expect(await hardhatToken.balanceOf(add2.address)).to.equal(5);
        


     
    })  
})