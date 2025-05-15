"use client";

import { useState, useId } from "react";
import { Tooltip } from "react-tooltip";
import Layout from "@/components/Layout";
import Icon from "@/components/Icon";
import Switch from "@/components/Switch";
import Background from "./Background";
import styles from "./ProfileEditScreen.module.sass";

const ProfileEditScreen = () => {
    const [name, setName] = useState("Kohaku Tora");
    const [username, setUsername] = useState("@kohakutora");
    const [bio, setBio] = useState(
        "🎨 UI/UX Designer | 💡 Crafting seamless digital experiences\n🚀 Designing user-centric interfaces\n📍 NYC | Post on #Design #UX #UI"
    );
    const [link, setLink] = useState("https://linktr.ee/tranmautritam");
    const [privateProfile, setPrivateProfile] = useState(false);
    const [location, setLocation] = useState("🌍 Earth");
    const idTooltip = useId();

    return (
        <Layout rightSidebar rightSidebarActiveTrending hideNavigation>
            <div className={styles.main}>
                <Background />
                <div className={styles.body}>
                    <div className={styles.form}>
                        <div className={styles.title}>edit profile</div>
                        <div className={styles.field}>
                            <div className={styles.label}>
                                <Icon name="avatar" /> Name
                            </div>
                            <div className={styles.wrap}>
                                <input
                                    className={styles.input}
                                    type="text"
                                    placeholder="Display name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={styles.field}>
                            <div className={styles.label}>
                                <Icon name="at" /> Usename
                            </div>
                            <div className={styles.wrap}>
                                <input
                                    className={styles.input}
                                    type="text"
                                    placeholder="Display username"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className={styles.field}>
                            <div className={styles.label}>
                                <Icon name="pencil" /> Bio
                            </div>
                            <div className={styles.wrap}>
                                <textarea
                                    className={styles.textarea}
                                    placeholder="Bio"
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                ></textarea>
                            </div>
                        </div>
                        <div className={styles.field}>
                            <div className={styles.label}>
                                <Icon name="link" /> Link
                            </div>
                            <div className={styles.wrap}>
                                <input
                                    className={styles.input}
                                    type="text"
                                    placeholder="Display link"
                                    value={link}
                                    onChange={(e) => setLink(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={styles.line}>
                            <div className={styles.label}>
                                <Icon name="shield" /> Private profile
                            </div>
                            <div className={styles.box}>
                                <Switch
                                    className={styles.switch}
                                    checked={privateProfile}
                                    onChange={() =>
                                        setPrivateProfile(!privateProfile)
                                    }
                                />
                                <div
                                    className={styles.tooltip}
                                    data-tooltip-id={idTooltip}
                                    data-tooltip-content="Tooltip Private profile"
                                    data-tooltip-place="top-end"
                                >
                                    <Icon name="info" />
                                </div>
                                <Tooltip id={idTooltip} />
                            </div>
                        </div>
                        <div className={styles.field}>
                            <div className={styles.label}>
                                <Icon name="earth" /> Location
                            </div>
                            <div className={styles.wrap}>
                                <input
                                    className={styles.input}
                                    type="text"
                                    placeholder="Display location"
                                    value={location}
                                    onChange={(e) =>
                                        setLocation(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProfileEditScreen;
