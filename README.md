# Projeto final de Computação Gráfica - UFSCAR

O objetivo desta atividade é o desenvolvimento de uma animação utilizando as implementações do algoritmo ray tracing desenvolvidas em aula. 

## Sobre a cena

A cena é composta por 4 objetos, sendo eles: 3 esferas (1 sendo o chão) e um cubo que possui uma malha poligonal triangular. Com base nos critérios estabelecidos pelo professor, decidimos que as 2 esferas se deslocariam na vertical, o que causa um efeito de sombra no chão, e o cubo fica estático entre as duas esferas. Uma vez que o cubo é metálico e as esferas são difusas, é possível perceber na animação o reflexo das esferas no cubo. Outro aspecto relevante é a movimentação da câmera em torno dos objetos. 

### Configurações

As configurações da camera da cena definidas e usadas no projeto seguem abaixo:

- Largura : 400px
- Altura : 225px 
- Proporção da tela : 16/9
- Amostras por pixels : 100
- Profundidade máxima : 50
- Quadros por segundo : 24

## Como Executar

Antes de executar, certifique-se de instalar as `node_modules` usando o seguinte comando:

```bash
npm install
```

Para gerar os arquivos das visualizações dos quadros, utilize o seguinte comando:

```bash
npm run execute
```

## Documentação

Para consultar a documentação do código, acesse o arquivo `docs/index.html`. 
Já para a geração do vídeo que foi feito em python, primeiramente temos que instalar o [OpenCV](https://opencv.org), depois disso com as pastas selecionadas(`../src/out/png` onde as imagens geradas ficam), além disso, delimitamos a quantidade de quadros por segundo e por fim fixamos a altura, largura e camadas pelo formato dos quadros.
Depois disso geramos o video em `.AVI`, para isso basta usar o metodo `write` do `cv2` para cada quadro que basicamente estão sendo concatenados.
E para `.mp4` o raciocínio é basicamente o mesmo.

## Tecnologias Usadas

- [Jupyter](https://jupyter.org)
- [Python](https://www.python.org)
- [NodeJS](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)

## Integrantes

- Breno Lagoa      - RA: 770989
- Matheus Fernando - RA: 771047
- Natália Carvalho - RA: 773383
- Wilson Marcielo  - RA: 771068
