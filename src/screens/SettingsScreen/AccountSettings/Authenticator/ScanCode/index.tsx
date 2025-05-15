import Image from "@/components/Image";
import styles from "./ScanCode.module.sass";

type ScanCodeProps = {};

const ScanCode = ({}: ScanCodeProps) => (
    <>
        <div className={styles.title}>Scan code</div>
        <div className={styles.text}>
            Generate a verification code with an authenticator app, then enter a
            name to remember it by.
        </div>
        <div className={styles.qr}>
            <Image src="/images/qr.png" width={120} height={120} alt="" />
        </div>
    </>
);

export default ScanCode;
