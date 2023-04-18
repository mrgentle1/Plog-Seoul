import "./Button.css";

export const Button = ({ children }) => {
  return <button className="button">{children}</button>;
};

export const DisabledButton = ({ children }) => {
  return <button className="disabled-button">{children}</button>;
};
