import "./Form.scss";

const Form = () => {
  return (
    <div className="form__group">
      <input
        type="input"
        className="form__field"
        placeholder="Location"
        name="Location"
        id="Location"
        required
      />
      <label for="name" className="form__label">
        Location
      </label>
    </div>
  );
};

export default Form;
