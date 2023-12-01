import { Steps } from "rsuite";
import "./DonationModal.css";

function DonationModal({ closeHandler }) {
  return (
    <>
      <div className="modalContainer" onClick={closeHandler}></div>
      <div className="modalItemsWrapper">
        <Steps current={0}>
          <Steps.Item />
          <Steps.Item />
          <Steps.Item />
        </Steps>
      </div>
    </>
  );
}

export default DonationModal;
