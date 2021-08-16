import React, { useEffect, useState } from 'react'
import Time from '../../utils/Time'

import ModalBase from '../ModalBase'

const ModalPedido = ({
	onSendData,
	pedido,
	isEdit,
	buttonColor,
	buttonOkText,
	buttonCancelText,
	buttonOkAction,
	buttonCancelAction,
}) => {
	const [cep, setCep] = useState('')
	const [cepResult, setCepResult] = useState({});

	const [formData, setFormData] = useState({});

	const onSubmitForm = () => {
		if(onSendData){
			onSendData(formData);
		}
	}

	useEffect(() => {
		if (
			(cep?.includes('-') && cep?.length == 9) ||
			(!cep?.includes('-') && cep?.length == 8)
		) {
			fetch(`https://viacep.com.br/ws/${cep.replace('-', '')}/json/`)
				.then((result) => result.json())
				.then((json) => {
					setCepResult(json)
					setFormData({ ...formData, endereco: json.logradouro })
				})
		}
	}, [cep])

	return (
		<ModalBase
			buttonColor={buttonColor}
			buttonOkText={buttonOkText}
			buttonCancelText={buttonCancelText}
			buttonOkAction={() => onSubmitForm()}
			buttonCancelAction={buttonCancelAction}
		>
			<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
				<h3
					className="text-3xl mt-5 mb-4 leading-6 font-medium text-gray-900"
					id="modal-title"
				>
					Pedido de reposição
				</h3>
				<form>
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
								value={isEdit && pedido?.nomeEmpresa}
								onChange={(event) => setFormData({ ...formData, nomeEmpresa: event.target.value })}

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
								value={isEdit && pedido?.emailEmpresa}
								onChange={(event) => setFormData({ ...formData, emailEmpresa: event.target.value })}

							/>
						</div>
						<div className="mb-4">
							<label className="block text-gray-700 text-md mb-2" for="cep">
								CEP:
							</label>
							<input
								id="cep"
								onChange={(event) => { setCep(event.target.value); setFormData({ ...formData, cep: event.target.value })} }
								className="shadow appearance-none border rounded w-44 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								type="text"
								placeholder="CEP"
								value={isEdit && pedido?.cep}

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
								value={isEdit && pedido?.numero}
								onChange={(event) => setFormData({ ...formData, numero: event.target.value })}

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
								value={cepResult?.logradouro || isEdit && pedido?.endereco}
								onChange={(event) => setFormData({ ...formData, endereco: event.target.value })}
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
								value={isEdit && pedido && pedido.dataPrazo && Time.timestampToDDMMYYY(pedido.dataPrazo)}
								onChange={(event) => setFormData({ ...formData, dataPrazo: Time.dateToTimestamp(event.target.value) })}

							/>
						</div>
						{isEdit? <div className="mb-4">
							<label
								className="block text-gray-700 text-md mb-2"
								for="status"
							>
								Status:
							</label>
							<select
								id="status"
								className="shadow appearance-none border rounded w-56 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								onChange={(event) => setFormData({ ...formData, status: event.target.value })}

							>
								<option value="pending" selected={isEdit? pedido?.status == "pending" : false}>
									Pendente
								</option>
								<option value="success" selected={isEdit? pedido?.status == "success" : false}>
									Resolvido
								</option>
								<option value="canceled" selected={isEdit? pedido?.status == "canceled" : false}>
									Cancelado
								</option>
							</select>
						</div> : <></>}
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
							onChange={(event) => setFormData({ ...formData, observacao: event.target.value })}

						>{isEdit? pedido?.observacao : ""}</textarea>
					</div>
				</form>
			</div>
		</ModalBase>
	)
}

export default ModalPedido
