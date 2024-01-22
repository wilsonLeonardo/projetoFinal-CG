# Projeto final de Computação Gráfica - UFSCAR

## Integrantes
- Wilson Marcielo  - RA: 771068
- Matheus Fernando - RA: 771047

## Sobre o projeto
O objetivo desta atividade é o desenvolvimento de uma animação utilizando as implementações do algoritmo ray tracing desenvolvidas em aula. A cena é composta por 4 objetos, sendo eles: 3 esferas (1 sendo o chão) e um cubo que possui uma malha poligonal triangular. Com base nos critérios estabelecidos pelo professor, decidimos que as 2 esferas se deslocariam na vertical, o que causa um efeito de sombra no chão, e o cubo fica estático entre as duas esferas. Uma vez que o cubo é metálico e as esferas são difusas, é possível perceber na animação o reflexo das esferas no cubo. Outro aspecto relevante é a movimentação da câmera em torno dos objetos. 

## Como Executar

Antes de executar, certifique-se de instalar as `node_modules` usando o seguinte comando:

```bash
npm install
```

Para gerar os arquivos das visualizações com os materiais difusos, utilize o seguinte comando:

```bash
npm run execute
```

## Documentação

Para consultar a documentação do código, acesse o arquivo `docs/index.html`.
