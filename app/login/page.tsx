"use client"
import { useState } from 'react';
import PocketBase from 'pocketbase';

export default function Login() {

  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('')

  return (
    <div id="Signup" className="flex justify-center text-white w-screen">
      <form action="/" method="post" className="flex flex-col items-center w-3/6 space-y-2 overflow-scroll" spellCheck="true">
          <p className="text-white text-xl w-full mb-4" >Log In</p>

          <label htmlFor="email" />           
          <input required type="text" id="email" name="email" placeholder="Email" className="w-full rounded-lg mb-4 p-4" onChange = {(e) => setEmail(e.target.value)} />

          <label htmlFor="password"/>
          <input required id="password" name="password" placeholder="Password" className="w-full rounded-lg p-4" onChange = {(e) => setPassword(e.target.value)} />

          <button type="submit" className="self-end bg-blue-400 p-3 text-white rounded-lg">Sign up!</button>
        </form>
    </div>
  )
}
