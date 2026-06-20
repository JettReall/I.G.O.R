

 const dado_pericia = {}; //Variável a ser substituida pela final
 const pericias = []; //Variavel a ser substituida pela final
 const Status = []; //Vriavel a ser substituida pela final

function ContainerAtributos({atributos}) {
     function Atributo({dados}) {
          return (
               <>
               <strong> {dados.nome} </strong>
               <div className="">
                    <strong>{dados.valor}</strong>
               </div>
               </>
          )
     }

    // atributos.map() Desligada pois ainda não a implementei. Ela deve retornar um Atributo para cada elemento do prop (que é uma lista de elementos)
}


function Pericia() {
     
     function ValorPericia({valor, nome}) {
          return (
               <div className="">
                         <p>{nome}</p>
                         <p className="">{valor}</p>
                    </div>
               )
          }
          
          
          return (
               <div className="">
                    <strong>{dado_pericia.nome}</strong>
                    <strong>{dado_pericia.atributo.nome}</strong>
                    <div className="">
                         <ValorPericia nome={"Treino"} valor={(dado_pericia.treino * 5)} />
                         <ValorPericia nome={"Bônus"} valor={(dado_pericia.bonus)} />
                         <ValorPericia nome={"Outro"} valor={(dado_pericia.outro)} />
                    </div>
                    <ValorPericia nome={"Total"} valor={dado_pericia.total}/>
               </div>
     )
}

function ContainerPericias() {
     //pericias.map() uma Pericia para cada elemento

}

function Status( {stat} ) {
     return (
          <div className="">
               <button>-</button>
               <div className="">
                    <strong>{stat.atual}</strong>
                    <strong>{stat.maximo}</strong>
               </div>
               <button>+</button>
          </div>
     )
}
function StatusUnico( {stat, nome} ) {
     return (
               <div className="">
                    <strong>{nome}</strong>
                    <strong>{stat.atual}</strong>
               </div>
     )
}

function ContainerStatus() {
     //Status.map()
}


function Combate() {

}

export {
     Combate,
}