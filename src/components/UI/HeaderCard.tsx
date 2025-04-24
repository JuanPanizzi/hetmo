import { Button } from "primereact/button"

interface HeaderCardProps {
  title: string;
  subtitle?: string;
  buttonLabel?: string;
  buttonIcon?: string;
  onButtonClick?: () => void;
  secondaryButtonLabel?: string;
  secondaryButtonIcon?: string;
  onSecondaryButtonClick?: () => void;
}

export const HeaderCard = ({
  title,
  subtitle,
  buttonLabel,
  buttonIcon = "pi pi-plus",
  onButtonClick,
  secondaryButtonLabel,
  secondaryButtonIcon = "pi pi-arrow-left",
  onSecondaryButtonClick
}: HeaderCardProps) => {
  
  
  return (

    <div className="bg-[#282936] rounded-lg mx-3 sm:mx-5 p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center shadow-lg">

      <div className="flex flex-col mb-4 sm:mb-0">
        <h1 className=" text-lg sm:text-2xl md:text-3xl font-semibold">{title}</h1>
        {subtitle && <p className="text-xs sm:text-sm text-gray-400 sm:py-1">{subtitle}</p>}
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:max-w-[340px] md:max-w-[400px] ">
        {secondaryButtonLabel && onSecondaryButtonClick && (
          <Button
            label={secondaryButtonLabel}
            icon={secondaryButtonIcon}
            onClick={onSecondaryButtonClick}
            className={`w-full p-2 sm:p-3  max-sm:text-xs sm:text-sm md:text-base  ${secondaryButtonLabel && secondaryButtonLabel === 'Historial de Transacciones' ? 'sm:hidden' : ''}`}
            outlined
            severity="contrast"
          />
        )}
        {buttonLabel && onButtonClick && (
          <Button
            label={buttonLabel}
            icon={buttonIcon}
            onClick={onButtonClick}
            className="p-2 sm:p-3  max-sm:text-xs sm:text-sm md:text-base  sm:w-full sm:w-auto "
          />
        )}
      </div>
    </div>


  )
}
