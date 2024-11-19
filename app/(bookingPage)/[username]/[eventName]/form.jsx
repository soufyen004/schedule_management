'use client'
import {createEvents} from "./createEvents"
import React, { useContext, useState } from 'react'
import { SubmitButton } from "@/app/components/SubmitButton";
import { ParticipantsList } from "@/app/components/ParticipantsList";
import { createMeetingAction } from "@/app/actions";
import Link from "next/link";
import { ArrowBigLeftIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DataContext from '@/app/context/DataContext';
import { redirect } from 'next/navigation';
import Swal from 'sweetalert2';
import prisma from '@/app/lib/db';

function Form(props) {

    const {participants} = useContext(DataContext)
    const [participantsData,setParticipantsData] = useState(participants || [])

    const action = async (formData)=>{


    console.log("participants data:",participants)

    const userName = formData.get("username")
    const formTime = formData.get("fromTime");
    const meetingLength = Number(formData.get("meetingLength"));
    const eventDate = formData.get("eventDate");
    const eventTypeId = props?.eventTypeId
    const startDateTime = new Date(`${eventDate}T${formTime}:00`);

    // Calculate the end time by adding the meeting length (in minutes) to the start time
    const endDateTime = new Date(startDateTime.getTime() + meetingLength * 60000);

    console.log("eventTypeId:",eventTypeId)
    console.log("username:",userName)
    console.log("formTime:",formTime)
    console.log("meetingLength:",meetingLength)
    console.log("eventDate:",eventDate)
    console.log("startDateTime:",startDateTime)
    console.log("endDateTime:",endDateTime)

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });

    // if(!formData){
    //   Toast.fire({
    //     icon: "error",
    //     title: "Please select at least one participant"
    //   })
    //   return false;
    // }


    // const participantsData = [
    //   {
    //     name: "name1",
    //     email: "soufyen004@gmail.com",
    //     status: "yes",
    //   },
    //   {
    //     name: "name2",
    //     email: "soufy3n@outlook.com",
    //     status: "yes",
    //   }
    // ]
    createEvents(userName,eventTypeId,startDateTime,endDateTime,participantsData)
    

    }
  return (
    
    <form
      className="flex flex-col gap-y-4 w-[320px]"
      action={action}
    >
      <input type="hidden" name="eventTypeId" value={props.eventType} />
      <input type="hidden" name="username" value={props.username} />
      <input type="hidden" name="fromTime" value={props.fromTime} />
      <input type="hidden" name="eventDate" value={props.eventDate} />
      <input
        type="hidden"
        name="meetingLength"
        value={props.meetingLength}
      />
      
      <div className="flex flex-col gap-y-1">
        <Link href={"/"} className="text-red-500 pb-3 flex"><ArrowBigLeftIcon/> Events List</Link>
        <Label style={{fontSize:18}}>Participants list</Label>
      </div>


      <ParticipantsList />


      <SubmitButton text="Book Meeting" />
      
    </form>
  )
}

export default Form