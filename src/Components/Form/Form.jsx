import "./Form.scss";

const Form = ({ value, handleChange, handleSubmit }) => {
  return (
    <form className="form__group">
      <input
        type="input"
        className="form__field"
        placeholder="Location"
        name="Location"
        value={value}
        onChange={handleChange}
        id="Location"
        required
      />
      <label for="name" className="form__label">
        Location
      </label>
      <button className="form__button" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
};

export default Form;
