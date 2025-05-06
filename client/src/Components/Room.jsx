import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useAuth } from "../context/AuthContext";

const Room = () => {
    const { id: roomId } = useParams();
    const roomContainer = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser } = useAuth();
    const [callControls, setCallControls] = useState(null);
    const [callActive, setCallActive] = useState(true);
    const [zpInstance, setZpInstance] = useState(null);

    useEffect(() => {
        const initializeVideoCall = async () => {
            try {
                const appID = 16145533;
                const serverSecret = "6ad07367fab9da1ab79202c2abaf1e4d";
                
                const userName = currentUser?.displayName || "User";
                const userID = currentUser?.uid || Date.now().toString();

                if (!roomContainer.current) {
                    console.error("Room container not found");
                    return;
                }

                const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                    appID,
                    serverSecret,
                    roomId,
                    userID,
                    userName
                );

                const zp = ZegoUIKitPrebuilt.create(kitToken);
                setZpInstance(zp);

                const controls = zp.joinRoom({
                    container: roomContainer.current,
                    scenario: {
                        mode: location.state?.fromMatch 
                            ? ZegoUIKitPrebuilt.GroupCall 
                            : ZegoUIKitPrebuilt.OneONoneCall,
                    },
                    showPreJoinView: false,
                    showScreenSharingButton: true,
                    sharedLinks: [
                        {
                            name: "Copy Link",
                            url: `${window.location.origin}/room/${roomId}`,
                        },
                    ],
                    onLeaveRoom: () => {
                        // This triggers when the call ends via Zego's UI or programmatically
                        handleCallEnded();
                    },
                });

                setCallControls(controls);
                setCallActive(true);

            } catch (error) {
                console.error("Failed to initialize video call:", error);
                handleCallEnded();
            }
        };

        const handleCallEnded = () => {
            setCallActive(false);
            stopAllMediaTracks();
            navigate(location.state?.redirectTo || '/home'); // Default to /home
        };

        const stopAllMediaTracks = () => {
            if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
                navigator.mediaDevices.enumerateDevices()
                    .then(devices => {
                        devices.forEach(device => {
                            if (device.kind === 'videoinput' || device.kind === 'audioinput') {
                                navigator.mediaDevices.getUserMedia({ [device.kind]: true })
                                    .then(stream => {
                                        stream.getTracks().forEach(track => track.stop());
                                    })
                                    .catch(err => console.log("Error stopping media:", err));
                            }
                        });
                    });
            }
        };

        initializeVideoCall();

        return () => {
            if (zpInstance) {
                try {
                    zpInstance.destroy();
                    stopAllMediaTracks();
                } catch (cleanupError) {
                    console.error("Cleanup error:", cleanupError);
                }
            }
        };
    }, [roomId, currentUser, location.state]);

    const handleLeaveCall = () => {
        if (callControls) {
            callControls.hangUp();
        }
    };

    if (!callActive) {
        // Don't render anything when call is not active
        // The navigation will handle the redirect
        return null;
    }

    return (
        <div className="relative w-full h-screen">
            {callActive && (
                <button
                    onClick={handleLeaveCall}
                    className="absolute top-4 left-4 z-50 bg-gray-800/70 hover:bg-gray-800/90 text-white px-4 py-2 rounded-lg backdrop-blur-sm border border-gray-700 transition-all"
                >
                    ← Leave Call
                </button>
            )}
            <div 
                ref={roomContainer} 
                style={{ width: "100%", height: "100%" }}
                key={roomId}
            />
        </div>
    );
};

export default Room;