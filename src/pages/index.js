import React from 'react';

import { Header, Footer, Container } from '../components';

export default function Home() {
  return (<>
    <Header />
    <Container fullSize={true}>
      <div class="flex bg-opacity-5 bg-cover" style={{backgroundImage: 'url("/petroleo-1.jpg")'}}>
        <div class="flex flex-col items-center bg-gray-300 px-96 py-60 bg-opacity-80 w-full">
          <h1 class="font-mono text-3xl text-center text-gray-900">
            Somos a Tabajara Companies, vendemos gasolina e derivados de petróleo <br/> entre em contato conosco para pedir orçamento
          </h1>
          <button class="mt-7 bg-yellow-500 hover:bg-yellow-700 text-white text-base font-bold py-3 px-4 rounded w-60">
            Pedir orçamento
          </button>
        </div>
      </div>
      <div class="flex flex-col items-center px-96 py-60 bg-opacity-80 w-full">
        <h1 class="font-mono text-3xl text-center text-yellow-500">
          Sobre nós
        </h1>
        <h1 class="font-mono text-3xl text-center text-gray-900">
          Somos a Tabajara Companies, vendemos gasolina e derivados de petróleo <br /> entre em contato conosco para pedir orçamento
        </h1>
      </div>
    </Container>
    <Footer  />
  </>
  )
}
