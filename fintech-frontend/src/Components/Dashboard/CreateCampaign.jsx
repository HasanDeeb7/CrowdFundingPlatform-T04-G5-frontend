import React, { useRef, useState } from "react";
import "./CreateCampaign.css";
import { AnimatePresence, motion } from "framer-motion";
import Input from "../Input/Input";
import Button from "../Button/Button";
function CreateCampaign({ closeHandler }) {
  const [newCampaign, setNewCampaign] = useState({
    title: "",
    target: "",
    description: "",
    amountContributed: null,
    status: "pending",
  });

  const [isDisabled, setIsDisabled] = useState(false);
  const fileInputRef = useRef(null);

  function fileInput() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  function handleCreateCampaign() {
    console.log("Create Campaign");
  }
  const modalVariants = {
    closed: { opacity: 0, scale: 0, width: 0, height: 0 },
    opened: {
      opacity: 1,
      scale: 1,
      width: "500px",
      height: "700px",
      transform: "translate(-50%, -50%)",
    },
    exit: {opacity: 0}
  };
  const formVariants = {
    closed: { x: -400 },
    opened: { x: 0 },
  };
  return (
    <>
      <div className="createModalContainer" onClick={closeHandler}></div>
      <AnimatePresence>
        <motion.div
          variants={modalVariants}
          initial="closed"
          animate="opened"
          transition={{
            duration: 0.3,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          exit='exit'
          className="createModalItemsWrapper"
        >
          <h3>New Campaign</h3>
          <motion.div
            variants={formVariants}
            initial="closed"
            animate="opened"
            transition={{
              delay: 0.1,
              duration: 0.4,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            exit="closed"
            className="createCampaignForm"
          >
            <Input
              control="title"
              value={newCampaign}
              setValue={setNewCampaign}
              label="Title"
              isDisabled={isDisabled}
            />
            <Input
              control="target"
              value={newCampaign}
              setValue={setNewCampaign}
              label="Target"
              isDisabled={isDisabled}
              type="number"
            />
            <Input
              control="description"
              value={newCampaign}
              setValue={setNewCampaign}
              label="Description"
              isDisabled={isDisabled}
            />
            <label
              className="uploadBtn"
              htmlFor="fileInput"
              onClick={fileInput}
            >
              Upload Image
            </label>
            <input type="file" className="hidden" ref={fileInputRef} />
            <Button action="Create" onClick={handleCreateCampaign} />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default CreateCampaign;
