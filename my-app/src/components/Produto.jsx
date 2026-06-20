function Produto({ img, nome, sobre, preco }){
    return(
        <a>
            <img alt="" src={img} />
            <h3>{nome}</h3>
            <p>{sobre}</p>
            <strong>R$ {preco}</strong>
        </a>              
    )
}
export default Produto;