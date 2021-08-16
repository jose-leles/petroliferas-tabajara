import React, { useContext } from 'react'
import { Toaster } from '..'
import { useAppContext } from '../../context/AppWrapper'

const Container = (props) => {
	const {state, dispatch} =  useAppContext()
	return (
		<div className="flex flex-row w-full">
			{props.fullSize ? <></> : <div className="w-1/6 " />}
			<div className={props.fullSize ? 'w-full' : 'w-4/6'}>
				{props.children}
				{state.toaster? <Toaster title="Sucesso" message="Cadastro com sucesso" status="success" /> : <></>}
			</div>
			{props.fullSize ? <></> : <div className="w-1/6 " />}
			
		</div>
	)
}

export default Container
