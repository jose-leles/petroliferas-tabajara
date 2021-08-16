import React, { useEffect, useState } from 'react'

import { Header, Footer, Container, ModalPedido } from '../components'
import { useAppContext } from '../context/AppWrapper';

export default function Home() {
	const {state, dispatch} =  useAppContext()
	const [mostraModal, setMostraModal] = useState(false);
	const [sendData, setSendData] = useState(null)

	useEffect(() => {
		if(sendData){
			fetch("https://petroliferas-tabajara-fakei-ap.herokuapp.com/pedido", {
				method: "PUT",
				body: JSON.stringify(sendData),
				headers:{"Content-Type": "application/json"}
			}).then(result => {
				setSendData(null);
				dispatch({
					type:"SHOW_TOASTER",
					toaster: {
						title:"Sucesso",
						message:"Cadastrado com sucesso",
						status:"success"
					}
				})
			})
		}
	},[sendData]);
	
	return (
		<>
			<Header />
			<Container fullSize={true}>
				<div
					className="flex bg-opacity-5 bg-cover"
					style={{ backgroundImage: 'url("/petroleo-1.jpg")' }}
				>
					<div className="flex flex-col items-center bg-gray-300 px-96 py-60 bg-opacity-80 w-full">
						<h1 className="font-mono text-3xl text-center text-gray-900">
							Somos a Tabajara Companies, vendemos gasolina e derivados de
							petróleo <br /> entre em contato conosco para pedir orçamento
						</h1>
						<button
							className="mt-7 bg-yellow-500 hover:bg-yellow-700 text-white text-base font-bold py-3 px-4 rounded w-60"
							onClick={() => {
								setMostraModal(true)
							}}
						>
							Pedir orçamento
						</button>
					</div>
				</div>
				<div
					id="sobre"
					className="flex flex-col items-center px-96 py-60 bg-opacity-80 w-full"
				>
					<h1 className="font-mono text-3xl text-center text-yellow-500">
						Sobre nós
					</h1>
					<h1 className="font-mono mt-8 text-3xl text-center text-gray-900">
						Estamos a muito tempo no mercado e isso nos faz uma empresa de muito renome
					</h1>
				</div>
				{mostraModal ? <ModalPedido 
					buttonCancelAction={() => setMostraModal(false) } 
					onSendData={pedido => { 
						setSendData(pedido)
						setMostraModal(false);
						/* toaster */
						}
					} /> 
					: 
					<></>}
			</Container>
			<Footer />
		</>
	)
}
