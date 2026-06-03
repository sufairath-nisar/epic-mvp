import ArrowCircle from "./ArrowCircle";

const MobileNextButton = ({ className = "", label = "Show next", onClick }) => {
  return (
    <ArrowCircle className={`md:hidden ${className}`} label={label} onClick={onClick} size="sm" tone="pink" />
  );
};

export default MobileNextButton;
