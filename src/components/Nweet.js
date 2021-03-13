import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this nweet?");
        if (ok) { // delete nweet
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
            await storageService.refFromURL(nweetObj.attachmentUrl).delete();
        }
    };
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`nweets/${nweetObj.id}`).update({
            text: newNweet,
        });
        setEditing(false);
    };
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewNweet(value);
    };
    const onClickImg = async (event) => {
        var img = document.getElementsByTagName("img");
        for (var x = 0; x < img.length; x++) {
            img.item(x).onclick = function () {
                window.open(this.src);
            }
        }
    }
    return (
        <div className="nweet">
            {editing ? (
                <>
                    {isOwner && (
                        <>
                            <form onSubmit={onSubmit} className="container nweetEdit">
                                <input
                                    type="text"
                                    placeholder="Edit your nweet"
                                    value={newNweet}
                                    onChange={onChange}
                                    autoFocus
                                    required
                                    className="formInput" />
                                <input type="submit" value="Update Nweet" className="formBtn" />
                            </form>
                            <button onClick={toggleEditing} className="formBtn cancelBtn">Cancel</button>
                        </>
                    )}
                </>
            ) : (
                <>
                    <view class="content_top">
                        <view class="creator_name">{nweetObj.creatorName}</view>
                        <view class="create_date">{new Intl.DateTimeFormat('ko', { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(nweetObj.createdAt)}</view>
                    </view>
                    <h4>{nweetObj.text}</h4>
                    {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} onClick={onClickImg} />}
                    {isOwner && ( // 내가 작성한 글일 때만 보여짐
                        <div class="nweet__actions">
                            <span onClick={onDeleteClick}>
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                            <span onClick={toggleEditing}>
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </span>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Nweet;