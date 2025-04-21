import { Button } from "primereact/button"

interface HeaderCardProps {
  title: string;
  subtitle?: string;
  buttonLabel?: string;
  buttonIcon?: string;
  onButtonClick?: () => void;
}

export const HeaderCard = ({ 
  title, 
  subtitle, 
  buttonLabel, 
  buttonIcon = "pi pi-plus",
  onButtonClick 
}: HeaderCardProps) => {
  return (
    <div className="bg-[#282936] rounded-lg mx-5 p-5 flex flex-col sm:flex-row justify-between items-center shadow-lg mt-2 border-[1px] border-[#3E4053]">
      <div className="flex flex-col mb-4 sm:mb-0">
        <h1 className="text-4xl font-semibold">{title}</h1>
        {subtitle && <p className="text-sm p-1 text-gray-400">{subtitle}</p>}
      </div>
      {buttonLabel && onButtonClick && (
        <Button 
          label={buttonLabel} 
          icon={buttonIcon} 
          onClick={onButtonClick}
          className="w-full sm:w-auto" 
        />
      )}
    </div>
  )
}
