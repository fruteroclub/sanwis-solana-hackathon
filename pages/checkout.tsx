import { createQR, encodeURL, TransferRequestURLFields, findReference, validateTransfer, FindReferenceError, ValidateTransferError } from "@solana/pay";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl, Connection, Keypair } from "@solana/web3.js";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef } from "react";
import BackLink from "../components/BackLink";
import PageHeading from "../components/PageHeading";
import { shopAddress, usdcAddress } from "../lib/addresses";
import calculatePrice from "../lib/calculatePrice";
import { useState } from "react"
import BigNumber from "bignumber.js";

export default function Checkout() {
  const [value, setValue] = useState('1');
  const [start, setStart] = useState(false);
  const [count, setCount] = useState(0);

  const router = useRouter()
  const qrRef = useRef<HTMLDivElement>(null) // ref to a div where we'll show the QR code
  let amount = useMemo(() => calculatePrice(router.query), [router.query])
  const reference = useMemo(() => Keypair.generate().publicKey, []) // Unique address that we can listen for payments to
  

  // Read the URL query (which includes our chosen products)
  const searchParams = new URLSearchParams({ reference: reference.toString() });
  for (const [key, value] of Object.entries(router.query)) {
    if (value) {
      if (Array.isArray(value)) {
        for (const v of value) {
          searchParams.append(key, v);
        }
      } else {
        searchParams.append(key, value);
      }
    }
  }
  
  const network = WalletAdapterNetwork.Devnet // WalletAdapterNetwork.Devnet TODO 
  const endpoint = clusterApiUrl(network)
  const connection = new Connection(endpoint)

  function checkPrice(){
    let new_price = new BigNumber(0);
    new_price = new_price.plus(+amount/+value) 
    return new_price
  }

  function upgradeData() {
    let new_amount = new BigNumber(0);
    new_amount = new_amount.plus(+amount/+value)

    const urlParams: TransferRequestURLFields = {
      recipient: shopAddress,
      splToken: usdcAddress,
      amount: new_amount,
      reference,
      label: "🥪 Sanwis 🥪 ",
      message: "Gracias !",
    }
    const url = encodeURL(urlParams)
    const qr = createQR(url, 412, 'transparent')
    


    
    if (qrRef.current && new_amount.isGreaterThan(0)) {
      qrRef.current.innerHTML = ''
      qr.append(qrRef.current)
      setStart(true)
    }
  }
  
  // useEffect( () => {
  //   console.log(count)
  // }, [count])

  // Check every 0.5s if the transaction is completed
  useEffect(() => {
    if (start) {
      const interval = setInterval(async () => {
        try {
          const signatureInfo = await findReference(connection, reference, { finality: 'confirmed' })
          amount = checkPrice()

          await validateTransfer(
            connection,
            signatureInfo.signature,
            {
              recipient: shopAddress,
              amount,
              splToken: usdcAddress,
              reference,
            },
            { commitment: 'confirmed' }
          )

          if (+count < +value){
            setStart(false)
            setCount(count + 1)
            
          }else{
            router.push('/confirmed')
          }
          
        } catch (e) {
          if (e instanceof FindReferenceError) {
            // No transaction found yet, ignore this error
            return;
          }
          if (e instanceof ValidateTransferError) {
            // Transaction is invalid
            console.error('Transaction is invalid', e)
            return;
          }
          console.error('Unknown error', e)
        }
      }, 500)
      return () => {
        clearInterval(interval)
      }
    }
  }, [amount,start,count]) 


  return (
    <div className="flex flex-col items-center gap-8">
      <BackLink href='/'>Cancel</BackLink>

      <PageHeading>Checkout ${amount.toString()}</PageHeading>

      <div className="relative w-full lg:max-w-sm">

        <select value={value} onChange={(e) => {setValue(e.target.value)}}>
          <option value="1">No dividido</option>
          <option value="2">Dividido en 2</option>
          <option value="3">Dividido en 3</option>
          <option value="4">Dividido en 4</option>
        </select>


      </div>

      <button onClick={upgradeData}>Show QR</button> 


      {/* div added to display the QR code */}
      <div ref={qrRef} />
    </div>
  )
}