"use client";
import { Flex, AlertDialog, Button, TextField } from "@radix-ui/themes";
import { useContext, useEffect, useState } from "react";
import DataContext from "../context/DataContext"
import Swal from 'sweetalert2'


export const AddParticipantBtn = ()=> {

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

    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const { participants ,addParicipant ,removeParticipant } = useContext(DataContext)
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")

    const addAction = (el)=>{
        if(email.match(validRegex)){
            addParicipant(el)
            Toast.fire({
                icon: "success",
                title: "Participant Added with success"
              });
        }else{
            // alert('error email')
            Toast.fire({
                icon: "error",
                title: "Email format error!"
              });
            return false;
        }
    }


  return (
    <>
    {/* <button onClick={()=>alert('first')}
        className="relative inline-flex items-center justify-center px-3.5 py-2.5 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-indigo-500 rounded-lg shadow-md group">
        <span
        className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-indigo-500 group-hover:translate-x-0 ease">
            <svg width="24px" height="24px" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path stroke="#000000" stroke-linecap="round" stroke-width="12" d="M96 65v44m22-22H74"></path><path stroke="#000000" stroke-linejoin="round" stroke-width="12" d="M96 151.5c35.898 0 65-28.99 65-64.75C161 50.99 131.898 22 96 22c-35.898 0-65 28.99-65 64.75 0 42.55 39 74 65 83.25v-18.5Z"></path></g></svg>
        </span>
        <span
        className="absolute flex items-center text-base font-semibold justify-center w-full h-full text-indigo-500 transition-all duration-300 transform group-hover:translate-x-full ease">Button
        Text</span>
        <span className="relative text-base font-semibold invisible">Add Participant</span>
    </button> */}

    <AlertDialog.Root>
        <AlertDialog.Trigger>
            <Button color="blue">Add New Participant</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth="300px">
            <AlertDialog.Title>New Participant</AlertDialog.Title>
            <AlertDialog.Description size="2">
            <Flex direction="column" gap="3" maxWidth="250px">
                <TextField.Root onChange={(e)=>setName(e.target.value)} variant="surface" placeholder="Fullname" />
                <TextField.Root onChange={(e)=>setEmail(e.target.value)} variant="classic" placeholder="Email" />
            </Flex>
            </AlertDialog.Description>

            <Flex gap="3" mt="4" justify="start">
                <AlertDialog.Cancel>
                    <Button variant="soft" color="red">
                        Cancel
                    </Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action>
                    <Button onClick={()=>addAction({name,email,status: "yes"})} variant="solid" color="blue">
                        Add Participant
                    </Button>
                </AlertDialog.Action>
            </Flex>
        </AlertDialog.Content>
    </AlertDialog.Root>


    </>
  )
}

export default AddParticipantBtn