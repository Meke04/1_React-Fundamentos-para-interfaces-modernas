import './Produto.css';

function Produto({ img, nome, sobre, preco }){
    return(
        <div className="produto-card">
            <img alt="" src={img} />
            <h3>{nome}</h3>
            <p>{sobre}</p>
            <strong>R$ {preco}</strong>
        </div>              
    )
}
export default Produto;