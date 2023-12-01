import { Steps } from "rsuite";
import "./DonationModal.css";

function DonationModal() {
  return (
    <div className="modalContainer">
      <div className="modalItemsWrapper">
        <Steps current={0}>
          <Steps.Item />
          <Steps.Item />
          <Steps.Item />
        </Steps>
      </div>
    </div>
  );
}

export default DonationModal;
