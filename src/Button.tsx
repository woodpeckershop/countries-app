const Button = ({
  sortFunc,
  label
}: {
  sortFunc: () => void;
  label: string;
}) => {
  return (
    <button className="button" onClick={sortFunc}>
      {label}
    </button>
  );
};

export { Button };
