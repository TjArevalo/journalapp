"use client"

import { useState, useEffect } from "react";
import PocketBase from 'pocketbase';

export default function EditEntry(id:string) {
  const pb = new PocketBase('http://127.0.0.1:8090');
  const d = new Date()
  const [entry, setEntry] = useState()
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');
  const [day, setDay] = useState(0);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [hour,setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);


  const journalFetch = async() => {
    const records = await pb.collection('entries').getOne('RECORD_ID')
    .then((res)=>{
      // @ts-ignore --> Get back to it
        setEntries(res)
      }).catch((err) => {
        return `Error! ${err}`
      })
  }
  
  useEffect(() => {
    journalFetch();
  },[])

  
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


  return (
    <div className="flex flex-col items-center">
      <div className="w-3/5 px-6">
        <form action="/" method="post" className="flex flex-col items-center h-screen">
          <label htmlFor="title" className="text-xl text-white text-left my-4 w-full">           
            <p className="text-white text-lg" >{date}</p>
          </label>
          <input type="text" id="title" name="title" placeholder="Title" className="w-full rounded-lg mb-4 p-4" onChange = {(e) => setNewTitle(e.target.value)} />

          <label htmlFor="body"/>
          <textarea id="body" name="body" placeholder="What's on your mind?" className="w-full rounded-lg mb-6 p-4 h-3/6" onChange = {(e) => setNewBody(e.target.value)}/>

          <button type="submit" className="self-end bg-zinc-800 p-3 text-white rounded-lg">Save</button>
        </form>
      </div>
    </div>
  )
}
