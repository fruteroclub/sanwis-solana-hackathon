import { useRef } from "react";
import { products } from "../lib/products"
import NumberInput from "./NumberInput";
import Image from 'next/image'

interface Props {
  submitTarget: string;
  enabled: boolean;
}

export default function Products({ submitTarget, enabled }: Props) {
  const formRef = useRef<HTMLFormElement>(null);



  return (
    <form method='get' action={submitTarget} ref={formRef}>
      <div className='flex flex-col gap-16'>
        <div className="grid grid-cols-2 gap-8">
          {products.map(product => {
            return (
              
              <div className="rounded-md bg-red-700 text-left p-8" key={product.id}>
                
                <Image 
                  src= {product.url}
                  alt="imgss"
                  width={500}
                  height={200}
                />
                <h3 className="text-2xl font-bold text-white">{product.name}</h3>
                <p className="text-sm text-white">{product.description}</p>
                <p className="my-4 ">
                  <span className="mt-4 text-xl text-white font-bold">{product.priceUsd} USD</span>
                  {product.unitName && <span className="text-sm text-white"> /{product.unitName}</span>}
                </p>
                <div className="mt-1">
                  <NumberInput name={product.id} formRef={formRef} />
                </div>
              </div>
            )
          })}

        </div>

        <button
          className="items-center px-20 rounded-md py-2 max-w-fit self-center bg-gray-900 text-white hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!enabled}
        >
          Checkout
        </button>
      </div>
    </form>
  )
}
