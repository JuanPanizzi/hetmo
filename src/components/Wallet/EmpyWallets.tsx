

export const EmptyWallets = () => {


  return (
    <div className="flex flex-col items-center justify-center flex-1 mt-12 sm:mt-24 text-center">
      <div className="bg-[#282936] p-6 rounded-full mb-6 border border-[#3E4053]">
        <i className="pi pi-wallet text-4xl sm:text-6xl text-purple-400" />
      </div>

      <h1 className=" sm:text-2xl text-gray-200 mb-2">
        No se registran carteras en este momento
      </h1>

      <p className="text-gray-400 mb-6">
        Crea una para empezar a operar
      </p>

    </div>
  )
}
