import { Button } from '@material-ui/core';
import React,{useState} from 'react'
import {storage,db} from "./firebase";
import './imageUpload.css';


import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

  

function ImageUplaod({username}) {
    const [caption,SetCaption]=useState('');
    const [image,SetImage]=useState(null);
    const [progress,SetProgress]=useState(0);
    // const [url,SetUrl]=useState('');

    const handleChange=(e)=>{
        if(e.target.files[0]){
            SetImage(e.target.files[0]);
        }
    };

    const handleUpload=()=>{
        const uplaodTask=storage.ref(`images/${image.name}`).put(image);
        uplaodTask.on(
            "state_changed",
            (snapshot)=>{
                //progress function visual bar
                const progress =Math.round(
                    (snapshot.bytesTransferred/snapshot.totalBytes)*100
                );
                SetProgress(progress);

            },
            (error)=>{
                //error fun
                console.log(error);
                alert(error.message);

            },
            ()=>{
                //complete fun
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url=>{
                    //post img into db
                    db.collection("posts").add({
                        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                        caption:caption,
                        imgURL:url,
                        username:username
                    });
                    SetProgress(0);
                    SetCaption("");
                    SetImage(null);

                })
            }


        )

    }


    return (
    
        <div  className="img_Upload">
             
            
               <progress className="imgUpload_progress" value={progress} max="100"></progress>
               <input type="text" placeholder="Enter a Caption..." onChange={event=>SetCaption(event.target.value)}  value={caption} />
               <input type="file" onChange={handleChange}  />
               <Button onClick={handleUpload}>Uplaod</Button>

            
        </div>
    )
}

export default ImageUplaod;
