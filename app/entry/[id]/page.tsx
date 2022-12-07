"use client"

import { useState, useEffect } from "react";
import PocketBase from 'pocketbase';

interface ID extends Object {
  params: {'id': string},
  searchParams: object
}

interface Entry extends Object {
  'id': string,
  "collectionId": string,
  "collectionName": string,
  "created": Date,
  "updated": Date,
  "title": string | undefined,
  "body": string | undefined,
  "journalDate_created": Date,
  "journalDate_updated": Date,
  "entryOwner": string
}

export default function IDEntry(id:ID) {
  const pb = new PocketBase('http://127.0.0.1:8090');
  const d = new Date()
  const [entry, setEntry] = useState<Entry>()
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');
  const [day, setDay] = useState(0);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [hour,setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const entryId:string = id.params.id

  const journalFetch = async() => {
    const records = await pb.collection('entries').getOne(`${entryId}`)
    .then((res)=>{
        console.log(res);
        // @ts-ignore
        setEntry(res);
      }).catch((err) => {
        return `Error! ${err}`;
      })
  }
  
  useEffect(() => {
    journalFetch();
  },[])

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

  const date = `${month + 1}/${day}/${year}`


  return (
    <div className="flex flex-col items-center">
      <div className="w-3/5 px-6">
        <form action="/" method="put" className="flex flex-col items-center h-screen">

          <label htmlFor="title" className="text-xl text-white text-left my-4 w-full">           
            <p className="text-white text-lg" >{date}</p>
          </label>
          <input type="text" id="title" name="title" placeholder={entry?.title? entry.title : "Title" } className="w-full rounded-lg mb-4 p-4" onChange = {(e) => setNewTitle(e.target.value)} />

          <label htmlFor="body"/>

          <textarea id="body" name="body" placeholder="What's on your mind?" className="w-full rounded-lg mb-6 p-4 h-3/6" onChange = {(e) => setNewBody(e.target.value)}>
            {entry?.body}
          </textarea>
          
          <button type="submit" className="self-end bg-zinc-800 p-3 text-white rounded-lg">Save</button>
        </form>
      </div>
    </div>
  )
}
