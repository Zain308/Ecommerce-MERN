import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { backend_url, server } from "../../server";
import shop from "../../../../backend/model/shop";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";
import socketIO from "socket.io-client";
import {format} from "timeago.js"
import styles from "../../styles/styles";
const ENDPOINT = "http://localhost:4000/";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const DashboardMessages = () => {
  const { seller } = useSelector((state) => state.seller);
  const [conversations, setConversations] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [userData,setUserData] = useState(null);
  const [onlineUsers,setOnlineUsers] = useState([]);
  const [activeStatus,setActiveStatus] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const messageList = axios
      .get(`${server}/conversation/get-all-conversation-seller/${seller._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setConversations(res.data.conversations);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [seller]);

  useEffect(()=>{
    if(seller){
      const userId = seller?._id;
      socketId.emit("addUser",userId);
      socketId.on("getUser",(data)=>{
        setOnlineUsers(data);
      })
    }
  },[seller]);

  const onlineCheck = (chat) =>{
    const chatMembers = chat.members.find((member)=> member !==seller?._id);
    const online = onlineUsers.find((user)=>user.userId === chatMembers);

    return online ? true : false;
  }

  // get messages
  useEffect(()=>{
     const getMessage = async () =>{
      try {
        const response = await axios.get(`${server}/message/get-all-messages/${currentChat?._id}`);
        setMessages(response.data.messages);
      } catch (error) {
        console.log(error )
      }
      getMessage();
     }
  },[currentChat])

  // create new message

  const sendMesageHandler = (e)=>{
    e.preventDefault();

    const message = {
      sender:seller._id,
      text: newMessage,
      conversationId:currentChat._id,
    };
    const recieverId = currentChat.members.find((member)=> member.id !== seller._id);

    socketId.emit("sendMessage",{
      senderId: seller._id,
      recieverId,
      text:newMessage,
    });

    try {
      if(newMessage !== ""){
        await axios.post(`${server}/message/create-new-message`,message).then((res)=>{
          setMessages([...message,res.data.message])
          updateLastMessage();
        }).catch((error)=>{
          console.log(error)
        });
      }
    } catch (error) {
      console.log(error)
    }
  };

  const updateLastMessage = async()=>{
    socketId.emit("updateLastMessage",{
      lastMessage: newMessage,
      lastMessageId: seller._id,
    });

    await axios.put(`${server}/conversation/update-last-message/${currentChat._id}`,{
      lastMessage:newMessage,
      lastMessageId:seller._id,
    }).then((res)=>{
      console.log(res.data.conversation);
      setNewMessage("")
    }).catch((error)=>{
      console.log(error)
    })
  }
  return (
    <div className="w-[90%] bg-white m-5 h-[85vh] overflow-y-scroll rounded">
      {!open && (
        <>
          <h1 className="text-center text-[30px] py-3 font-Poppins">
            All messages
          </h1>
          {/* All messages list */}
          {conversations &&
            conversations.map((item, index) => (
              <MessageList
                data={item}
                key={index}
                index={index}
                setOpen={setOpen}
                me = {seller._id}
                setUserData = {setUserData}
                userData = {userData}
                online = {onlineCheck(item)}
                setActiveStatus={setActiveStatus}
              />
            ))}
        </>
      )}

      {open && 
        <SellerInbox 
          setOpen={setOpen} 
          newMessage = {newMessage} 
          setNewMessage = {setNewMessage}
          sendMesageHandler={sendMesageHandler}
          messages={messages}
          sellerId = {seller._id}
          userData = {userData}
          activeStatus = {activeStatus}
          />}
    </div>
  );
};

const MessageList = ({ data, index, setOpen,setCurrentChat,me,setUserData,userData,online,setActiveStatus }) => {
  const [user,setUser] = useState([]);
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`?${id}`);
    setOpen(true);
  };
  const [active, setActive] = useState(0);

  useEffect(()=>{
    setActiveStatus(online)
    const userId = data.members.find((user)=> user != me );

    const getUser = async()=>{
      try {
        const res = await axios.get(`${server}/user/user-info/${userId}`)

        setUser(res.data.user);
      } catch (error) {
        console.log(error )
      }
    }
    getUser();
  },[me,data])
  return (
    <div
      className={`w-full flex p-3 px-3 ${active === index ? "bg-[#00000010]" : "bg-transparent"} cursor-pointer`}
      onClick={(e) => setActive(index) || handleClick(data._id) || setUserData(user) || setCurrentChat(data) || setActiveStatus(online)}
    >
      <div className="relative">
        <img
          src={`${backend_url}${user?.avatar}`}
          className="w-[50px] h-[50px] rounded-full"
          alt=""
        />
        {
          online ? (
            <div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[2px] right-[2px]" />
          ):(
            <div className="w-[12px] h-[12px] bg-[#c7b9b9] rounded-full absolute top-[2px] right-[2px]" />
          )
        }
      </div>
      <div className="pl-3">
        <h1 className="pl-3 text-[18px]">{user?.name}</h1>
        <p className="text-[16px] text-[#000c]">{
          data.lastMessageId !==user._id ? "You:": user.name.split(" ")[0] + ": "
          } {data?.lastMessage}</p>
      </div>
    </div>
  );
};

const SellerInbox = ({ setOpen,newMessage,setNewMessage,sendMesageHandler,messages,userData,activeStatus }) => {
  return (
    <div className="w-full min-h-full flex flex-col justify-between">
      {/* message header */}
      <div className="w-full flex p-3 items-center justify-between bg-slate-200">
        <div className="flex">
          <img
            src={`${backend_url}${userData?.avatar}`}
            className="w-[60px] h-[60px] rounded-full"
            alt=""
          />
          <div className="pl-3">
            <h1 className="text-[18px] font-[600]">{userData?.name}</h1>
            <h1>{activeStatus? "Active now" : "offline"}</h1>
          </div>

          <AiOutlineArrowRight
            size={30}
            className="cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </div>
      </div>

      {/* messages */}

      <div className="px-3 h-[65vh] py-3 overflow-y-scroll">
      {
        messages && messages.map((item,index)=>{
            <div className={`flex w-full my-2 ${item.sender === sellerId ? 'justify-end' : 'justify-start'}`}>
              {
                item.sender !== sellerId && (
                  <img
                src="C:\Users\Abdul Rehmaan\Downloads\WhatsApp Image 2026-05-23 at 5.24.53 PM.jpeg"
                className="w-[40px] h-[40px] ronded-full mr-3"
                alt=""
              />
                )
              }
              <div className="w-max p-2 rounded bg-[#38c776] text-[#fff] h-min">
                <p>{item.text}</p>
              </div>
              <p className="text-[12px] text-[#000000d3] pt-1">{format(item.createdAt)}</p>

            </div>
        })
      }
      </div>



      {/* send message input */}
      <form
        aria-required={true}
        className="p-3 relative w-full flex justify-between items-center"
        onSubmit={sendMesageHandler}
      >
        <div className="w-[3%]">
          <TfiGallery />
        </div>
        <div className="w-[97%]">
          <input
            type="text"
            required
            placeholder="Enter your message...."
            value={newMessage}
            onChange={(e)=>setNewMessage(e.target.value)}
            className={`${styles.input}`}
          />
          <input type="submit" value="Send" className="hidden" id="send" />
          <label htmlFor="send">
            <AiOutlineSend
              size={20}
              className="absolute right-4 top-5 cursor-pointer"
            />
          </label>
        </div>
      </form>
    </div>
  );
};

export default DashboardMessages;
