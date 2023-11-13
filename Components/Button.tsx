interface ButtonProps {
    onClick?: () => void;
    children?: React.ReactNode; 
}

const Button: React.FC<ButtonProps> = ({
    onClick,
    children,
}) => {
    return ( 
        <button
          onClick={onClick}
          className='
            flex 
            justify-center 
            border
            text-center
            rounded-md 
            px-3 
            py-2 
            text-sm 
            font-semibold 
            w-full
          '
        >
            {children}
        </button>
    );
}

export default Button;
