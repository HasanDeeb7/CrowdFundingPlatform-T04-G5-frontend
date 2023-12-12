import React, { useState } from "react";
import { motion } from "framer-motion";
import "./DepositModal.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import axios from "axios";

function DepositModal({ closeHandler }) {
  const [depositAmount, setDepositAmount] = useState({ depositAmount: null });

  async function deposit() {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_BACKEND_ENDPOINT}donors/deposit`,
        {
          balance: depositAmount,
        }
      );
      if (response) {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const modalVariants = {
    closed: { opacity: 0, scale: 0, width: 0, height: 0 },
    opened: {
      opacity: 1,
      scale: 1,
      width: "400px",
      height: "300px",
      transform: "translate(-50%, -50%)",
    },
  };
  return (
    <div>
      <div className="depositModalContainer" onClick={closeHandler}></div>
      <motion.div
        variants={modalVariants}
        initial="closed"
        animate="opened"
        transition={{
          duration: 0.4,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        exit="closed"
        className="depositModalItemsWrapper"
      >
        <Input
          control="depositAmount"
          value={depositAmount}
          setValue={setDepositAmount}
          label="Deposit Amount"
          type="number"
        />
        <Button action="Deposit" onClick={() => deposit()} />
      </motion.div>
    </div>
  );
}

export default DepositModal;
