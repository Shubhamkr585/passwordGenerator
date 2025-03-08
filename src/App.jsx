import { useCallback, useState,useEffect,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
const [length,setLength]=useState(8)
const [password,setPassword]=useState('')
const [numberAllowed,setNumberAllowed]=useState(false);
const[special,setSpecial]=useState(false);
const passwordRef=useRef(null);

const generatePassword=useCallback(()=>{
  let result='';
  let characters='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  const numbers='0123456789'
  const specialChars='!@#$%^&*()%*+-=?^_[]'
  if(numberAllowed) characters+=numbers;
  if(special) characters+=specialChars;
  for( let i=1;i<=length;i++){
    let ch=Math.floor(Math.random()*(characters.length))
    result+=characters[ch];
  }
  setPassword(result);

},[length,numberAllowed,special,setPassword]);

const copyPasswordToClipBoard=useCallback(()=>{
  passwordRef.current?.select();
 window.navigator.clipboard.writeText(password);
},[password])
useEffect(()=>{generatePassword()},[length,numberAllowed,special,generatePassword])
  return (
    <>
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">
      <h1 className="text-white text-center pb-2">Password Generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-2">
      <input
       type="text" 
       value={password}
       className='outline-none w-full py-1 px-3 '
       placeholder='password'
       readOnly
       ref={passwordRef}
       />
       <button 
       onClick={copyPasswordToClipBoard}
       className='text-white outline-none bg-blue-700 px-3 py-0.9 shrink-0'>COPY</button>
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className="flex items-center gap-x-1">
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e)=>{setLength(e.target.value)}}
        />
        <label >length: {length}</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input 
        type="checkbox"
        defaultChecked={numberAllowed}
        id='numberInput'
        onChange={(e)=>setNumberAllowed(e.target.checked)
          
        }
        />
        <label >Numbers</label>
      </div>
      <div className='flex items-center gap-1'>
        <input 
        type="checkbox"
        defaultChecked={special}
        
        onChange={(e)=>setSpecial(e.target.checked)
        }
        />
        <label >Special Characters</label>
      </div>

    </div>
    </div>
    </>
  )
}

export default App
