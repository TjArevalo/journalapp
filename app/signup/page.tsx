"use client"
import { useState } from 'react';
import PocketBase from 'pocketbase';

export default function Signup() {
  let [email, setEmail] = useState('');
  let [userName, setUserName] = useState('');
  let [name, setName] = useState('')
  let [password, setPassword] = useState('')
  let [confirmPass, setConfirmPass] = useState('')


  const createUser = () => {
    if(password === confirmPass && password !== '' && confirmPass !== ''){
      const pb = new PocketBase('http://127.0.0.1:8090');
      const user = {
        "username": userName,
        "email": email,
        "emailVisibility": true,
        "password": password,
        "passwordConfirm": confirmPass,
        "name": name,
      };
      const record = pb.collection('users').create(user)
      .then((res) => {
        return `Complete: ${res}`
      })
      .catch((err) => {
        return err
      });
    }
    else{
      console.log("Error in password");
      return null;
    }
  }

  return (
    <div id="Signup" className="flex justify-center text-white w-screen">
      <div className="flex flex-col items-center w-3/5 py-6">
        <form action="/" method="post" className="flex flex-col items-center w-3/6 space-y-2 overflow-scroll" spellCheck="true" onSubmit={createUser}>
          <p className="text-white text-xl w-full mb-4" >Sign up</p>

          <label htmlFor="email" />           
          <input required type="text" id="email" name="email" placeholder="Email" className="w-full rounded-lg mb-4 p-4" onChange = {(e) => setEmail(e.target.value)} />

          <label htmlFor="userName"/>
          <input required type="text" id="userName" name="name" placeholder="Username" className="w-full rounded-lg mb-4 p-4" onChange = {(e) => setUserName(e.target.value)} />

          <label htmlFor="name"/>
          <input required type="text" id="name" name="name" placeholder="What's your name?" className="w-full rounded-lg mb-4 p-4" onChange = {(e) => setName(e.target.value)} />

          <label htmlFor="password"/>
          <input required id="password" name="password" placeholder="Password" className="w-full rounded-lg p-4" onChange = {(e) => setPassword(e.target.value)} />

          <label htmlFor="confirmPass"/>
          <input required id="confirmPass" name="confirmPass" placeholder=" Confirm Password" className="w-full rounded-lg p-4" onChange = {(e) => setConfirmPass(e.target.value)} />

          <button type="submit" className="self-end bg-blue-400 p-3 text-white rounded-lg">Sign up!</button>
        </form>
      </div>
    </div>
  )
}
