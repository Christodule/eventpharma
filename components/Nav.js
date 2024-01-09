import React, { useState } from "react";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdCancel } from "react-icons/md";
import { BsGithub, BsTwitter } from "react-icons/bs";

const Nav = () => {
	const [hamburger, setHamburger] = useState(false);
	return (
		<div className='h-[10vh] flex items-center justify-between px-[20px] sticky top-0'>
			<Link href='/'>
				<h1
					className='text-xl font-bold text-gray-300
            '
				>
					Cepharm event
				</h1>
			</Link>
			<div className='md:flex items-center justify-between hidden space-x-8'>
				<Link href='/login' className=' text-gray-400 hover:text-white'>
					Se connecter
				</Link>
				<Link href='/register' className='text-gray-400 hover:text-white'>
					Creer un compte
				</Link>
				<a href='https://github.com/Christodule/eventpharma' target='_blank'>
					<BsGithub className='text-gray-400 text-2xl hover:text-[#C07F00]' />
				</a>
			</div>
			<div className='md:hidden block'>
				<GiHamburgerMenu
					className='cursor-pointer text-2xl text-gray-400'
					onClick={() => setHamburger(true)}
				/>
			</div>
			{hamburger && (
				<nav className='fixed top-0 right-0 w-1/2 dim h-[100vh] p-6'>
					<div className='w-full flex items-center justify-end mb-8'>
						<MdCancel
							className='text-4xl text-[#C07F00] cursor-pointer hover:text-white'
							onClick={() => setHamburger(false)}
						/>
					</div>
					<div className='flex w-full flex-col space-y-8'>
						<Link href='/login' className='text-white hover:text-[#C07F00]'>
							Se connecter
						</Link>
						<Link href='/register' className='text-white hover:text-[#C07F00]'>
							Creer un compte
						</Link>
						<div className='flex items-center space-x-6'>
							<a href='https://github.com/dha-stix' target='_blank'>
								<BsGithub className='text-white text-2xl hover:text-[#C07F00]' />
							</a>
							<a href='https://twitter.com/dayvid_JS' target='_blank'>
								<BsTwitter className='text-white text-2xl hover:text-[#C07F00]' />
							</a>
						</div>
					</div>
				</nav>
			)}
		</div>
	);
};

export default Nav;
