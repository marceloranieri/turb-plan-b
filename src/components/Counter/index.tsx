import Link from "next/link";
import Image from "@/components/Image";
import styles from "./Counter.module.sass";

type CounterProps = {
    images: Array<string>;
    value: string;
    href: string;
};

const Counter = ({ images, value, href }: CounterProps) => (
    <Link href={href} className={styles.list}>
        <div className={styles.images}>
            {images.map((image, index) => (
                <div key={index} className={styles.image}>
                    <Image src={image} width={32} height={32} alt="" />
                </div>
            ))}
        </div>
        <div className={styles.counter}>{value}</div>
    </Link>
);

export default Counter;
