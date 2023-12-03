import "./Input.css";

function Input({ value, setValue, label, control }) {
  function handleChange(e) {
    setValue({ ...value, [e.target.name]: e.target.value });
  }
  return (
    <div className="inputWrapper">
      <input
        className="loginInput"
        type="text"
        name={control}
        id={control}
        value={value[control]}
        onChange={handleChange}
      />
      <label className={`loginInputLable ${value[control] && "inputActive"}`}>
        {label}
      </label>{" "}
    </div>
  );
}

export default Input;
