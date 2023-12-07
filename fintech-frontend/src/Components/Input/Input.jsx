import "./Input.css";

function Input({ value, setValue, label, control, isDisabled= false, type='text' }) {
  function handleChange(e) {
    setValue({ ...value, [e.target.name]: e.target.value });
  }
  return (
    <div className="inputWrapper">
      <input
        className="loginInput"
        type={type}
        name={control}
        id={control}
        value={value[control]}
        onChange={handleChange}
        disabled={isDisabled}
      />
      <label className={`loginInputLable ${value[control] && "inputActive"}`}>
        {label}
      </label>{" "}
    </div>
  );
}

export default Input;
