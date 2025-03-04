"use client";

import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {

  const [nit, setNit] = useState('')
  const router = useRouter()

  const handleNitChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNit(e.target.value)
  }
  
  const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(nit === '') {
      alert('El campo NIT no puede estar vacio')
      return
    }

    router.push(`/certificados/${nit}`)

  }

  return (
    <div className="h-screen flex flex-col lg:flex-row items-center justify-center sm:bg-[url('/background2.svg')] bg-cover bg-center sm:p-20">
      <div className="w-full space-y-5 flex flex-col bg-white p-10 rounded-md sm:shadow-md">
        <div className="space-y-2">
          <h1 className="text-4xl text-left text-green-700">¡Bienvenido!</h1>
          <p className="text-md md:text-4xl text-left">Consulta todos tus certificados aqui</p>
        </div>

        <div>
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="flex flex-col space-y-2">
              <label className="text-md text-left">NIT de tu empresa</label>
              <input
                type="number"
                value={nit}
                onChange={handleNitChange}
                min={0}
                step={1}
                className="p-2 border border-gray-300 rounded-md focus:border-green-600 outline-none"
              />

            </div>
            <button type="submit" className="bg-green-700 w-full p-3 text-white rounded-md">Ver certificados</button>
          </form>
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
        <Image
          src="/CodyBannerIzq.png"
          width={400}
          height={400}
          alt="Cody - Mascota de Transmeralda"
          className="w-[250px] h-[300px] md:w-[350] md:h-[400]"
        />
      </div>
    </div>
  );
}
