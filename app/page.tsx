"use client"
import { useState, useEffect } from 'react';
import PocketBase, { ListResult } from 'pocketbase';
import { TiDelete } from "react-icons/ti"

type Entry = {
  "id":string,
  "collectionId":string,
  "collectionName":string,
  "created":Date,
  "updated":Date,
  "title":string,
  "body":string,
  "journalDate_created":string,
  "journalDate_updated":string,
  "entryOwner":"00fnjkgjlt7fskx"
}

export default function HomePage() {
  const pb = new PocketBase('http://127.0.0.1:8090');
  const [entries, setEntries] = useState<Record<string, Entry>[]>();

  const journalFetch = async() => {

    const records = await pb.collection('entries').getFullList(200 , {
      sort: '-created',
      '$autoCancel': false
      })

    const res = records

    setEntries(records)
  }
  

  useEffect(() => {
    journalFetch();
  },[])

  
  //DELETE Call
  const deleteEntry = async (e:React.MouseEvent ,id:string) => {
    await pb.collection('entries').delete(id);
  }
  console.log(entries);

  return (
    <div className="text-4xl">
      <h1 className="text-white text-center py-4"> Welcome back, James</h1>
      <div className="grid width-9/12 text-center justify-items-center">
        
        {entries?.map((entry) => {
          return (
            <div className="flex align-middle bg-zinc-100 bg-opacity-40 w-2/5 my-3 p-2 rounded-lg" key={entry.id}>
              <h2 className="text-base text-white truncate w-11/12">
                {entry.title}
              </h2>
              <div className="w-1/12" onClick={(e) => deleteEntry(e, entry.id)}>
                <TiDelete size={24} className="m-0"/>
              </div>
            </div>
          )
        })}

      </div>
    </div>
  )
}
