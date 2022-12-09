"use client"
import { useState, useEffect } from 'react';
import PocketBase from 'pocketbase';
import { TiDelete } from "react-icons/ti"
import Link from 'next/link';

interface Entry extends Object {
  "id":string,
  "collectionId":string,
  "collectionName":string,
  "created":Date,
  "updated":Date,
  "title":string,
  "body":string,
  "journalDate_created":string,
  "entryOwner":"00fnjkgjlt7fskx"
};

export default function HomePage() {
  const pb = new PocketBase('http://127.0.0.1:8090');
  const [entries, setEntries] = useState<Entry[]>();

  const journalFetch = async() => {
    const records = await pb.collection('entries').getFullList(200 , {
      sort: '-created',
      '$autoCancel': false
      }).then((res)=>{
      // @ts-ignore
        setEntries(res)
        console.log(entries?.length)
      }).catch((err) => {
        return `Error! ${err}`
      })
  }
  
  useEffect(() => {
    journalFetch();
  },[])

  
  const deleteEntry = async (e:React.MouseEvent ,id:string) => {
    await pb.collection('entries').delete(id).then((res)=> {
      journalFetch();
      return `Deleted ${res}`;
    })
    .catch((err)=>{
      return err
    })
  }

  console.log(entries)
  return (
    <div className="text-4xl">
      <h1 className="text-white text-center py-4"> Welcome back, James</h1>
      <div className="flex flex-col bg-red-500 items-center width-9/12 h-full overflow-auto grow">


        {entries?.length == 0?
          <div className="w-1/5 h-12 px-4 py-2 flex justify-center rounded-lg bg-blue-500 opacity-75 text-white text-center">
            <Link href='/newentry' className="text-lg">
                + New Entry
            </Link>
          </div>
          :
          entries?.map((entry) => {
            return (
              <div className="flex justify-between h-12 bg-zinc-100 bg-opacity-40 w-2/5 my-3 p-2 rounded-lg text-center" key={entry.id}>
                <Link href={`/entry/${entry.id}`} id={entry.id} className="text-base text-white truncate w-11/12">
                  {entry.title}
                </Link>
                <div className="w-1/12 flex cursor-pointer justify-center" onClick={(e) => deleteEntry(e, entry.id)}>
                  <TiDelete size={24}/>
                </div>
              </div>
            )
          })
        }

      </div>
    </div> 
  )
}
