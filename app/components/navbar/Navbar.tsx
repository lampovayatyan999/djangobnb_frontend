import Link from "next/link";
import Image from "next/image";

import SearchFilters from "./SearchFilters";
import UserNav from "./UserNav";
import { getUserId } from "@/app/lib/actions";
import AddPropertyButton from "./AddPropertyButton";


const Navbar = async () => {
    const userId = await getUserId();

    console.log('user id: ', userId);


    return (
        <nav className="w-full fixed top-0 left-0 py-6 border-b bg-white z-10">
            <div className="w-full px-6 flex items-center justify-between">
                <Link href="/">
                    <Image
                        src="/airbnb.png"
                        alt="Djangobnb"
                        className="h-[40px] w-auto"
                        width={100}
                        height={40}
                    />
                </Link>

                <SearchFilters />

                <div className="flex items-center space-x-6">
                    <AddPropertyButton 
                        userId={userId}
                    />
                    <UserNav
                        userId={userId}
                    />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
