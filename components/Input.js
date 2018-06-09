import PropTypes from 'prop-types';

const Input = (props) => (
  <label className="label">
    {props.label}:
    <input
      name={props.name}
      className="input"
      type={props.type}
      placeholder={props.placeholder}
    />
    <style jsx>{`
      .label {
        display: flex;
        flex-direction: column;
        margin-bottom: 8px;
      }

      .input {
        font-size: 16px;
        padding: 8px;
      }
    `}</style>
  </label>
);

Input.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired
};

export default Input;
