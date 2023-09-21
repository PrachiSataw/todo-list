"use client";
import { useRouter } from 'next/navigation';
import React from 'react'
import Link from 'next/link';

const page = () => {
  return (
    <>
    <div className='container'>
      <div className="app-wrraper">
            <div className='loading-page'>
              <h1 className='appname'>To-Do-List App</h1>
              <button className='startbutton'><Link href="/Home">GET STARTED</Link></button>
            </div> 
      </div>
    </div>

    </>
  )
}

export default page