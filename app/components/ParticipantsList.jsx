"use client"
import React, { useContext } from 'react'
import DataContext from "../context/DataContext"
import {DataList,IconButton,Flex,Code,Badge, Button} from "@radix-ui/themes"
import {
	CopyIcon,
    TrashIcon
} from "@radix-ui/react-icons";
import Swal from 'sweetalert2';

export const ParticipantsList = ()=> {

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

    const { participants,removeParticipant } = useContext(DataContext)

    const removeAction = (e,p)=> {

        e.preventDefault()

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            background:"#212121"
          }).then((result) => {
            if (result.isConfirmed) {
                removeParticipant(p)
                Swal.fire({
                    title: "Deleted!",
                    text: "Participant has been deleted.",
                    icon: "success"
                });
            }
          });
        
    }

  return (
    <DataList.Root>
        <Badge color="green">Participants Total: {participants?.length || 0}</Badge>
        {
        participants &&
        participants?.map((el,index)=>{
            return (
        <>
        <DataList.Item key={index} style={{ paddingTop:5}}>
            <DataList.Label minWidth="88px">Email</DataList.Label>
            <DataList.Value>
                <Flex align="center" gap="1">
                <Code variant="ghost" className='emailAddr'>{el.email}</Code>
                <IconButton
                    size="1"
                    aria-label="Copy value"
                    color="gray"
                    variant="ghost"
                >
                    <CopyIcon />
                </IconButton>
                </Flex>
            </DataList.Value>
            </DataList.Item>

            <DataList.Item style={{ borderBottomWidth:1,borderBottomColor:"rgba(255,255,255,.1)",paddingBottom:10}}>
                <DataList.Label minWidth="88px">Fullname</DataList.Label>
                <DataList.Value>{el.name}</DataList.Value>
        </DataList.Item>
        <Button onClick={(e)=>removeAction(e,el)} color='red'>
            <TrashIcon /> Remove
        </Button>
        </>
            )
        })
        }
    </DataList.Root>
  )
}

export default ParticipantsList