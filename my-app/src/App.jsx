import Produto from './components/Produto';
import { useEffect, useState } from 'react';
import './App.css';

const API_URL = 'https://crudcrud.com/api/42520a2872cd4fbfb093f23ee91a4898/produtos';




function App() {

  const [produtos, setProdutos] = useState([]);
  const [novoProduto, setNovoProduto] = useState({
     img: null,
     nome:"",
     sobre:"",
     preco:"",
  }); 
  const [carregando, setCarregando] = useState(true);

  useEffect(() =>{
     setCarregando(true);

    fetch(API_URL)
    .then(res => res.json())
    .then(dados => setProdutos(dados))
    .catch(error => console.error("Erro ao buscar produtos:",error))
    .finally(() => {
       setTimeout(() => {
        setCarregando(false);
      }, 3000);
    })
  },[]);  
  const handleSubmit = (e) => {

    e.preventDefault();

    if (!novoProduto.img || novoProduto.nome.trim() === '' || novoProduto.sobre.trim() === '' || novoProduto.preco.trim() === '') return;

      const nova = {
        img: novoProduto.img,
        nome: novoProduto.nome,
        sobre: novoProduto.sobre,
        preco: novoProduto.preco,
      };
      fetch(API_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(nova)
      })
      .then(res => res.json())
      .then(produtoCriado => {
        setProdutos([...produtos, produtoCriado]);
        setNovoProduto({
          img: null,
          nome:"",
          sobre:"",
          preco:"",
        });   
      })
      .catch(error => console.error("Erro ao buscar produtos:",error))
  }

  return (
    
    <main>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='URL da imagem'
          value={novoProduto.img}
          onChange={(e) => setNovoProduto({...novoProduto, img: e.target.value})}
        />
        <input type='text' placeholder='Digite o nome do item'
          value={novoProduto.nome}
          onChange={(e) => setNovoProduto({...novoProduto, nome: e.target.value})}
        /> 
        <input type='text' placeholder='descrição do item'
          value={novoProduto.sobre}
          onChange={(e) => setNovoProduto({...novoProduto, sobre: e.target.value})}
        />
        <input type='text' placeholder='Valor do item'
          value={novoProduto.preco}
          onChange={(e) => setNovoProduto({...novoProduto, preco: e.target.value})}
        />
        <button type='submit'>Adcionar</button>
      </form>
      {carregando ? (
        <p className='loading'>Carregando produtos...</p>
      ) : (
        <section>
          {produtos.map(produto => <Produto key={produto._id} img={produto.img} nome={produto.nome} sobre={produto.sobre} preco={produto.preco} />)}
        </section>
      )}
    </main> 
  )
}

export default App
