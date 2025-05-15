import { useState, ChangeEvent } from "react";
import { useMediaQuery } from "usehooks-ts";
import TextareaAutosize from "react-textarea-autosize";
import cn from "classnames";
import Icon from "@/components/Icon";
import Image from "@/components/Image";
import AddMedia from "@/components/AddMedia";
import styles from "./NewMessage.module.sass";

type NewMessageProps = {
    className?: string;
    content: string;
    setContent: (content: string) => void;
};

const NewMessage = ({ className, content, setContent }: NewMessageProps) => {
    const [recording, setRecording] = useState(false);
    const mobile = useMediaQuery("(max-width: 767px)");

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    };

    return (
        <div className={cn(styles.newMessage, className)}>
            <div className={cn(styles.form, { [styles.recording]: recording })}>
                {recording ? (
                    <>
                        <button
                            className={cn("button-circle", styles.button)}
                            onClick={() => setRecording(false)}
                        >
                            <Icon name="close" />
                        </button>
                        <div className={styles.waveform}>
                            <div className={styles.image}>
                                <Image
                                    src="/images/audio-waveform.svg"
                                    width={452}
                                    height={24}
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className={styles.time}>0:30</div>
                        <button
                            className={cn("button-circle", styles.button)}
                            onClick={() => setRecording(false)}
                        >
                            <Icon name="arrow-right" />
                        </button>
                    </>
                ) : (
                    <>
                        <div className={styles.load}>
                            <input type="file" />
                            <Icon name="upload" />
                        </div>
                        <div className={styles.field}>
                            <TextareaAutosize
                                className={styles.input}
                                placeholder="Start a new message..."
                                maxRows={8}
                                value={content}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                                autoFocus={!mobile}
                            />
                        </div>
                        {content === "" ? (
                            <button
                                className={styles.button}
                                onClick={() => setRecording(true)}
                            >
                                <Icon name="audio-wave" />
                            </button>
                        ) : (
                            <div className={styles.controls}>
                                <AddMedia
                                    className={styles.addMedia}
                                    headClassName={styles.headAddMedia}
                                    bodyClassName={styles.bodyAddMedia}
                                    emoji
                                />
                                <button
                                    className={cn("button-circle", styles.send)}
                                    onClick={() => setContent("")}
                                >
                                    <Icon name="arrow-right" />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default NewMessage;
