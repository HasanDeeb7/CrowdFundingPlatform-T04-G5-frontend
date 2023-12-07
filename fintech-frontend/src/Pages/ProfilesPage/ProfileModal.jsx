import "./ProfileModal.css";
import { useState } from "react";
import { motion } from "framer-motion";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";

function ProfileModal({ closeHandler }) {
  const [profile, setProfile] = useState({
    firstName: "Louai",
    lastName: "Baghdadi",
    bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, whe",
    password: "",
    phone: "701780560",
    address: "Tripoli , Lebanon",
  });
  const modalVariants = {
    closed: { opacity: 0, scale: 0, width: 0, height: 0 },
    opened: {
      opacity: 1,
      scale: 1,
      width: "500px",
      height: "700px",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <>
      <div className="modalContainer" onClick={closeHandler}></div>
      <motion.div
        variants={modalVariants}
        initial="closed"
        animate="opened"
        transition={{
          duration: 0.4,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        exit="closed"
        className="modalItemsWrapper"
      >
        <div style={{display:"flex", flexDirection:"column" , rowGap:"20px" , alignContent:"center" , justifyContent:"center" , margin:"0 auto"}}>
          <Input
            label="First Name"
            value={profile}
            setValue={setProfile}
            control="firstName"
          />
          <Input
            label="Last Name"
            value={profile}
            setValue={setProfile}
            control="lastName"
          />
          <Input
            label="Biography"
            value={profile}
            setValue={setProfile}
            control="bio"
          />
          <Input
            label="Password"
            value={profile}
            setValue={setProfile}
            control="password"
          />
          <Input
            label="Phone"
            value={profile}
            setValue={setProfile}
            control="phone"
          />
          <Input
            label="Address"
            value={profile}
            setValue={setProfile}
            control="address"
          />
        </div>

        <Button action="Save" />
        <Button action="Cancel" onClick={closeHandler} />
      </motion.div>
    </>
  );
}

export default ProfileModal;
