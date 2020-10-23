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
  const [rodada, setRodada] = React.useState(1);
  const [editar, setEditar] = React.useState("clicado");

  //estados autenticação
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [logado, setLogado] = React.useState();
  const [token, setToken] = React.useState();

  React.useEffect(() => {
    fetch(
      "https://desafio-3-back-cubos-academy.herokuapp.com/classificacao"
    ).then(function (res) {
      res.json().then(function (data) {
        console.log(data.dados);
        return setDados(data.dados);
      });
    });
  }, []);

  React.useEffect(() => {
    fetch(
      `https://desafio-3-back-cubos-academy.herokuapp.com/jogos/${rodada}`
    ).then(function (res) {
      res.json().then(function (data) {
        return setRodadas(data.dados);
      });
    });
  }, [rodada]);

  function fazerRequisicaoComBody(email, password) {
    return fetch("https://desafio-3-back-cubos-academy.herokuapp.com/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!email || !password) {
      alert("Passe todas as informações!");
      return;
    }

    if (logado) {
      setLogado(false);
    } else {
      setLogado(true);
      fazerRequisicaoComBody(email, password).then((res) => {
        res.json().then((data) => {
          setToken(data.dados.token);
        });
      });
    }
  }

  const dadosAscendentes = dados.sort((t1, t2) => {
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
    ordem === "ascendente" ? dadosAscendentes : dadosAscendentes.reverse();

  return (
    <div className="App">
      <header>
        <div className="header-centro">
          <h1>Brasileirão</h1>
          <form className="login" onSubmit={handleSubmit}>
            {!logado ? (
              <>
                <label>
                  Email:
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} //pega o valor do email
                  ></input>
                </label>
                <label>
                  Senha:
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} //pega o valor da senha
                  ></input>
                </label>
                <button type="submit">Logar</button>
              </>
            ) : (
              <button type="submit">Deslogar</button>
            )}
          </form>
        </div>
      </header>
      <main>
        <div className="centro">
          <div className="tabelaDeRodadas">
            <div>
              <div className="titulo">
                <button
                  onClick={() => {
                    if (rodada > 1) {
                      setRodada(rodada - 1);
                    }
                  }}
                >
                  <img
                    src="https://systemuicons.com/images/icons/arrow_left.svg"
                    alt="button"
                  ></img>
                </button>
                <h1>{rodada}ª rodada</h1>
                <button
                  onClick={() => {
                    if (rodada < 38) {
                      setRodada(rodada + 1);
                    }
                  }}
                >
                  <img
                    src="https://systemuicons.com/images/icons/arrow_right.svg"
                    alt="button"
                  ></img>
                </button>
              </div>
              {rodadas.map((rodada) =>
                !logado ? (
                  <tr className="jogo">
                    <td className="time1">{rodada.time_casa}</td>
                    <td className="gol1">{rodada.gols_casa}</td>
                    <td>x</td>
                    <td className="gol2">{rodada.gols_visitante}</td>
                    <td className="time2">{rodada.time_visitante}</td>
                  </tr>
                ) : (
                  <tr className="jogo">
                    <td className="time1">{rodada.time_casa}</td>
                    <td className="gol1">{rodada.gols_casa}</td>
                    <td>x</td>
                    <td className="gol2">{rodada.gols_visitante}</td>
                    <td className="time2">{rodada.time_visitante}</td>
                    <button className="btEditar">
                      <img
                        src="https://systemuicons.com/images/icons/pen.svg"
                        alt="button"
                      ></img>
                    </button>
                  </tr>
                )
              )}
            </div>
          </div>
          <div className="tabelaDeTimes">
            <table>
              <thead>
                <tr>
                  <th>Posição</th>
                  {colunas.map((coluna) => (
                    <th>
                      {legenda[coluna]}
                      <button
                        onClick={() => {
                          if (colunaOrdenada === coluna) {
                            setOrdem((ordem) =>
                              ordem === "descendente"
                                ? "ascendente"
                                : "descendente"
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
