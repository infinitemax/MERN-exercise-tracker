import React, { useEffect, useState } from "react";
import format from "date-fns/format";
import Image from "next/image";
import ConfirmModal from "./ConfirmModal";

const ActivityCard = (props) => {
    const [showNotes, setShowNotes] = useState(false);

    // capitalise activity type
    let title =
        props.activity.split("")[0].toUpperCase() + props.activity.slice(1);

    // get date and format using date-fns
    const date = new Date(props.date);
    const formattedDate = format(date, "dd/MM/yyyy");

    // HANDLE CONFIRM DELETE
    const [clickCount, setClickCount] = useState(0);
// handle the delete button being clicked:
    // - works by incrementing a click counter
    // - at 0 we see the X
    // - at 1 we see the confirm delete modal
    // - pressing yes increments the counter again and the delete occurs, pressing no resets the counter and modal

    const handleDeleteClick = () => {
        setClickCount(clickCount + 1);
    };

    const deleteModalHanadler = (buttonChoice) => {
        console.log(buttonChoice)
        if (buttonChoice) {
          setClickCount(clickCount + 1)
        } else {
          setClickCount(0)
        }
    }

    useEffect(() => {
        if (clickCount > 1) {
            props.deleteEntryHandler();
            props.handleActivityUpdate();
            return;
        }
    }, [clickCount]);

    return (
        <div>
            <div className="my-2 mx-auto px-4 py-2 rounded-md bg-gradient-to-b from-white to-[#f2fff9] shadow-md text-black max-w-[600px] relative">
                <div className="flex flex-wrap ">
                    <h2>{title}</h2>
                    <p className="mx-2"> | </p>
                    <p className="font-light">Duration: {props.duration}</p>
                    <p className="mx-2"> | </p>
                    <p className="font-light">Intensity: {props.intensity}</p>
                    <p className="absolute font-light right-7">
                        {formattedDate}
                    </p>
                    {clickCount === 0 ? <button
                        className="absolute right-2 top-2"
                        onClick={() => {
                            handleDeleteClick();
                            ;
                        }}
                    >
                        <Image
                            src="/close-icon.png"
                            width={15}
                            height={15}
                            alt="logo"
                        />
                    </button> : <ConfirmModal 
                      deleteModalHanadler={(buttonClicked) => {deleteModalHanadler(buttonClicked)}}
                    />}
                </div>
                <div>
                    <button onClick={() => setShowNotes(!showNotes)}>
                        ...
                    </button>
                </div>
                {showNotes && <p>{props.notes}</p>}
            </div>
        </div>
    );
};

export default ActivityCard;
