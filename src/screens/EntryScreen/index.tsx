"use client";

import { useState } from "react";
import Image from "@/components/Image";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ResetPassword from "./ResetPassword";
import styles from "./EntryScreen.module.sass";

const avatars = [
    "/images/avatar-1.png",
    "/images/avatar-2.png",
    "/images/avatar-3.png",
    "/images/avatar-4.png",
    "/images/avatar-5.png",
    "/images/avatar-6.png",
];

const EntryScreen = () => {
    const [entry, setEntry] = useState(true);
    const [resetPassword, setResetPassword] = useState(false);

    return (
        <div className={styles.login}>
            <div className={styles.background}>
                <div className={styles.stars}>
                    <Image
                        src="/images/stars.svg"
                        width={1132}
                        height={396}
                        alt=""
                    />
                </div>
                <Image src="/images/bg-entry.png" fill alt="" />
            </div>
            <div className={styles.inner}>
                <div className={styles.body}>
                    <div className={styles.bodyInner}>
                        <div className={styles.lines}>
                            <div className={styles.line}>
                                <Image
                                    src="/images/entry-lines-left.svg"
                                    width={401}
                                    height={256}
                                    alt=""
                                />
                            </div>
                            <div className={styles.line}>
                                <Image
                                    src="/images/entry-lines-right.svg"
                                    width={401}
                                    height={256}
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className={styles.logo}>
                            <Image
                                src="/images/star.svg"
                                width={24}
                                height={24}
                                alt=""
                            />
                        </div>
                        <div className={styles.title}>
                            {entry ? "Sign in to Bento" : "Bento Social"}
                        </div>
                        {resetPassword ? (
                            <ResetPassword
                                onClick={() => setResetPassword(false)}
                            />
                        ) : entry ? (
                            <SignIn
                                onClick={() => setEntry(false)}
                                onResetPassword={() => setResetPassword(true)}
                            />
                        ) : (
                            <SignUp onClick={() => setEntry(true)} />
                        )}
                    </div>
                </div>
                <div className={styles.foot}>
                    <div className={styles.text}>
                        Join over <span>2M</span> global social media users
                    </div>
                    <div className={styles.avatars}>
                        {avatars.map((avatar, index) => (
                            <div key={index} className={styles.avatar}>
                                <Image
                                    src={avatar}
                                    width={40}
                                    height={40}
                                    alt=""
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EntryScreen;
