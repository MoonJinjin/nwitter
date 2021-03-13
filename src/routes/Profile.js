import { authService, dbService, storageService } from "fbase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuid4 } from 'uuid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import stateImg from '../img/stateImg.png'

export default ({ refreshUser, userObj, nweetObj }) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const [creatorImg, setCreatorImg] = useState(userObj.profileImg);
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };
    const onChange = (event) => {
        const { target: { value } } = event;
        setNewDisplayName(value);
    };
    const getMyNweets = async () => {
        const nweets = await dbService.collection("nweets").where("creatorId", "==", userObj.uid).orderBy("createdAt").get();
        console.log(nweets.docs.map((doc) => doc.data()));
    };
    const onChangeImg = (event) => {
        const { target: { files }, } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const { currentTarget: { result }, } = finishedEvent;
            setCreatorImg(result);
        };
        reader.readAsDataURL(theFile);
    }
    useEffect(() => {
        getMyNweets();
    }, []);
    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) { // 이름이 바꼈을 때만
            await userObj.updateProfile({
                displayName: newDisplayName,
            });
        }
        let creatorImgUrl = "./img/stateImg.png";
        if (creatorImg !== "") {
            const creatorImgRef = storageService.ref().child(`${userObj.uid}/${uuid4()}`);
            const response = await creatorImgRef.putString(creatorImg, "data_url");
            creatorImgUrl = await response.ref.getDownloadURL();
            window.confirm("프로필 사진이 변경되었습니다.");
            await dbService.doc(`nweets/${nweetObj.id}`).update({
                creatorImgUrl: creatorImgUrl
            });
            refreshUser();
        }
        setCreatorImg("");
    };
    const onClearCreatorImg = () => {
        setCreatorImg("");
    }
    return (
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input
                    id="attach-file"
                    type="file"
                    accept="image/*"
                    onChange={onChangeImg}
                    style={{ opacity: 0 }}
                />
                {creatorImg ? (
                    <div>
                        <img className="profileImg"
                            src={creatorImg}
                            style={{ backgroundImage: creatorImg }}
                        />
                        <div className="factoryForm__clear" onClick={onClearCreatorImg} style={{ marginBottom: 10 }}>
                            <span>Remove</span>
                            <FontAwesomeIcon icon={faTimes} />
                        </div>
                    </div>
                ) : (
                    <img className="profileImg" src={stateImg} />
                )}
                <label for="attach-file" className="factoryInput__label" style={{ marginBottom: 10 }}>
                    <span>Edit Profile</span>
                </label>
                <input
                    onChange={onChange}
                    type="text"
                    autoFocus
                    placeholder="Display name"
                    value={newDisplayName}
                    className="formInput"
                />
                <input
                    type="submit"
                    value="Update Profile"
                    className="formBtn"
                    style={{ marginTop: 10 }}
                />
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
                Log Out
            </span>
        </div>
    );
};