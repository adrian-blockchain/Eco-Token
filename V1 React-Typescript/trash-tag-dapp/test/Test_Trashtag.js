const Trashtag = artifacts.require("TrashTag");

contract("Trashtag", async accounts =>{
    it("Should check the ownernship", async ()=>{
      const instance = await Trashtag.deployed();
      const admin = await instance.getAdmin.call();
      console.log(admin)
      assert.equal(admin, accounts[0]);
    });

    it("should check creation of 100 coins and 1 token", async ()=>{
        const instance = await Trashtag.deployed();
        const uri = "Random URI";


        const account_user = accounts[1];
        //Mint 100 ERC20 and 1 NFT
        await instance.approve(account_user, {from:accounts[0]});
        await instance.mint(uri,{from:account_user})


        //Get Balance and id NFT
        const amountNFT = await instance.getAmountNFT.call(account_user);
        assert.equal(amountNFT, 1, "NFT ID not correct");


        //Check Balance coin
        const amountCoin = await instance.getBalanceCoin.call(account_user);
        assert.equal(amountCoin, 100, "Amount coin is not correct");

        //Check URI of the token
        let tokenURI = await instance.getURI(amountNFT, {from:account_user});
        assert.equal(tokenURI, uri, "URI's are not identical");

    })

    it("Should mint 100Coins and send it to addr2", async ()=>{
        const instance = await Trashtag.deployed();
        const newUri = "Random URI"
        const oldUri = "not yours anymore";

        const admin = accounts[0]
        const addr1 = accounts[1];
        const addr2 = accounts[2]
        //Mint 100 ERC20 (and 1 NFT)
        await instance.approve(addr1, {from:admin});
        await instance.mint(newUri,{from:addr1});

        await instance.sendCoin(addr2, 100,{from: addr1});


        //Balance each addr
        const balanceAddr1 = await instance.getBalanceCoin(addr1);
        assert.equal(balanceAddr1, 0, "Should be equal to 0")

        const balanceAddr2 = await instance.getBalanceCoin(addr2);
        assert.equal(balanceAddr2,100, "should be equal to 100");
    })

    it("Should mint 100Coins and send it to addr2", async ()=>{
        const instance = await Trashtag.deployed();
        const newUri = "Random URI";
        const oldUri = "not yours anymore";

        const admin = accounts[0]
        const addr1 = accounts[1];
        const addr2 = accounts[2]
        //Mint 100 ERC20 (and 1 NFT)
        await instance.approve(addr1, {from:admin});
        await instance.mint(newUri,{from:addr1});

        const idToken = await instance.getAmountNFT(addr1);
        await instance.sendToken(addr2, idToken,{from: addr1});


        //Balance each addr
        const balanceAddr1 = await instance.getAmountNFT(addr1);
        assert.equal(balanceAddr1, 0, "Should be equal to 0");

        const balanceAddr2 = await instance.getAmountNFT(addr2);
        assert.equal(balanceAddr2,1, "should be equal to 100");

        const URIAddr1 = await instance.getURI(idToken, {from:addr1});
        assert.equal(URIAddr1,oldUri, "URI Should be reset");

        const idToken2 = await instance.getAmountNFT(addr2);
        const URIAddr2 = await instance.getURI(idToken2, {from: addr2})
        assert.equal(URIAddr2, newUri, "URI Should be the mint from addr1")

    })
})