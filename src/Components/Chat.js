import { InfoOutlined, StarBorderOutlined } from '@material-ui/icons'
import React, { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { selectRoomID } from '../features/appSlice';
import ChatInput from './ChatInput';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore'
import { db } from '../firebase';
import Message from './Message';

function Chat() {

    const chatRef = useRef(null);
    const roomId = useSelector(selectRoomID);
    const [roomDetails] = useDocument(
        roomId &&
        db.collection('room').doc(roomId))

    const [roomMessage, loading] = useCollection(
        roomId &&
        db
            .collection('room')
            .doc(roomId)
            .collection('messages')
            .orderBy("timestamp", 'asc')
    )

    // console.log(roomDetails?.data().name);
    // console.log(roomMessage);

    useEffect(() => {
        chatRef?.current?.scrollIntoView({
            behavior: 'smooth',
        });
    }, [chatRef, loading])


    return (
        <ChatContainer>
           {roomDetails && roomMessage && (
                <>
                <Header>
                    <HeaderLeft>
                        <h4>
                            <strong>#{roomDetails?.data().name}</strong>
                        </h4>
                        <StarBorderOutlined />
                    </HeaderLeft>
                    <HeaderRight>
                        <p>
                            <InfoOutlined /> Details
                    </p>
                    </HeaderRight>
                </Header>
                <ChatMessage>
                    {roomMessage?.docs.map((doc) => {
                        const { message, timestamp, user, userImage } = doc.data();
                        console.log(doc.data());
                        return (
                            <Message
                                key={doc.id}
                                message={message}
                                timestamp={timestamp}
                                user={user}
                                userImage={userImage}
                            />
                        )
                    })}
                    <ChatBottom ref={chatRef} />
                </ChatMessage>


                <ChatInput chatRef={chatRef} channelName={roomDetails?.data().name} channelId={roomId} />


            </>
           )}
        </ChatContainer>
    )
}

export default Chat


const ChatContainer = styled.div`
flex:0.7;
flex-grow:1;
overflow-y:scroll;
margin-top:60px;
`;

const Header = styled.div`
display:flex;
justify-content:space-between;
padding:20px;
border-bottom:1px solid lightgray
`;


const HeaderLeft = styled.div`
display:flex;
align-items:center;
>h4{
    display:flex;
    text-transform:lowercase;
    margin-right:10px
}
>h4>.MuiSvgIcon-root{
margin-left:10px;
font-size:10px
}
`;

const HeaderRight = styled.div`
>p{
    display:flex;
    align-items:center;
    font-size:14px;
    }
    >p>.MuiSvgIcon-root{
margin-right:5px !important;
font-size:16px
}
`;

const ChatMessage = styled.div``;
const ChatBottom = styled.div`
padding-bottom:200px;
`;