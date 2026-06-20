import Produto from './components/Produto';
import img1 from './assets/download.jpg';
import img2 from './assets/download (1).jpg';
import img3 from './assets/download (2).jpg';
import { useEffect, useState } from 'react';


const API_URL = 'https://crudcrud.com/api/ec0084b259914ff1845cc85ed0cf69b8/produtos';




function App() {

  const [produtos, setProdutos] = useState([]);
  const [novoProduto, setNovoProduto] = useState({
     img: null,
     nome:"",
     sobre:"",
     preco:"",
  }); 

  useEffect(() =>{
    fetch(API_URL)
    .then(res => res.json())
    .then(dados => setProdutos(dados))
    .catch(error => console.error("Erro ao buscar produtos:",error))
  },[])
  
  
  const handleSubmit = (e) => {

    e.preventDefault();

    if (!novoProduto.img || novoProduto.nome.trim() === '' || novoProduto.sobre.trim() === '' || novoProduto.preco.trim() === '') return;
    
    const nova = {
      img: URL.createObjectURL(novoProduto.img),
      nome: novoProduto.nome,
      sobre: novoProduto.sobre,
      preco: novoProduto.preco,
    }
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
        <input type='file' accept="image/*"
          onChange={(e) => setNovoProduto({...novoProduto, img: e.target.files[0]})}
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
      <section>
        {produtos.map(produto => <Produto key={produto._id} img={produto.img} nome={produto.nome} sobre={produto.sobre} preco={produto.preco} />)}
      </section>
    </main> 
  )
}

export default App
