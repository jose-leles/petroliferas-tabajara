import React, { useEffect, useState } from 'react'

import ModalBase from '../ModalBase'

const ModalPedido = (props) => {
	const [cep, setCep] = useState('')
	const [cepResult, setCepResult] = useState({})

	useEffect(() => {
		if (
			(cep?.includes('-') && cep?.length == 9) ||
			(!cep?.includes('-') && cep?.length == 8)
		) {
			fetch(`https://viacep.com.br/ws/${cep.replace('-', '')}/json/`)
				.then((result) => result.json())
				.then((json) => {
					setCepResult(json)
				})
		}
	}, [cep])

	return (
		<ModalBase>
			<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
				<h3
					className="text-3xl mt-5 mb-4 leading-6 font-medium text-gray-900"
					id="modal-title"
				>
					Pedido de reposição
				</h3>
				<form action="/controllers/pedido" method="post">
					<br />
					<div className="w-full mt-5 grid grid-cols-2 gap-x-16">
						<div className="mb-4">
							<label
								className="block text-gray-700 text-md mb-2"
								for="nome-empresa"
							>
								Nome empresa
							</label>
							<input
								id="nome-empresa"
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								type="text"
								placeholder="Nome"
							/>
						</div>
						<div className="mb-4">
							<label className="block text-gray-700 text-md mb-2" for="email">
								Email
							</label>
							<input
								id="email"
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								type="text"
								placeholder="Email"
							/>
						</div>
						<div className="mb-4">
							<label className="block text-gray-700 text-md mb-2" for="cep">
								CEP:
							</label>
							<input
								id="cep"
								onChange={(event) => setCep(event.target.value)}
								className="shadow appearance-none border rounded w-44 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								type="text"
								placeholder="CEP"
							/>
						</div>
						<div className="mb-4">
							<label className="block text-gray-700 text-md mb-2" for="numero">
								Numero:
							</label>
							<input
								id="numero"
								className="shadow appearance-none border rounded w-24 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								type="text"
								placeholder="Número"
							/>
						</div>
						<div className="mb-4">
							<label
								className="block text-gray-700 text-md mb-2"
								for="endereco"
							>
								Endereço:
							</label>
							<input
								id="endereco"
								value={cepResult?.logradouro}
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								type="text"
								placeholder="Endereço"
							/>
						</div>
						<div className="mb-4">
							<label
								className="block text-gray-700 text-md mb-2"
								for="data-desejada"
							>
								Data desejado para contato:
							</label>
							<input
								id="data-desejada"
								className="shadow appearance-none border rounded w-56 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								type="date"
							/>
						</div>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-md mb-2"
							for="observacao"
						>
							Observaçao:
						</label>
						<textarea
							id="observacao"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
					</div>
				</form>
			</div>
		</ModalBase>
	)
}

export default ModalPedido
