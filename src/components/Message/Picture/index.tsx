import { useState } from "react";
import cn from "classnames";
import Icon from "@/components/Icon";
import Image from "@/components/Image";
import Modal from "@/components/Modal";
import styles from "./Picture.module.sass";

type PictureProps = {
    image: string;
};

const Picture = ({ image }: PictureProps) => {
    const [visibleModal, setVisibleModal] = useState(false);
    return (
        <>
            <div className={styles.picture}>
                <Image src={image} width={1200} height={800} alt="" />
                <div className={styles.buttons}>
                    <button className={cn("button-circle", styles.button)}>
                        <Icon name="download" />
                    </button>
                    <button
                        className={cn("button-circle", styles.button)}
                        onClick={() => setVisibleModal(true)}
                    >
                        <Icon name="resize" />
                    </button>
                </div>
            </div>
            <Modal
                containerClassName={styles.containerModal}
                innerClassName={styles.innerModal}
                visible={visibleModal}
                onClose={() => setVisibleModal(false)}
                hideCloseButton
            >
                <div className={styles.image}>
                    <Image src={image} width={1200} height={800} alt="" />
                    <div className={styles.buttons}>
                        <button className={cn("button-circle", styles.button)}>
                            <Icon name="download" />
                        </button>
                        <button
                            className={cn("button-circle", styles.button)}
                            onClick={() => setVisibleModal(false)}
                        >
                            <Icon name="minimize" />
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Picture;
