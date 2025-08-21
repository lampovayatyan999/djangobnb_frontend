

interface CustomButtonProps {
    label: string;
    className?: string;
    onClick: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
    label,
    className,
    onClick
}: CustomButtonProps) => {
    return ( 
        <div
            onClick={onClick}
            className={` py-4 bg-red-500 text-center hover:bg-red-600 text-white rounded-xl transition cursor-pointer ${className}`}>
            {label}
        </div>
     );
}
 
export default CustomButton;