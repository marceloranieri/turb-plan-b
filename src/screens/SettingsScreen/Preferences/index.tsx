import { useState } from "react";
import Item from "../Item";
import Theme from "./Theme";
import Colors from "./Colors";
import TextSize from "./TextSize";
import Brightness from "./Brightness";
import styles from "./Preferences.module.sass";

type PreferencesProps = {};

const Preferences = ({}: PreferencesProps) => {
    const [reduceMotion, setReduceMotion] = useState(false);
    const [autoPlay, setAutoPlay] = useState(false);
    const [highQualityPhoto, setHighQualityPhoto] = useState(true);

    return (
        <div className={styles.preferences}>
            <div className={styles.group}>
                <Item
                    className={styles.item}
                    classHead={styles.headItem}
                    title="Appearance"
                    icon="appearance"
                    rightContent={<Theme />}
                />
                <Item
                    title="Accent color"
                    icon="color"
                    rightContent={<Colors />}
                />
                <Item
                    title="Text size"
                    icon="text"
                    rightContent={<TextSize />}
                />
                <Item
                    title="Brightness"
                    icon="sun"
                    rightContent={<Brightness />}
                />
            </div>
            <div className={styles.group}>
                <Item
                    title="Reduce motion"
                    icon="loading"
                    switchToggle
                    switchChecked={reduceMotion}
                    setSwitchChecked={() => setReduceMotion(!reduceMotion)}
                />
                <Item
                    title="Auto play"
                    icon="play"
                    switchToggle
                    switchChecked={autoPlay}
                    setSwitchChecked={() => setAutoPlay(!autoPlay)}
                />
                <Item
                    title="High quality photo"
                    icon="image"
                    switchToggle
                    switchChecked={highQualityPhoto}
                    setSwitchChecked={() =>
                        setHighQualityPhoto(!highQualityPhoto)
                    }
                />
            </div>
        </div>
    );
};

export default Preferences;
