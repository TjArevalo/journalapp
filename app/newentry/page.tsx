"use client"

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PocketBase from 'pocketbase';

export default function newentry() {

  const d = new Date()
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [day, setDay] = useState(0);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [hour,setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  
  const fullDateUTC = new Date(Date.UTC(year, month, day, hour, minute, second));
  const date = `${month + 1}/${day}/${year}`

  useEffect(()=>{
    setInterval(()=>{
      setSecond(d.getUTCSeconds());
      setMinute(d.getUTCMinutes());
      setHour(d.getHours());
      setDay(d.getUTCDate() - 1);
      setMonth(d.getUTCMonth());
      setYear(d.getUTCFullYear());
    }, 1000)
  })


  const sendReq = () => {
    const pb = new PocketBase('http://127.0.0.1:8090');
    const id = uuidv4;
    const data = {
      "id": id,
      "title": title,
      "body": body,
      "journalDate_created": fullDateUTC,
      "journalDate_updated": "",
      "entryOwner": "00fnjkgjlt7fskx"
    };
  
    const record = pb.collection('entries').create(data);

    setTitle('');
    setBody('');
    return data;
    
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-3/5 px-6">
        <form action="/" method="post" className="flex flex-col items-center h-screen" spellCheck="true" onSubmit={sendReq}>
          <label htmlFor="title" className="text-xl text-white text-left my-4 w-full">           
            <p className="text-white text-lg" >{date}</p>
          </label>
          <input type="text" id="title" name="title" placeholder="Title" className="w-full rounded-lg mb-4 p-4" onChange = {(e) => setTitle(e.target.value)} />

          <label htmlFor="body"/>
          <textarea id="body" name="body" placeholder="What's on your mind?" className="w-full rounded-lg mb-6 p-4 h-3/6" onChange = {(e) => setBody(e.target.value)}/>

          <button type="submit" className="self-end bg-zinc-800 p-3 text-white rounded-lg">Save</button>
        </form>
      </div>
    </div>
  )
}
