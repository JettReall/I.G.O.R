# I.G.O.R.

Sistema de gerenciamento de fichas e combate para RPG de mesa, com suporte a personagens, monstros, campanhas, perícias, ações (ataques, rituais, habilidades) e progressão de NEX.

## Tecnologias

- **Java**
- **Spring Boot**
- **JPA / Hibernate**
- **PostgreSQL**
- **Swagger / OpenAPI** (documentação interativa dos endpoints)

## Documentação da API

A documentação completa e interativa de todos os endpoints está disponível via Swagger, com o projeto rodando localmente:

```
http://localhost:8080/swagger-ui/index.html
```

Lá é possível ver o schema de cada request/response, testar chamadas diretamente pelo navegador e consultar todos os DTOs utilizados.

## Estrutura de arquivos do projeto

```
backend/src/main/java/com/example/igor/
├── Acao/                  # Lógica de execução de ações (Strategy + Registry pattern)
│   ├── Habilidades/        # Implementações de habilidades (ex: ArtistaMarcial)
│   ├── Rituais/            # Implementações de rituais (ex: Decadencia)
│   ├── AcaoService          # Roteia a ação para o handler correto via AcoesChave
│   ├── AcoesChave           # Enum com as chaves de cada ação implementada
│   └── AtaqueAcao           # Implementação de ataque físico
├── Campanhna/              # Campanhas, vínculo com usuário e combates
├── Combate/                # Combate, ordem de turno, perícias, ações em combate
│   ├── DTO/                 # ContextoAcao, PericiaDTO, CombateFichaDTO etc
│   ├── Repositories/
│   └── Service/             # CombateService, PericiaService
├── Exception/               # GlobalExceptionHandler e exceções customizadas
├── ficha/                   # Fichas (personagem, monstro) e suas entidades
│   ├── controller/           # PersonagemController
│   ├── service/               # PersonagemService
│   ├── entity/
│   │   ├── acao/               # Acao (abstrata), Ataque, Ritual, Habilidade
│   │   ├── personagem/         # Personagem, Classe, Trilha, Pericia, Origem
│   │   └── PreRequisito/       # Pré-requisitos polimórficos (Nex, Atributo, Classe, Habilidade)
│   ├── LevelUp/               # PersonagemNexService — progressão de NEX
│   ├── FichaUtil/             # Stats, enums (AtributoEnum, TipoAcao, Elemento etc)
│   └── Repositories/
├── global/Dado/             # Sistema de rolagem de dados (RolagemDado, Dado)
├── usuario/                  # Cadastro, login e dados do usuário
└── IgorApplication           # Classe principal
```

## Principais grupos de endpoints

Todos os detalhes de request/response de cada endpoint estão disponíveis no Swagger. Abaixo, um resumo dos grupos disponíveis:

| Grupo | Prefixo | Descrição |
|---|---|---|
| **Usuários** | `/usuarios` | Cadastro, login, busca, atualização e remoção de usuários |
| **Personagens** | `/personagens` | Criação de personagem, busca por ID/usuário, listagem de origens, classes, trilhas e perícias |
| **Progressão (NEX)** | `/personagens/{id}/nex` | Sobe o NEX, aplica ganhos automáticos de status, libera escolha de poderes/habilidades/atributos/perícias |
| **Combate** | `/combate` | Execução de ações (ataque, ritual, habilidade), rolagem de perícia, ordem de turno, controle de ações por turno (padrão/movimento/livre) |
| **Campanhas** | `/campanha` | Criação e gerenciamento de campanhas, vínculo de fichas e combates |
| **Dados** | `/Dado` | Rolagem de dados no formato `NdX + B` |

## Padrões utilizados

- **Strategy + Registry**: cada tipo de ação (`Ataque`, `Ritual`, `Habilidade`) implementa a interface `UsarAcao`, e o `AcaoService` registra todas as implementações automaticamente via injeção de dependência do Spring, despachando a execução pelo enum `AcoesChave`.
- **Pré-requisitos polimórficos**: habilidades podem exigir NEX mínimo, atributo mínimo, classe específica ou outra habilidade já adquirida, através da hierarquia `PreRequisito` (`PreRequisitoNex`, `PreRequisitoAtributo`, `PreRequisitoClasse`, `PreRequisitoHabilidade`).
- **Herança JOINED**: `Ficha` é a superclasse de `Personagem` e `Monstro`; `Acao` é a superclasse de `Ataque`, `Ritual` e `Habilidade`.