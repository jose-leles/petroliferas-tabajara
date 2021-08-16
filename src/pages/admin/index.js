import React, { useEffect, useState } from 'react'

import { Header, Footer, Container, ModalPedido } from '../../components'
import { useAppContext } from '../../context/AppWrapper';
import Time from '../../utils/Time';

export default function Admin() {
	const [ pedidos, setPedidos ] = useState(null);
	const [ pedidoEditar , setPedidoEditar ] = useState(null);
	const [ sendDataEditar , setSendDataEditar ] = useState(null);
	const [ codigoPedidoExcluir , setCodigoPedidoExcluir ] = useState(null); 
	const {state, dispatch} =  useAppContext()


	useEffect(() => {
		if(sendDataEditar){
			fetch("https://petroliferas-tabajara-fakei-ap.herokuapp.com/pedido", {
				method: "POST",
				body: JSON.stringify(sendDataEditar),
				headers:{"Content-Type": "application/json"}
			}).then(result => {
				setSendDataEditar(null);
				dispatch({
					type:"SHOW_TOASTER",
					toaster: {
						title:"Sucesso",
						message:"Editado com sucesso",
						status:"success"
					}
				})
			})
		}
	},[sendDataEditar]);

	useEffect(() => {
		if(codigoPedidoExcluir){
			fetch("https://petroliferas-tabajara-fakei-ap.herokuapp.com/pedido/"+codigoPedidoExcluir, {
				method: "DELETE"
			}).then(result => {
				setCodigoPedidoExcluir(null);
				dispatch({
					type:"SHOW_TOASTER",
					toaster: {
						title:"Sucesso",
						message:"Deletado com sucesso",
						status:"success"
					}
				})
			})
		}
	},[codigoPedidoExcluir]);

	useEffect(() => {
		fetch("https://petroliferas-tabajara-fakei-ap.herokuapp.com/pedido")
		.then(result => result.json())
		.then(json => {
			setPedidos([...json]);
		});
	}, [pedidoEditar, codigoPedidoExcluir])
	
	return (
		<>
			<Header />
			<Container>
				<h1 className="font-thin mt-20 mb-16 text-4xl">
					Pedidos de reposição de estoque
				</h1>
				<div className="flex flex-col my-2.5 mb-96">
					<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
							<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
								<table className="min-w-full divide-y divide-gray-200">
									<thead className="bg-gray-50">
										<tr>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
											>
												Empresa
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
											>
												Endereço
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
											>
												Status
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
											>
												Prazo Máx.
											</th>
											<th scope="col" className="relative px-6 py-3">
												<span className="sr-only">Atender</span>
											</th>
										</tr>
									</thead>
									<tbody className="bg-white divide-y divide-gray-200">
										{ pedidos && pedidos.map( pedido => 
											<tr>
												<td className="px-6 py-4 whitespace-nowrap">
													<div className="flex items-center">
														<div className="flex-shrink-0 h-10 w-10">
															<img
																className="h-10 w-10 rounded-full"
																src={pedido.empresaImg}
																alt=""
															/>
														</div>
														<div className="ml-4">
															<div className="text-sm font-medium text-gray-900">
																{pedido.nomeEmpresa}
															</div>
															<div className="text-sm text-gray-500">
																{pedido.emailEmpresa}
															</div>
														</div>
													</div>
												</td>
												<td className="px-6 py-4 whitespace-nowrap">
													<div className="text-sm text-gray-900">
														{pedido.endereco}
													</div>
													<div className="text-sm text-gray-500">CEP: {pedido.cep}</div>
												</td>
												<td className="px-6 py-4 whitespace-nowrap">
													<span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
															pedido.status == "pending" ? "bg-yellow-100 text-yellow-800" :
															pedido.status == "success" ? "bg-green-100 text-green-800" :
															"bg-red-100 text-red-800"}`
															
														}>
														{
															pedido.status == "pending" ? "Pendente" :
															pedido.status == "success" ? "Resolvido" :
															"Cancelado"
														} 
													</span>
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
													{Time.diffTimeText(pedido.dataPrazo)} ({Time.timestampToDDMMYYY(pedido.dataPrazo)})
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
													<a
														href="#"
														className="text-blue-600 hover:text-blue-900"
														onClick={ () => setPedidoEditar(pedido) }
													>
														Editar
													</a>
													<a
														href="#"
														className="ml-5 text-red-600 hover:text-red-900"
														onClick={ () => setCodigoPedidoExcluir(pedido.codigo) }
													>
														Remover
													</a>
												</td>
											</tr>
										)}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				{pedidoEditar ? 
					<ModalPedido
						buttonCancelAction={() => setPedidoEditar(null) } 
						onSendData={pedido => { 
							setSendDataEditar( { ...pedidoEditar, ...pedido })
							setPedidoEditar(null);
							/* toaster */
							}
						} 
						isEdit={true} 
						pedido={pedidoEditar} /> 
				: <></>}
			</Container>
			<Footer absolute={true} />
		</>
	)
}
