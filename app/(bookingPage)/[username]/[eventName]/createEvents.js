'use server'

import { redirect } from "next/navigation";
import { nylas } from '@/app/lib/nylas';
import prisma from "@/app/lib/db";

export const createEvents = async(userName,eventTypeId,startDateTime,endDateTime,participantsData)=>{
    
    const getUserData = await prisma.user.findUnique({
        where: {
          username: userName,
        },
        select: {
          grantEmail: true,
          grantId: true,
        },
      });
  
      if (!getUserData) {
        throw new Error("User not found");
      }
  
      const eventTypeData = await prisma.eventType.findUnique({
        where: {
          id: eventTypeId,
        },
        select: {
          title: true,
          description: true,
        },
      });

      if (!eventTypeData) {
        throw new Error("Event type not found");
      }

      try {

        await nylas.events.create({
          identifier: getUserData?.grantId,
          requestBody: {
            title: eventTypeData?.title,
            description: eventTypeData?.description,
            when: {
              startTime: Math.floor(startDateTime.getTime() / 1000),
              endTime: Math.floor(endDateTime.getTime() / 1000),
            },
            conferencing: {
              autocreate: {},
              provider: "Google Meet",
            },
            // participants: [
            //   {
            //     name: formData.get("name") as string,
            //     email: formData.get("email") as string,
            //     status: "yes",
            //   },
            // ],
            participants : participantsData
            // [
            //   {
            //     name: "soufyen",
            //     email: "souaksoufyen@gmail.com",
            //     status: "yes",
            //   },
            //   {
            //     name: "soufyen",
            //     email: "soufy3n@outlook.com",
            //     status: "yes",
            //   },
            // ],
          },
          queryParams: {
            calendarId: getUserData?.grantEmail,
            notifyParticipants: true,
          },
        })

      } catch (error) {
        console.log("Error:",error);
      }

      return redirect("/success");

}