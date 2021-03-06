import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

const Header = (props) => {
	return (
		<>
			<Head>
				<link rel="stylesheet" href="main.css" />
				<link rel="stylesheet" href="tailwind.css" />
				<title>{props.title || 'Tabajara Companies'}</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			{/* style={{backgroundColor: "#f00", height: 60, display: "flex", padding: 5}} */}
			<header className="grid grid-cols-2 h-16 p-1  shadow">
				<div>
					<img className="h-14" src={'/logo.png'} />
				</div>
				<div className="pr-10 hidden sm:block ">
					<ul className="flex flex-row justify-between w-80 float-right items-center h-full font-mono text-xl text-gray-600">
						<Link href="/">
							<li className="hover:text-yellow-500 cursor-pointer">HOME</li>
						</Link>
						<Link href="/#sobre">
							<li className="hover:text-yellow-500 cursor-pointer">SOBRE</li>
						</Link>
						<Link href="/admin">
							<li className="hover:text-yellow-500 cursor-pointer">ADMIN</li>
						</Link>
					</ul>
				</div>
				<div className="pr-10 sm:hidden flex-row justify-center items-center">
					<ul className="">
						<li className="float-right">
							<img src="/menu.png" className="h-10" />
						</li>
					</ul>
				</div>
			</header>
		</>
	)
}

export default Header
