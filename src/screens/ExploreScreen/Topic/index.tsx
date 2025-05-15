import Link from "next/link";
import Image from "@/components/Image";
import styles from "./Topic.module.sass";

type TopicProps = {
    item: {
        id: string;
        title: string;
        content: string;
        avatars: string[];
        time: string;
        image: string;
        category: string;
    };
};

const Topic = ({ item }: TopicProps) => (
    <Link href={`/explore/${item.id}`} className={styles.topic}>
        <div className={styles.preview}>
            <Image
                src={item.image}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                alt=""
            />
        </div>
        <div className={styles.body}>
            <div className={styles.title}>{item.title}</div>
            <div className={styles.content}>{item.content}</div>
            <div className={styles.line}>
                <div className={styles.avatars}>
                    {item.avatars.map((avatar, index) => (
                        <div className={styles.avatar} key={index}>
                            <Image src={avatar} width={20} height={20} alt="" />
                        </div>
                    ))}
                </div>
                <div className={styles.time}>Trending {item.time}</div>
                <div className={styles.category}>
                    <div
                        className={styles.color}
                        style={{
                            backgroundColor:
                                item.category === "Lifestyle"
                                    ? "#B587FF"
                                    : item.category === "NFTs"
                                    ? "#87F8FF"
                                    : item.category === "Design"
                                    ? "#FF8787"
                                    : "#769CFF",
                        }}
                    ></div>
                    {item.category}
                </div>
            </div>
        </div>
    </Link>
);

export default Topic;
