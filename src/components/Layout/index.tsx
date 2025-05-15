import cn from "classnames";
import Sidebar from "@/components/Sidebar";
import styles from "./Layout.module.sass";
import RightSidebar from "@/components/RightSidebar";
import Navigation from "./Navigation";
import useEventsStore from "@/store/useEventsStore";

type LayoutProps = {
    classSidebar?: string;
    rowReverse?: boolean;
    rightSidebar?: boolean;
    rightSidebarActiveTrending?: boolean;
    rightSidebarOnlyFollowers?: boolean;
    rightSidebarOnlyTopics?: boolean;
    hideNavigation?: boolean;
    children: React.ReactNode;
};

const Layout = ({
    classSidebar,
    rowReverse,
    rightSidebar,
    rightSidebarActiveTrending,
    rightSidebarOnlyFollowers,
    rightSidebarOnlyTopics,
    hideNavigation,
    children,
}: LayoutProps) => {
    const { isActiveSidebar } = useEventsStore();

    return (
        <div
            className={cn(styles.layout, {
                [styles.active]: isActiveSidebar,
            })}
        >
            <Sidebar className={classSidebar} />
            {rightSidebar ? (
                <div
                    className={cn(styles.row, { [styles.reverse]: rowReverse })}
                >
                    <div className={styles.container}>{children}</div>
                    <RightSidebar
                        activeTrending={rightSidebarActiveTrending}
                        onlyFollowers={rightSidebarOnlyFollowers}
                        onlyTopics={rightSidebarOnlyTopics}
                    />
                </div>
            ) : (
                children
            )}
            <Navigation hide={hideNavigation} />
        </div>
    );
};

export default Layout;
