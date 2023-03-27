import "./Card.css";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import ftABI from "./fakeTokenAbi.json";
import atToken from "./anotherTokenAbi.json";
import mpABI from "./marketPlaceABI.json";

function Card(props) {
  const [Bought, setBought] = useState(false);

  const checkBought = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const currentAddress = await provider.getSigner().getAddress();
    const marketplaceContract = new ethers.Contract(
      "0x2201Ed34683ac0246a4Bd9f220B5F2Eac3C6c164",
      mpABI,
      signer
    );
    const bought = await marketplaceContract.alreadyBought(currentAddress);
    setBought(bought);
    console.log(Bought);
  };
  const Connect = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts");
    console.log("Trying to connect");
  };

  const payInETH = async () => {
    Connect();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const currentAddress = await provider.getSigner().getAddress();
    const marketplaceAddress = "0x2201Ed34683ac0246a4Bd9f220B5F2Eac3C6c164";
    const marketplaceContract = new ethers.Contract(
      marketplaceAddress,
      mpABI,
      signer
    );
    const amount = await provider.getBalance(currentAddress);
    const formatted = ethers.utils.formatEther(amount);
    console.log(formatted);
    const price = await marketplaceContract.getPriceOfETH();

    console.log(ethers.utils.formatEther(price));
    console.log(ethers.utils.formatEther(amount));

    if (ethers.utils.formatEther(amount) >= ethers.utils.formatEther(price)) {
      console.log("trying to buy");
      //they can buy
      const pay = await marketplaceContract.payInETH({ value: price });
      console.log(pay);
      const receipt = await pay.wait();
      if (receipt.confirmations > 0) {
        setBought(pay);
        console.log(pay);
      }
    } else {
      console.log("Not enough eth" + amount + ":" + price);
      //they can't buy
    }
  };

  const payInFT = async () => {
    Connect();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const currentAddress = await provider.getSigner().getAddress();
    const marketplaceAddress = "0x2201Ed34683ac0246a4Bd9f220B5F2Eac3C6c164";
    const marketplaceContract = new ethers.Contract(
      marketplaceAddress,
      mpABI,
      signer
    );
    const token = new ethers.Contract(
      "0x7F0Ff331e18EBf0Ea65CD9146659D8aC2160287E",
      ftABI,
      signer
    );

    const totalAmount = await token.balanceOf(currentAddress);
    const totalAllowed = await token.allowance(
      currentAddress,
      marketplaceAddress
    );
    const price = await marketplaceContract.price();

    console.log("TOTAL:" + totalAmount);
    console.log("ALLOWED:" + totalAllowed);
    console.log("PRICE:" + price);

    if (price <= totalAmount) {
      //They have enough to buy
      if (price <= totalAllowed) {
        //they can buy
        const purchase = await marketplaceContract.payInFT();
        setBought(purchase);
      } else {
        //they have enough money, but they need to allow it
        const approve = await token.approve(marketplaceAddress, price);
        const receipt = await approve.wait();
        if (receipt.confirmations > 0) {
          const purchase = await marketplaceContract.payInFT();
          setBought(purchase);
        }
      }
    } else {
      //they don't have enough to buy
    }
  };
  const payInAFT = async () => {
    Connect();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const currentAddress = await provider.getSigner().getAddress();
    const marketplaceAddress = "0x2201Ed34683ac0246a4Bd9f220B5F2Eac3C6c164";
    const marketplaceContract = new ethers.Contract(
      marketplaceAddress,
      mpABI,
      signer
    );
    const token = new ethers.Contract(
      "0x379C36d38252D5674e2707b6eE276a5Fb8Ba1097",
      atToken,
      signer
    );

    const totalAmount = await token.balanceOf(currentAddress);
    const totalAllowed = await token.allowance(
      currentAddress,
      marketplaceAddress
    );
    const price = await marketplaceContract.price();

    console.log("TOTAL:" + totalAmount);
    console.log("ALLOWED:" + totalAllowed);
    console.log("PRICE:" + price);

    if (price <= totalAmount) {
      //They have enough to buy
      if (price <= totalAllowed) {
        //they can buy
        const purchase = await marketplaceContract.payInAFT();
        setBought(purchase);
      } else {
        //they have enough money, but they need to allow it
        const approve = await token.approve(marketplaceAddress, price);
        const receipt = await approve.wait();
        if (receipt.confirmations > 0) {
          const purchase = await marketplaceContract.payInAFT();
          setBought(purchase);
        }
      }
    } else {
      //they don't have enough to buy
    }
  };

  useEffect(() => {
    checkBought();
  }, []);
  return (
    <div className="card">
      <div class="card__image-container">
        <img src={props.imageURL} width="400" />
      </div>
      <div class="card__content">
        <p class="card__title text--medium">{props.name}</p>
        <div class="card__info">
          <p class="text--medium">{props.description} </p>
        </div>
        <div>
          <img
            onClick={payInAFT}
            class="buyIcon"
            src="https://imgur.com/MQHRBrg.png"
          ></img>
          <img
            onClick={payInFT}
            class="buyIcon"
            src="https://imgur.com/wndKTZS.png"
          ></img>
          <img
            onClick={payInETH}
            class="buyIcon"
            src="https://imgur.com/sQsv7UD.png"
          ></img>
        </div>
        <div>
          <p class="card__price text__price">
            {props.price != null ? props.price : "Enter"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;
