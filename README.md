# Projeto final de Computação Gráfica - UFSCAR

O objetivo desta atividade é o desenvolvimento de uma animação utilizando as implementações do algoritmo ray tracing desenvolvidas em aula.

Para o desenvolvimento desse projeto foi utilizada a implementação de um dos membros dos grupos.

## Sobre a cena

[Vídeo da cena](https://drive.google.com/file/d/1C-uw1Xe0cVMF2rqiLJDke21VmUyGLsC3/view?usp=sharing)

A cena é composta por 4 objetos, sendo eles: 3 esferas (1 sendo o chão) e um cubo que possui uma malha poligonal triangular. Com base nos critérios estabelecidos pelo professor, decidimos que as 2 esferas se deslocariam na vertical, o que causa um efeito de sombra no chão, e o cubo fica estático entre as duas esferas. Uma vez que o cubo é metálico e as esferas são difusas, é possível perceber na animação o reflexo das esferas no cubo. Outro aspecto relevante é a movimentação da câmera em torno dos objetos. 

### Configurações

As configurações da camera da cena definidas e usadas no projeto seguem abaixo:

- Largura : `400px`
- Altura : `225px`
- Proporção da tela : `16/9`
- Amostras por pixels : `100`
- Profundidade máxima : `50`
- Quadros por segundo : `24`

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

### Geração do Vídeo com Python e Jupyter

A seguir, detalho o passo a passo para a geração do vídeo utilizando Python no ambiente Jupyter, com o OpenCV.

1. **Instalação do OpenCV**
    ```
    %pip install opencv-python
    ```

2. **Seleção de Pastas:**
   - As pastas selecionadas para a geração do vídeo são `../src/out/png`, onde as imagens geradas estão localizadas, no seguinte formato `world-{numero_do_frame}`.

3. **Configuração de Parâmetros:**
   - Primeiro foi definidida a quantidade desejada de quadros por segundo, a altura, largura e camadas conforme necessário.

4. **Geração de Vídeo em Formato .AVI:**
   - O método utilizado foi o `write` do OpenCV (`cv2`) para cada quadro gerado. Isso, essencialmente, estará concatenando os quadros para formar o vídeo em formato `.AVI`.

5. **Geração de Vídeo em Formato .mp4:**
   - O raciocínio para gerar o vídeo em formato `.mp4` é basicamente o mesmo que para o formato `.AVI`.

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
