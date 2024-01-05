import React from "react";
import createimage from "../images/createimage.svg";
import event from "../images/event.svg";
import share from "../images/share.svg";
import Image from "next/image";

const HomeSection = () => {
	const array = [
		{
			id: 1,
			title: "Creer un compte",
			content: `C'est simple et rapide – Commencez en quelques étapes!`,
			image: createimage,
		},
		{
			id: 2,
			title: "Ajoutez un événement à venir",
			content: "Creer et manager les événements les formations, les panels et meeting...  ",
			image: event,
		},
		{
			id: 3,
			title: "Partagez l'événement",
			content:
				"Partagez ensuite le ticket de lévénement, les utilisateurs s'enregristrent et obtiennent leur ticket, ensuite vous pouvez gerer les participants dans la plateforme",
			image: share,
		},
	];
	return (
		<div className='w-full bg-black  md:px-[20px] px-[10px] py-10 flex justify-center flex-col items-center'>
			<h2 className='text-2xl text-[#ecbf66] mb-12'>Comment sa marche?</h2>
			<div className='flex flex-col space-y-[50px] w-full py-4 md:px-[50px] px-[10px]'>
				{array.map((item) => (
					<div
						className='bg-[#e1d1b3] shadow-md rounded-md w-full flex md:items-center md:justify-between p-10 md:flex-row flex-col'
						key={item.id}
					>
						<div className='md:w-[60%] w-full flex md:flex-row flex-col items-center justify-center space-x-6'>
							<div className='p-6 w-20 flex items-center justify-center h-20 border-gray-700 bg-[#C07F00] rounded-full mb-6 md:mb-auto'>
								<h1 className='text-5xl'>{item.id}</h1>
							</div>
							<div className='md:w-1/2 w-full md:block flex flex-col items-center '>
								<h2 className='md:text-3xl text-2xl mb-2  md:text-left  text-center font-bold'>
									{item.title}
								</h2>
								<p className=' md:text-left text-center opacity-50'>
									{item.content}
								</p>
							</div>
						</div>
						<div className='md:w-[40%] w-full md:mt-auto mt-8'>
							<Image
								src={item.image}
								alt='Create an Account'
								className='w-full'
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default HomeSection;
