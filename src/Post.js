import React,{useState,useEffect} from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import { db } from "./firebase";

import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

function Post({postId,user, username, caption, imgURL }) {
  const [comments,SetComments]=useState([]);
  const [comment,SetComment]=useState('');

  useEffect(()=>{
    let unsubscribe;
    if(postId){
      unsubscribe=db
  
    .collection("posts")
    .doc(postId)
    .collection("comments")
    .orderBy('timestamp','desc')
    .onSnapshot((snapshot)=>{
      SetComments(snapshot.docs.map((doc)=>doc.data()));
       });
    }

    return ()=>{
      unsubscribe();
    };

    

  },[postId]);


  const postComment=(event)=>{
       event.preventDefault();
       db.collection("posts").doc(postId).collection("comments").add({
          text:comment,
         username:user.displayName,
         timestamp:firebase.firestore.FieldValue.serverTimestamp()
       })

       

  }

  return (
    <div className="post">
      <div className="post_header">
        <Avatar
          className="post_avatar"
          alt="vivek"
          src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAPEhIQEBAWFhAWFRUYEBgVFxUVFRUVFRIXFhYVFRUYHSkgGhomHRUVITEhJSkrLi4uFx8zODMsNygtLjcBCgoKDg0OGhAQGi0lICUtLS0tLS0tLS0rLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOkA2AMBIgACEQEDEQH/xAAcAAEAAgIDAQAAAAAAAAAAAAAAAQcCBgMEBQj/xABFEAACAQICBQgIAwYEBgMAAAABAgADEQQGBRIhMUEHEyJRYXGBkRQjQlJicqGxMoLBM0NjktHSFlOz4RVzk6Ky0yREVP/EABoBAQADAQEBAAAAAAAAAAAAAAACBAUDAQb/xAA1EQACAQIDBAkEAQMFAAAAAAAAAQIDBBEhMQUSQVETYXGBkaGx0fAiMsHhFBWy8SNCQ1Ki/9oADAMBAAIRAxEAPwC8YiIAiIgCIiAIiIAiIgCJF5MAREi8AmIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIkQCYkGa5mPN+GwPRJ16vCmm8drHco74JwpzqS3YLFmx3mv6XzfgsLcPVDOPZp2du7Zu8ZV+ns34vGXBc06XuUyVBHxNvb7TraJy1i8XbmqJ1T7TdBPM7/C8kkbFLZMIx37ieC5fv2xNq0jyoVDsw+HCjg1Rrn+Rf6zX8VnjSNX98V+RQv9ZtGjeTACxxFfWPFaYsO7WIufpNiweRtH0//rhz11CX+h2SWKR3/lbNoZQhvPsx/uyKhrafxjfixNX+dx9iJw/8YxH/AOh/+o/90vujofCpsTDUl7qaD9Jz+h0v8tP5RG+uXzwJ/wBdoLJUfT2KCo6fxi/hxNX+dj9zPUweedIUt9bW+YK0uKtofCv+PDUm76aH7ieRi8j6PqbfRwh66ZKfQbJ7vp6ol/WbKplUo+UX87jVNHcqT7q+HDDi1M6p/lbYfMTb9EZwwOJsqVgrn2alkP12Hwmr6T5LwbnD1yOpag2d2sBf7zTNL5XxmEvztFtQe2t3TzG7xAnuEJaElZ7LvMqMtyXL9S17mX5eTKJ0DnHFYOwVzUpe5ULMo+U718NnZLQy5nHDY3oA6la21H3n5Tub7yEqbiZd7se4tfqa3o81+Vw9Os2aJAMSBlExEQBERAEREAREQBESIBM46jhQSTYDeTuEO4UEk2A3k7gBKkzznE4onD4drUBsZh+9P9n37pKMXLQtWlpO5nux73y+cFxPSzhn4trUMG1l3PVG89lPs+Ly65puh9EYjG1CtJCzXu5P4Vvxdjx+s9TKGUamOYOxKYcHpN7TW3qn6nh3y3tG6PpYamKVFAqDcBx7SeJkpYLJGtXuaNjHoqKxlxfvzfVoa3l7IWGw1nreurdbDoKfhT9TebcigCwFhwmcTmYdWtOrLem8WREmIOYiIgCRJiARMXUEWIuOMziAabmPIWGxV3peprdagajH4l/UW8ZV2l9CYnA1AtVWBv0GF9VrcVYcezfPoKdPSWj6WJQ0qyBkO8H7jqM6RqNGzYbarW7UZ/VDk9V2N+jK7ydn8rq0MYbruSrxHZU6x8Xn1yzKVQMAQbgi4I2gjslMZxydUwJNSndsOTsYfiW/sv8A1nayLnFsKRQrknDk2W+1qZ/s7OElKCaxiXr3ZlK5p/yrPvivPBcH1eHXcUTipVAwDAggi4I4g7pyzifMCIiAIiIAiIgCQZM1rPGn/QsOSv7Z+jSHUTvY9gG3ynqTbwR0pU5VZqEdXkaryk5quWwVBuiNmIYcT/lD6X8uueFknK7Y6oXcEYdD0zu1j7in7nhPJ0Hoyrjq60kJ1ma7E7dVda7Oe39TL20XgKeGpJRpCyKLDrPWT2yzUwprdWp9FeVY7OoKhR+96v8APa+HJHJhqC01VEUKigBQBYADYABOeJMqnzIiIgCIkGATE6mK0hRo/taqJ8zAfeef/ivAXt6VT/mnuBJQm9Ez24nTwmkaNb9lVR/lYH6CdyeEXitREiTAIiTEA4MRQWorI6hkYEMCLggixBEprPGVWwNTnKYJw7m6Hfqt7jH7GXZOnpLAU8TSejVF0YWP9R2yUJbrL+ztoTs6u8vteq+ceJXPJtmoqy4Ou3QOzDseB2er7uryloifPuntFVMDiGpMTdWuhGzWXWurDt2eYluZG0/6bhwX/b0+jVHXs2OOwj63k6keKNHbVnDBXdH7Za9r49/qbPEiTOR8+IiIAiIgEXlG55016ZimIN6dO6UeohWOs3ib+AEtLO2k/RcHVdTZ2GonzOCLj6mVJlPRfpeKpUfZvd/kTafPYPGXLaCSc3wN/Y1OMIzuZ6LT8+xZPJtoL0bD8862rVrMetafsL+p75ucwRAAANw3TOVZScpNsxa9aVapKpLVsRESJyEROHEV1pqzubIoJYncABckwDraU0nSwtNqtZwqDzJ4ADieyVdmLP8AiK91w5NGl2ftCO1/Z8POeTm7ML4+sWuRRW4pL1D3iPeP03TwpYjSwWLPqbHZMaUVOqsZcuC93zM3dmOsxJY7yxLE95O0xeRE9cTWawMkdlIKkhhuIJBHcRtE27L2fcThyFrk1qXb+0A7GO/x85p8Tm0Vq1vTqrdmsT6D0VpOliqYq0XDIfMHiGHA9k7sozKeYXwNYOCTSawqrwI94fEJduHrLUVXQgowBUjcQRcETm1gfK3tpK2nhqno/nE54iJ4UxIMmIBp3KPoH0rDmrTW9al0h1slumvltHaJXWSNNehYpWJ9U9kqdWqzABvA7e4mXmy3FjuO+UPm/RfomLq0gOhe9P5HuR5G48J0g8cj6TYtaNalO0qaNZdnHwyaL6BkzXMi6T9KwdJmN3T1b96C1/EWM2Oc8D56rTlTnKEtU8BERBAREgwCsOV7HXehhxuCtUfvPRX6a85+SPR1hXxJG02pp3CztbxI8prHKDiudx9XqXVQflH9SZZfJ9hubwFDZtcFz+c3+1pfqrctormb1w+h2dCC/wB3+WbLEiTKBgiIiAQZo3KppQ0qC0FO2s3S+RdpHibCbzKi5Wq18XTTgtFSPzs39s60Y700aWyaSqXcU9Fi/DM0m8mREuuJ9q0TJkSZzcSDiJMxk3kHHEg4mUtbks0oalB8Ox20m6PyPcgeBvKnm68lFYjFunBqLX/KyW+5nKccjM2nSU7aWPDMtwSYicT5EREQBK45XdHXWhiQNqk037muy38QfOWPNcz7hedwNccVXXH5Df7Xko6luwq9Fcwl1+TyZqHJFjrVK+HJ2Mq1F71Oq30KeUtKUfkDE81j6PxMynuYH9QJeET1Le2qe7c73NJ/j8CIiRMkSDJkGAfPmZK2tisQ/wDFqfRiP0l7aFpamHoJ7tGmPJAJQmmv21f/AJlT/UafQWE/Anyj7TSv1hCC+aI29qvClTj80RzxETNMQREQCJUnK3QIxVN+DUgPFGb+4S2zNH5U9GGrh1rqNtFrt8jXBPhsM7W8sKiNHZVZUrqLfHLxKkiTImk0fbqQkyIkHE9wxEymMSDiQaMpuvJPSLYt34LSa/5mS3/iZpUtfkr0WaeHbEMNtY9D5F2A9xNzK9XKJl7VqKnay68vngb3ERKp8aIiIAnS0tS16FZD7VKoPNCJ3Zw4kdFvlP2nqPYvBplBaAq6uJw7fxaf1cD9Z9BT540Z+2o/8yn/AKiz6HE9kbe285QfU/UmIiRMMSDJiAfPmYqWricQv8R/q5P6y9dDVNfD0H96lTPmgMp3P2H5rH1viKuPzAf0Ms3IOK53AYfbtVdQ/kJH2tNO8+qjCXzQ2tofVb05r5kbHEiTMwxRERAInFiKC1FZHAKsCGB3EEWInNEAorN+XHwFawBNFttJttre4T7w+u+eBPofSejqWJptSrIGQ7wfuDwMqzMXJ7iKBL4f11LgNzqOorubvFpo0biMklJ5n1Oz9rRnFQrPCXPg/wB+ppcTKtSZCUcMGG8MCp8jIseqWXE3YsiJlSRnYKgLMdwUFifATcsu8nuIrkPiPU0uI2F2HUF3L3nynKbjHNnOvdUaMd6pLD18DyMo5efH1gtiKK2NVuoe6D7xl4YaitNVRAAqgBQNwAFgBODRejaWGpilRQKg8z2k8T2zvTOqT32fG7Qv5XdTHSK0QiInMzxERAE6elKmpRrP7tNz5ITO5Nez3ieawOIN9rLqD851fsTCOlKLlUjFcWincv0tbEUF/iU/o4M+gpSGRMNzuOoD3SXPcoP9ZeElI1NtNdLGK4L1EREiY4iIgFW8rmB1alHEAbGU02Pap1l+hbynb5JNIXWvhidqkOo7G2NbxH1mx580X6Vg6igXdPWJ13TaQO8XEqrJ+lPRMXSqE9AtqVPkewPkdU+E1KX+tauPFf5RtUF09k4cY6eqL4kzBTfaN0zmWYoiIgCIkXgCJ5WmMwYXBi9eqFJ3Lvc9yjbNH0pynttGFw4HU1U3P8in9Z2p0KlT7UWaNpWrfZHLnoiw8VgKNYWq0kcdTqrfcTof4V0fv9Cof9NftaVViM9aQqb8Rq9iIF+4J+s6f+K9Ib/S6nn/ALSwrOquOBo09lXKWU0u9l34XR9GiLUqSIPgVV+wnalI4XPOkaf7/WHU4Vv0B+s2HRfKe2wYmgLcWpEqf5GP6znK0qrrOVXZFzHNYS7Hn54FnCTPI0NmHC4weoqgtxU7HHep2z1hKzTTwZmSjKD3ZLBkxETwiIiQYBMrvlb0hZKNAHazF2HYuwX8T9JYRNpRec9K+l4upUB6AOpT6tRNn1JY+M6Uo4s1dj27q3Clwjn38PM2PkkwOtVrVyNiIqL8znWb6KvnLTmtZB0Z6Ng6YI6dT1j97AW+lpssjN4yK1/WVW4lJaaLuEREiUxERAMWEorOWhvQsVUQD1bXel1arHavgbjutL2M1bPugPTcOSg9dSu1P4tnSTxH1Alqzr9FUzeT1L1hcdDVz0eT/DOPk6056VhhTc+uo2Vutl9h/LYe0GbbeUDl3S9TA11qrewNqq+8ntKe0bx2iXpo/GpXprVptrIwBU989vKHRzxWjPdoW3RVMVoztReJBlQoEOwG0nZxlcZu5QCC1HBHdsarv28RTHHvnTz/AJvNVmw2Ha1JTaqy/vCPYB90Hf1900OalrZrDfqeBt2Oz1gqlVdi9/Yzq1Wdi7sS7G7MxJJPaTOOTE08DaWRERJkHEmpERESDidFIypVGRg6MVYbVYGxB6wRLEyjygElaOMO+wWr/wCwcPmErmJxq0Y1Fmc7i2pXMd2ou/ivnI+kEcEAg3B3WmUqfk/zeaBGGxD+pYgU2b92TuUn3T9JbAmRVpOnLBnyF3aztqm5LufNEyDJnVx2LShTarUYKiglieAE5lZJvJGucoWnfRcMUQ+uq3VOtVt0n8B9SJWmTtDHG4lKdvVqQ1b5FP4fE7PEzgzLpl8diGqG9ibU136qBuiLdZ3ntlqZAy/6Hh9Zx6+rZqnwi3RTwH1JlxroodbPp2ls2yw/5JfP/K8zaQJlIkymfMCIiAIiIAkGTIgFVcpGV+bZsZRHq2PrlHsN747Dsv1Hvnn5EzUcE/NVSTh3O3+G3vDsPEePXLgrUlcFWAKkEMDtBBFiCOIlP53yg2DY1aIvhie80j7rfD1HwPCadtWjVh0NTu+ehs2lxCvDoK3c/nFFwUaquAykFSLqRtBB3EGalyjZg9Fo8zTa1aqCARvVNzN38B/tNMyZnJ8FajWu2Hvs4tSv7o4r2eU8fNGljjMTVreyTq078EX8I+58Z5RsXGt9X2rzPKOzpRr/AF5xWePM8m8ykSJrG4zKJEmeAREiAIiTPMCSZESZEg4k1IWlvcnGYTiqJoVGvWpAbTvansCt2kbj4dcqGeplnSpweJpVvYBs9uKNsYfY+Ala4o9JDDjwK99bq4otcVmu39+xfNWqqAsxAUAkk7AAN5JlP58zYcY/M0T/APHQ7/8AMb3j8I4ecnOmc3xl6NG64e+2+xqnzDgvZ59UwyRlF8awq1QVwy7zuLn3V7OsynSoqlHpKnz9mfZWkLWP8i41Wi5fv09PQ5OMrc64xdZfVqfVA+2wt0j8I4dvdLXE4qFFaahEACqAFA2AACwAHCc0q1KjnLFmRd3c7mo6ku5cl88REROZVEREAREQBERAE4a1FXBVgCpFiCLgjqM5ogFT5wyE1LWr4RS1Le1PeyfJ7y9m/vmibZ9JWmp5myRh8bd09VX99RcMfjXj375p29/h9NTx9zYtdp7uEavj78+0pmRPa03ljF4Mnnad099Lsnid48Z401IyjJYxeKNqE4zjvReKIkxE9JCTMZMASYieASIkweoSBt3T2dCZZxeMI5qmQvF36Kd4PHwlm5ZyTh8Jao/ra49pgNVT8C8O87ZVr3NOllq+XvyKtxf0qGTeL5L88jU8n5Datq18WpSlvVDsdx8XFV7N/dLTw9FUUKihVAsABYADgBOW0mY9WtKq8ZHztzdVLiW9PuXBCIicisIiIAiIgCIiAIiIAiIgCRJiAYOgIsRccbzWdLZFwOIuRT5pzxpdEX6yn4T5TaYkoTlB4xeBOFScHjF4FUaQ5MsSm2hVSoOp7o3mLia7i8p4+l+PC1LdaWcf9hJl8xLkdoVVrgy/DaleKwlg/nUfOtXAVl/FRcd9Nx+k4uYqe4fJv6T6OMx1B1CdVtJ/9fM7ra74w8/0fPFPAV22LRc9yOfsJ6OEypj6v4MLUt1v6sf95EvgSZF7SnwivP8ARGW158Ir54FT6O5MsQ9jXqpTHUt3bz2CbdonImBw9mNPnXHGr0hfrCfh+k2qJWqXVWeTfhkU6t7XqZOWXJZGCIALAWHC0ykxK5UEREAREQBERAEREAREQBERAERIJtAJidbC4tKhcL7DlGvs6QAJt2dISMVjqVK/OOFsjub+4ltdvC4gHaica1AdoPC47phiMSlNWd2ARVLMepVFyYBzxMAwO49s4UxaGo1IHpKqseqzlgLHr6JgHZiYlo1x1iAZRIBnVfH0lqLRNQCqyllT2iq72twHaYB24njrmPCFS4qEgEDYlQsbqWBVAusylVZtYAiyk3sJyf8AHMPdhrnVVNdn1KnNBSocE1tXUvqkG177RsgHqRPOpaWoOqsr7GfmwCrh+c9w0yNYG23aNg27tsYfTFBzUVagvTuXuGUWVirFWYAMAQQStwDsgHoxPPp6Ww7CgRVBGIF8Pv8AWDmzUuNm7VBO2c2Ex1KsagpuGNN9Spb2X1VbVPbZl84B2oiIAiIgCIiAIiIAiIgCeRmHR7YmjzaqjNrArzjEKCNzGytrW36pFj2b568xgGp4zKzuajqaQqO1Us1iNYNSphFaw3a9MG223C848TlapW5xqi0NeqmLVjtbm+fCahQlLtqlT7v4rjqm4wIBp9TK9RmdtWkpamVXVqVAKRNE0+bVAgDJck3Nt/4Sds5MblfX51KdOilN8M1LaNY6xSy9DU6ChrtcHb1X2za5IgGnYrK9aprgGlS1rkOhYug5gU/R1Gqt6V+le43/AIQds7NLQFUVqdcLRp6moOZQsaRsamsfwDpDXDKdXYRbjebRAgGs6T0HWrvWa1IGrSChyWL0WCMClPojWRidpup377i3UOU3dizrRUFX1Ka6xSkXqUDamdUbCKT3NhtfdNwMCAeTo7RIp0jSY2UV3qUxTZkCqaxqImy2wXAK7t43RpHDV2r0XppS1E1tdmdg/SUrsQUyGAvfawvcjZvnrxANWOh8WRWJFAmtqrUTXqhCBTZTUWpq6yE3XoAEWW19t5hiMtVn6IdFsiazhnJrvTSmENWjYKoDU1NwSSBbZNsgwDT8Xl3E1HasXRatRmJ1alQLQZko0xUpkKOcYLRFwwUHW4C988PlarzjF6oRbklqZ1nrE1zVHOLUQrTUX2qt9Y7bi1ptsQDVKOVqyigfTamugUMQKPRVaNRPVXpbNr32/e09PQOiWwvOg1S6MyFNYICAtJEJbVUXYlfoOJM9iBAJiIgCIiAIiIB//9k="
        ></Avatar>

        <h3>{username}</h3>
      </div>

      <div>
        <img
          className="post_img"
          src={imgURL}
        ></img>
      </div>
      <h4 className="post_text">

        <strong>{username}</strong> {caption}
      </h4>
      <div className="post_comments">
     {
       comments.map((comment)=>(
        <p>
        <strong>{comment.username}</strong>  {comment.text}
      </p>
       )
        
       )
     }
      </div>
      {user &&(
          <form className="post_commentBox">
          <input className="post_input"
          type="text"
          placeholder="Add a comment"
          value={comment}
          onChange={(e)=>SetComment(e.target.value)}
          >
          </input>
          <button
          className="post_button"
          disabled={!comment}
          type="submit"
          onClick={postComment}
          >Post
  
          </button>
        </form>
      )}
     
      
    </div>
  );
}

export default Post;
