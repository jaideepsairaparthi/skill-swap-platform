import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const Room = () => {
    const { id } = useParams();
    const roomContainer = useRef(null);

    useEffect(() => {
        const appID = 48723934;
        const serverSecret = "ed3d107b9ed6868a3c9ff49d116036d4";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            id,
            Date.now().toString(),
            "Jaideep Sai"
        );

        const zc = ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
            container: roomContainer.current,
            sharedLinks: [
                {
                    name: "Copy Link",
                    url: `http://localhost:5173/room/${id}`,
                },
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall,
            },
            showScreenSharingButton: true,
        });
    }, [id]);

    return <div ref={roomContainer} style={{ width: "100%", height: "100vh" }} />;
};

export default Room;
