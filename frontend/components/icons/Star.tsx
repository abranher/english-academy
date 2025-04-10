interface SVGProps extends React.SVGProps<SVGSVGElement> {}

export const Star: React.FC<SVGProps> = (props) => (
  <svg
    className="w-5 fill-yellow-400 ml-1"
    viewBox="0 0 14 13"
    fill="none"
    {...props}
  >
    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
  </svg>
);
