import React from "react";
import party from "../images/party.svg";
import Image from "next/image";
import Link from "next/link";

const NoEvent = () => {
	return (
		<div className='w-full min-h-[90vh] flex flex-col items-center justify-center p-4'>
			<Image src={party} alt='Create an event' width={300} />
			<h3 className='my-4 text-center'>Vous n'avez pas de ticket crrer une..</h3>
			<Link href='create/event'>
				<button className='bg-[#FFD95A] px-6 py-4 rounded'>
					Creer un ticket 
				</button>
			</Link>
		</div>
	);
};

export default NoEvent;
