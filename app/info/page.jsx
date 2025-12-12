'use client';

import Link from 'next/link';
import { animate, createTimeline, } from 'animejs';
import { useEffect, useState } from 'react';


export default function InfoPage() {


  return (
    <main className="min-h-screen bg-yellow-50 text-slate-100 px-6 py-10">
      <div id='all' className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 id='heading' className="text-7xl font-bold tracking-tight text-red-700 py-2 opacity-1">What is lolo?</h1>
            <p class="text-lg text-red-500 mt-8 ml-4 max-w-3xl opacity-1">lolo is a web-based disaster simulation platform that allows users to create accounts and report/post disaster information in real time using our map feature. We discovered that many people are unable to receive disaster updates quickly and often need to search through multiple websites. lolo help users detect incidents faster and respond more efficiently by centralizing updates all in one place.
</p>
            <h2 id='heading' className="text-7xl font-bold tracking-tight text-red-700 py-2 opacity-1 mt-8">How did we come up with lolo?</h2>
            <p class="text-lg text-red-500 mt-8 ml-4 max-w-3xl opacity-1">With the guiding question, “If you made a website that could save the world, what would it look like?”. Inspired by the advanced systems on disaster in kaiju movies. With many natural disasters and man-made conflicts around the world, it is hard to keep track of all of them on the tip of our finger tips. Thus, we decided to focus on disasters, as they create sudden challenges that can seriously affect people’s safety and everyday lives. 

Hence, we created this platform called “Lolo” that allows people to share and post the information as fast as possible. In our admin site, we also create the hidden Kajiu feature (which is also our first prototype) that can be accessed by clicking the logo seven times and entering a keyword to repel the Kaiju. This small feature adds a fictional element to our project.
One of the main challenges we faced was ensuring the reliability of user-posted information. Our initial plan was to implement an AI agent that is able to detect the fake disaster reports and automatically restrict that suspicious user by setting their account to pending status. Pending users would still be able to fill the information of the website but no post.Due to time constraints, we are only able to implement manually in our user management system in the admin account.
Another challenge will be very hard to integrate the live map feature into code, so with the help of AI, we were able to identify the issues. Not only that, learning to pick up anime.js and using it to design the animations to make the user interface easy and smooth.
</p>
          </div>
        </div>
      </div>
    </main>


  );
}
