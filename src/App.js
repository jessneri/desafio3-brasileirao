import React from "react";
import "./App.css";

function App() {
  const legenda = {
    nome: "Time",
    pontos: "Pontos",
    jogos: "Jogos",
    vitorias: "Vitórias",
    empates: "Empates",
    derrotas: "Derrotas",
    golsFeitos: "GF",
    golsSofridos: "GS",
  };

  const colunas = [
    "nome",
    "pontos",
    "empates",
    "vitorias",
    "derrotas",
    "golsFeitos",
    "golsSofridos",
  ];

  const [colunaOrdenada, setColunaOrdenada] = React.useState("pontos");
  const [ordem, setOrdem] = React.useState("ascendente");
  const [dados, setDados] = React.useState([]);
  const [rodadas, setRodadas] = React.useState([]);

  React.useEffect(() => {
    fetch(
      "https://desafio-3-back-cubos-academy.herokuapp.com/classificacao"
    ).then(function (res) {
      res.json().then(function (data) {
        return setDados(data.dados);
      });
    });
  }, []);

  React.useEffect(() => {
    fetch("https://desafio-3-back-cubos-academy.herokuapp.com/jogos/1").then(
      function (res) {
        res.json().then(function (data) {
          return setRodadas(data.dados);
        });
      }
    );
  }, []);

  const dadosAscendentes = dados.sort((t1, t2) => {
    //de onde eu vou pegar os dados para ordena-los?
    if (
      typeof t1[colunaOrdenada] === "number" &&
      typeof t2[colunaOrdenada] === "number"
    ) {
      return (
        parseInt(t2[colunaOrdenada], 10) - parseInt(t1[colunaOrdenada], 10)
      );
    } else {
      return t1[colunaOrdenada].localeCompare(t2[colunaOrdenada]);
    }
  });

  const dadosOrdenados =
    ordem === "descendente" ? dadosAscendentes.reverse() : dadosAscendentes;

  return (
    <div className="App">
      <header>
        <div className="header-centro">
          <h1>Brasileirão</h1>
          <form className="login">
            <label>
              Email:
              <input type="email"></input>
            </label>
            <label>
              Senha:
              <input type="password"></input>
            </label>
            <button>Logar</button>
          </form>
        </div>
      </header>
      <main>
        <div className="centro">
          <div className="tabelaDeRodadas">
            <div className="titulo">
              <button>
                <img
                  src="https://systemuicons.com/images/icons/arrow_left.svg"
                  alt="button"
                ></img>
              </button>
              <h1>1ª rodada</h1>
              <button>
                <img
                  src="https://systemuicons.com/images/icons/arrow_right.svg"
                  alt="button"
                ></img>
              </button>
            </div>
            <div className="jogos">
              <ul className="jogo">
                {rodadas.map((rodada) => (
                  <li>
                    <span className="time1">{rodada.time_casa}</span>
                    <span className="gol2">{rodada.gols_casa}</span>x
                    <span className="gol2">{rodada.gols_visitante}</span>
                    <span className="time2">{rodada.time_visitante}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="tabelaDeTimes">
            <table>
              <thead>
                <tr>
                  <th>Posição</th>
                  {colunas.map((coluna) => (
                    <th>
                      {legenda[coluna]}{" "}
                      <button
                        onClick={() => {
                          if (colunaOrdenada === coluna) {
                            setOrdem((ordem) =>
                              ordem === "descendente"
                                ? "descendente"
                                : "ascendente"
                            );
                          } else {
                            setColunaOrdenada(coluna);
                            setOrdem("descendente");
                          }
                        }}
                      >
                        {colunaOrdenada !== coluna ||
                        ordem === "descendente" ? (
                          <img
                            src="https://systemuicons.com/images/icons/arrow_down.svg"
                            alt="bt"
                          ></img>
                        ) : (
                          <img
                            src="https://systemuicons.com/images/icons/arrow_up.svg"
                            alt="bt"
                          ></img>
                        )}
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dadosOrdenados.map((time, i) => (
                  <tr>
                    <td>{i + 1}</td>
                    {colunas.map((coluna) => (
                      <td>{time[coluna]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
