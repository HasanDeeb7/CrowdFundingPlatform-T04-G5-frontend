import React , {useEffect, useState} from "react";
import { Form, ButtonToolbar, Button } from "rsuite";

function ProfileModal({ closeHandler , userData , onInputChange }) {

  const handleFormClick = (e) => {
    if (e.target.tagName.toLowerCase() === "input") {
      e.stopPropagation();
    }
  };

  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    password: '',
    phone : '',
    address:''
  });

  useEffect(() =>{
    setFormData({
      name : userData.name || '' ,
      bio : userData.bio || '' ,
      password : userData.password || '' ,
      phone : userData.phone || '',
      address : userData.address || ''
    })
  }, [userData])

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

 
  return (
    <div className="modalContainer" onClick={closeHandler}>
      <Form
        fluid
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "20px" }}
        onClick={handleFormClick}
      >
        <Form.Group controlId="name-1">
          <Form.ControlLabel className="custom-label">UserName</Form.ControlLabel>
          <Form.Control name="userName" type="text" value={formData.name} onChange={(value) => handleInputChange('name', value)}/>
        </Form.Group>

        <Form.Group controlId="bio-1">
          <Form.ControlLabel>Bio</Form.ControlLabel>
          <Form.Control name="bio" type="text" value={formData.bio} onChange={(value) => handleInputChange('bio', value)} />
        </Form.Group>

        <Form.Group controlId="password-1">
          <Form.ControlLabel>Password</Form.ControlLabel>
          <Form.Control name="password" type="password" autoComplete="off" value={formData.password}
            onChange={(value) => handleInputChange('password', value)} />
        </Form.Group>

        <Form.Group controlId="phone-1">
          <Form.ControlLabel>Contact</Form.ControlLabel>
          <Form.Control name="phone" type="text" value={formData.phone} onChange={(value) => handleInputChange('phone', value)} />
        </Form.Group>

        <Form.Group controlId="address-1">
          <Form.ControlLabel>Address</Form.ControlLabel>
          <Form.Control name="address" type="text" value={formData.address} onChange={(value) => handleInputChange('address', value)} />
        </Form.Group>

        <Form.Group>
          <ButtonToolbar>
            <Button appearance="primary">Save</Button>
            <Button appearance="default">Cancel</Button>
          </ButtonToolbar>
        </Form.Group>
      </Form>
    </div>
  );
}

export default ProfileModal;
