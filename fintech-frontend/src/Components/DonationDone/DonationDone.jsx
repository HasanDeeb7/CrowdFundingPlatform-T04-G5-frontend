import "./DonationDone.css";
import { FaCheck } from "react-icons/fa6";
import { delay, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
function DonationDone({ closeHandler }) {
  const donationDoneVariant = {
    initial: { opacity: 0, scale: 0, transfrom: "translateX(300px)" },
    computed: { opacity: 1, scale: 1, transfrom: "translateX(0)" },
  };
  const navigate = useNavigate();
  setTimeout(() => {
    closeHandler(false);
    return navigate("/campaigns", { replace: true });
  }, 1500);
  return (
    <motion.div
      variants={donationDoneVariant}
      initial="initial"
      animate="computed"
      transition={{ delay: 0.3, duration: 0.4, ease: [0, 0.7, 0.2, 1] }}
      className="donationDoneContainer"
    >
      <div className="donationDoneIcon">
        <FaCheck />
      </div>
    </motion.div>
  );
}

export default DonationDone;
