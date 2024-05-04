// widgets/userMenu.tsx
import React, { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { data: session } = useSession();

    return (
        <div className="user-menu">
			<button onClick={() => setIsOpen(!isOpen)} className="user-button">
				{session && session.user && session.user.image && (
					<Image src={session.user.image} alt={session.user.name ?? 'User'} width={30} height={30} className="user-image" />
				)}
				{session && session.user && session.user.name}▼
			</button>
            {isOpen && (
                <div className="menu">
                    <ul>
                        <li onClick={() => signOut()}>Log Out</li>
                        <li>
						  <Link href="/settings">Settings</Link>
						</li>
                        <li>Profile</li>
                        {/* Add more options here as needed */}
                    </ul>
                </div>
            )}
			<style jsx>{`
			    .user-menu {
			        position: relative;
			        display: inline-block;
			    }
			    .user-button {
			        background-color: #C71585;  // Vibrant Pink
			        color: white;
			        border: none;
			        padding: 10px 20px;
			        font-size: 1rem;
			        cursor: pointer;
			        border-radius: 5px;
			        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
			        outline: none;
			    }
			    .menu {
			        position: absolute;
			        right: 0;
			        background-color: #ffffff;
			        min-width: 160px;
			        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
			        border-radius: 5px;
			        overflow: hidden;
			        top: 100%;
			        margin-top: 5px;
			    }
			    .menu ul {
			        list-style: none;
			        padding: 0;
			        margin: 0;
			    }
			    .menu ul li {
			        padding: 12px 16px;
			        cursor: pointer;
			        color: #333;
			        text-align: left;
			    }
			    .menu ul li:hover {
			        background-color: #f1f1f1;
			    }
			`}</style>
        </div>
    );
};

export default UserMenu;
