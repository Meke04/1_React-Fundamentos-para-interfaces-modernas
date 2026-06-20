 const [novoProduto, setNovoProduto] = useState({
     img: null,
     nome:"",
     sobre:"",
     preco:"",
   }); 
  
  
  
  <form>
        <input type='file' placeholder='Escolha sua imagem'/>
          value=[novoProduto.img]
          onChange={(e) => setNovoProduto(e.target.value)}
        <input type='text' placeholder='Digite o nome do item'></input>
          value=[novoProduto.nome]
          onChange={(e) => setNovoProduto(e.target.value)}
        <input type='text' placeholder='descrição do item'></input>
          value=[novoProduto.sobre]
          onChange={(e) => setNovoProduto(e.target.value)}
        <input type='text' placeholder='Valor do item'></input>
          value=[novoProduto.preco]
          onChange={(e) => setNovoProduto(e.target.value)}

      </form>