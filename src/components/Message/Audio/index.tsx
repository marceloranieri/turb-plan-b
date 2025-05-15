import { useState } from "react";
import cn from "classnames";
import Image from "@/components/Image";
import Icon from "@/components/Icon";
import styles from "./Audio.module.sass";

type AudioProps = {
    audio: string;
};

const Audio = ({ audio }: AudioProps) => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className={styles.audio}>
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
                className={cn("button-circle", styles.play)}
                onClick={() => setIsPlaying(!isPlaying)}
            >
                <Icon name={isPlaying ? "pause" : "play"} />
            </button>
        </div>
    );
};

export default Audio;
