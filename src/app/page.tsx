"use client";
import Image from "next/image";
import { Confetti } from "./components/Confetti";
import { useState, useEffect } from "react";

// Perguntas do Quiz
const quizQuestions = [
  {
    question: "Qual é a bebida favorita do Matheus em uma balada?",
    options: ["Vodka com Energético", "Gin Tônica", "Caipirinha", "Tequila"],
    correctAnswer: 1
  },
  {
    question: "Qual destas músicas faz o Matheus rebolar até o chão?",
    options: ["Wrecking Ball - Miley Cyrus", "Envolver - Anitta", "Stupid Love - Lady Gaga", "Disk Me - Pabllo Vittar"],
    correctAnswer: 3
  },
  {
    question: "Qual é o maior crush famoso do Matheus?",
    options: ["Shawn Mendes", "Lil Nas X", "Maluma", "Timothée Chalamet"],
    correctAnswer: 0
  },
  {
    question: "Qual destas frases o Matheus mais usa quando está bêbado?",
    options: ["'Amiga, eu tô passada!'", "'Vou dar close hoje!'", "'Bicha, me segura!'", "'Hoje eu vou pegá todo mundo!'"],
    correctAnswer: 2
  },
  {
    question: "Qual é a posição favorita do Matheus?",
    options: ["Conchinha", "De ladinho", "Por cima", "Melhor não comentar..."],
    correctAnswer: 3
  },
  {
    question: "Quantos minutos o Matheus demora para se arrumar antes de sair?",
    options: ["30 minutos", "1 hora", "2 horas", "3 horas ou mais"],
    correctAnswer: 2
  },
  {
    question: "O que o Matheus faz quando vê um boy gato na rua?",
    options: ["Finge que não viu", "Dá uma secada discreta", "Manda mensagem para os amigos", "Passa rebolando na frente dele"],
    correctAnswer: 3
  },
  {
    question: "Qual é o maior sonho do Matheus?",
    options: ["Casar com um príncipe", "Ser famoso", "Viajar pelo mundo", "Ter um closet gigante"],
    correctAnswer: 0
  },
  {
    question: "O que o Matheus NUNCA empresta para os amigos?",
    options: ["Maquiagem", "Roupas", "Namorado", "Perfume"],
    correctAnswer: 2
  },
  {
    question: "Qual é o maior talento secreto do Matheus?",
    options: ["Cantar no chuveiro", "Imitar celebridades", "Dançar pole dance", "Fazer fofoca sem ninguém descobrir"],
    correctAnswer: 3
  },
  {
    question: "Qual é a maior fantasia do Matheus?",
    options: ["Um encontro romântico na praia", "Uma noite selvagem com um bombeiro", "Ser jurado de RuPaul's Drag Race", "Todas as anteriores"],
    correctAnswer: 3
  },
  {
    question: "Qual é o apelido mais indiscreto que os amigos dão para o Matheus?",
    options: ["Diva", "Poc Pocderosa", "Matheus Germana", "Não pode ser mencionado em público"],
    correctAnswer: 3
  },
  {
    question: "O que o Matheus faz quando toca sua música favorita na balada?",
    options: ["Grita 'ESSA É MINHA MÚSICA!'", "Sobe no palco sem ser convidado", "Faz uma performance digna de Grammy", "Todas as anteriores"],
    correctAnswer: 3
  },
  {
    question: "Qual é o maior segredo do Matheus que todo mundo já sabe?",
    options: ["Ele tem um altar para Lady Gaga", "Ele já ficou com o ex de um amigo", "Ele tem uma playlist só de músicas de sofrência", "Ele finge que não gosta de reality show, mas assiste todos"],
    correctAnswer: 1
  },
  {
    question: "Como o Matheus reage quando alguém tenta pegar o boy que ele está de olho?",
    options: ["Finge que não se importa", "Lança um olhar mortal", "Vai lá e rouba o boy mesmo assim", "Cria um grupo no WhatsApp para falar mal da pessoa"],
    correctAnswer: 2
  },
  // Novas perguntas indiscretas e bem gays
  {
    question: "Qual posição o Matheus prefere quando está com um boy?",
    options: ["Ativo", "Passivo", "Versátil", "Depende do tamanho do instrumento"],
    correctAnswer: 3
  },
  {
    question: "O que o Matheus faz quando vê um boy de sunga na praia?",
    options: ["Finge que está tirando foto da paisagem", "Manda foto no grupo dos amigos", "Passa rebolando na frente dele", "Todas as anteriores"],
    correctAnswer: 3
  },
  {
    question: "Qual é o maior fetiche secreto do Matheus?",
    options: ["Homens de uniforme", "Ser amarrado", "Fazer em lugares públicos", "Ele nunca conta, mas todos sabem"],
    correctAnswer: 2
  },
  {
    question: "O que o Matheus sempre leva na pochete quando vai para a balada?",
    options: ["Gloss labial", "Preservativos", "Poppers", "Todas as anteriores"],
    correctAnswer: 3
  },
  {
    question: "Qual é a cantora que o Matheus imita quando está bêbado?",
    options: ["Beyoncé", "Lady Gaga", "Britney Spears", "Pabllo Vittar"],
    correctAnswer: 1
  },
  {
    question: "O que o Matheus faz quando toca 'Wrecking Ball' da Miley Cyrus?",
    options: ["Canta no karaokê", "Tira a camisa e rebola", "Chora lembrando do ex", "Sobe em algo para imitar a bola de demolição"],
    correctAnswer: 3
  },
  {
    question: "Qual é a bebida que deixa o Matheus mais 'soltinho'?",
    options: ["Tequila", "Vodka", "Gin", "Qualquer uma depois da terceira dose"],
    correctAnswer: 3
  },
  {
    question: "O que o Matheus faz quando está flertando com alguém?",
    options: ["Morde o lábio", "Toca no braço da pessoa", "Joga o cabelo", "Faz todos os clichês gays possíveis"],
    correctAnswer: 3
  },
  {
    question: "Qual é a primeira coisa que o Matheus repara em um homem?",
    options: ["Olhos", "Bunda", "Braços", "O volume na calça"],
    correctAnswer: 1
  },
  {
    question: "Qual é o aplicativo de pegação que o Matheus mais usa?",
    options: ["Grindr", "Tinder", "Scruff", "Todos ao mesmo tempo"],
    correctAnswer: 3
  },
  {
    question: "O que o Matheus faz quando um boy manda nude?",
    options: ["Avalia com os amigos", "Salva na pasta secreta", "Pede mais ângulos", "Todas as anteriores"],
    correctAnswer: 3
  },
  {
    question: "Qual é a desculpa que o Matheus usa para chamar um crush para sua casa?",
    options: ["Ver um filme", "Tomar um vinho", "Mostrar sua coleção de vinis", "Netflix and chill"],
    correctAnswer: 1
  },
  {
    question: "O que o Matheus faz quando está se sentindo 'atacado'?",
    options: ["Grita 'SOCORROOO'", "Faz cara de chocado", "Coloca a mão no peito", "Todas as anteriores"],
    correctAnswer: 3
  },
  {
    question: "Qual é o maior drama que o Matheus já fez por um boy?",
    options: ["Chorou por uma semana", "Stalkeou todas as redes sociais dele", "Fingiu encontro casual", "Melhor não comentar em público"],
    correctAnswer: 3
  },
  {
    question: "O que o Matheus sempre diz depois de beijar alguém pela primeira vez?",
    options: ["'Gostei, vamos de novo'", "'Você beija bem, hein'", "'Isso é só o começo'", "'Já estou apaixonado'"],
    correctAnswer: 2
  },
  {
    question: "Qual é a música que o Matheus dedica para os crushs?",
    options: ["'Shallow' - Lady Gaga", "'Amor de Que' - Pabllo Vittar", "'Envolver' - Anitta", "Depende do tamanho do crush"],
    correctAnswer: 3
  },
  {
    question: "O que o Matheus faz quando está com ciúmes?",
    options: ["Ignora a pessoa", "Faz drama", "Bebe até esquecer", "Arruma outro na mesma hora"],
    correctAnswer: 1
  },
  {
    question: "Qual é a fantasia de Carnaval mais ousada que o Matheus já usou?",
    options: ["Policial sexy", "Diabinho com tridente", "Unicórnio com glitter", "Melhor não descrever aqui"],
    correctAnswer: 3
  },
  {
    question: "O que o Matheus sempre tem na mesa de cabeceira?",
    options: ["Hidratante", "Lubrificante", "Vela aromática", "Todas as anteriores"],
    correctAnswer: 3
  },
  {
    question: "Qual é o tamanho ideal de um boy para o Matheus?",
    options: ["Altura não importa", "Mais alto que ele", "Mais baixo que ele", "O tamanho que importa não é a altura..."],
    correctAnswer: 3
  },
  {
    question: "O que o Matheus faz quando um hétero bonitinho dá mole?",
    options: ["Ignora, porque respeita", "Tenta converter", "Manda indiretas", "Já prepara o discurso 'eu sabia que você era'"],
    correctAnswer: 1
  },
  {
    question: "Qual é o maior mico que o Matheus já pagou bêbado?",
    options: ["Dançou em cima do balcão", "Beijou o ex do amigo", "Caiu na pista de dança", "Melhor não relembrar"],
    correctAnswer: 3
  },
  {
    question: "O que o Matheus faz quando um boy não responde a mensagem?",
    options: ["Manda mais 5 mensagens", "Stalkeou para ver se está online", "Posta indireta no Instagram", "Todas as anteriores"],
    correctAnswer: 3
  },
  {
    question: "Qual é a parte do corpo que o Matheus mais gosta de mostrar?",
    options: ["Pernas", "Abdômen", "Bumbum", "Depende de quem está olhando"],
    correctAnswer: 2
  },
  {
    question: "O que o Matheus faz quando encontra o ex com outro boy?",
    options: ["Finge que não viu", "Passa rebolando na frente", "Tira foto e manda no grupo", "Arruma alguém mais bonito na hora"],
    correctAnswer: 3
  },
  {
    question: "Qual é o maior segredo sexual do Matheus?",
    options: ["Já fez em um banheiro público", "Já ficou com mais de uma pessoa na mesma noite", "Tem um vídeo comprometedor", "Não pode ser revelado nem sob tortura"],
    correctAnswer: 3
  },
  {
    question: "O que o Matheus faz quando está entediado?",
    options: ["Manda mensagem para ex", "Baixa apps de pegação", "Faz compras online", "Todas as anteriores"],
    correctAnswer: 3
  },
  {
    question: "Qual é a maior mentira que o Matheus já contou para um crush?",
    options: ["'Estou solteiro há anos'", "'Nunca fiquei com ninguém do nosso círculo'", "'Não sou ciumento'", "'Não costumo me apegar rápido'"],
    correctAnswer: 3
  },
  {
    question: "O que o Matheus faz quando um boy diz 'vamos ficar só na amizade'?",
    options: ["Aceita numa boa", "Chora no banheiro", "Já parte para o próximo", "Continua dando em cima até conseguir"],
    correctAnswer: 3
  },
  {
    question: "Qual é o maior gasto do Matheus em uma balada?",
    options: ["Drinks", "Uber", "Roupas novas para ir", "Presentes para o boy da vez"],
    correctAnswer: 0
  },
  {
    question: "O que o Matheus faz quando está sozinho em casa?",
    options: ["Dança pelado", "Faz videochamada picante", "Experimenta looks ousados", "Todas as anteriores"],
    correctAnswer: 3
  },
  {
    question: "Qual é a maior loucura que o Matheus já fez por um crush?",
    options: ["Viajou para outra cidade", "Fingiu gostar do mesmo que ele", "Mudou o visual completamente", "Algo que não pode ser mencionado aqui"],
    correctAnswer: 3
  },
  {
    question: "O que o Matheus faz quando um boy diz que é 'hétero curioso'?",
    options: ["Foge", "Tira a roupa", "Diz 'vamos matar sua curiosidade'", "Já prepara a playlist perfeita"],
    correctAnswer: 2
  },
  {
    question: "Qual é o maior medo do Matheus em um encontro?",
    options: ["O boy ser chato", "O boy não pagar a conta", "Encontrar algum ex", "O boy não corresponder na cama"],
    correctAnswer: 3
  },
  {
    question: "O que o Matheus faz quando está apaixonado?",
    options: ["Fica stalkeando 24h por dia", "Já planeja o casamento", "Conta para todos os amigos", "Todas as anteriores"],
    correctAnswer: 3
  },
  {
    question: "Qual é a cantada mais usada pelo Matheus?",
    options: ["'Você vem sempre aqui?'", "'Acho que te conheço de algum lugar'", "'Nossa, você é muito bonito'", "Ele não usa cantadas, só olhares"],
    correctAnswer: 3
  },
  {
    question: "O que o Matheus faz quando um boy diz que quer algo sério?",
    options: ["Foge", "Finge que não ouviu", "Muda de assunto", "Depende de quão gato o boy é"],
    correctAnswer: 3
  },
  {
    question: "Qual é o maior perrengue que o Matheus já passou por causa de um date?",
    options: ["Ficou sem bateria no celular", "Encontrou o boy com outra pessoa", "Não tinha dinheiro para pagar a conta", "História censurada por conteúdo explícito"],
    correctAnswer: 3
  },
  {
    question: "O que o Matheus faz quando está de ressaca?",
    options: ["Jura nunca mais beber", "Pede comida", "Chama os amigos para fofoca", "Todas as anteriores"],
    correctAnswer: 3
  },
  {
    question: "Qual é a maior red flag que o Matheus ignora em um boy?",
    options: ["Ciúmes excessivos", "Não responder mensagens", "Ainda morar com o ex", "Ser hétero"],
    correctAnswer: 3
  },
  {
    question: "O que o Matheus faz quando um boy diz 'vamos devagar'?",
    options: ["Respeita o espaço", "Já planeja o próximo encontro", "Manda mensagem a cada 5 minutos", "Vai com tudo mesmo assim"],
    correctAnswer: 3
  },
  {
    question: "Qual é o maior segredo de beleza do Matheus?",
    options: ["Máscara facial diária", "Produtos caríssimos", "Procedimentos estéticos", "Um truque que ele nunca revela"],
    correctAnswer: 3
  },
  {
    question: "O que o Matheus faz quando está se sentindo sexy?",
    options: ["Tira selfies no espelho", "Manda indiretas no Instagram", "Sai para caçar", "Todas as anteriores"],
    correctAnswer: 3
  },
  {
    question: "Qual é a maior mentira que o Matheus conta sobre sua vida sexual?",
    options: ["O número de parceiros", "Suas preferências na cama", "Suas habilidades", "Todas as anteriores"],
    correctAnswer: 3
  },
  {
    question: "O que o Matheus faz quando um boy ghosteia ele?",
    options: ["Supera rapidamente", "Stalkeou por semanas", "Cria teorias conspiratórias", "Todas menos a primeira"],
    correctAnswer: 3
  },
  {
    question: "Qual é o maior arrependimento amoroso do Matheus?",
    options: ["Ter ficado com um amigo", "Não ter ficado com alguém", "Ter voltado com um ex", "Algo que ele só conta depois de muitos drinks"],
    correctAnswer: 3
  },
  {
    question: "O que o Matheus faz quando está se sentindo carente?",
    options: ["Liga para os amigos", "Manda mensagem para ex", "Baixa apps de relacionamento", "Todas as anteriores"],
    correctAnswer: 3
  },
  {
    question: "Qual é a maior loucura sexual que o Matheus já fez?",
    options: ["Ménage", "Em lugar público", "Com alguém famoso", "Não pode ser mencionado em ambiente familiar"],
    correctAnswer: 3
  },
  {
    question: "O que o Matheus faz quando um boy diz que é bissexual?",
    options: ["Fica com pé atrás", "Acha mais interessante", "Pergunta se ele prefere homens ou mulheres", "Já prepara o discurso 'você é gay, só não assumiu ainda'"],
    correctAnswer: 3
  },
  {
    question: "Qual é o maior gasto mensal do Matheus?",
    options: ["Roupas", "Baladas", "Produtos de beleza", "Presentes para si mesmo"],
    correctAnswer: 2
  },
  {
    question: "O que o Matheus faz quando está se sentindo confiante?",
    options: ["Posta selfie sem filtro", "Usa roupas mais ousadas", "Flerta com todo mundo", "Todas as anteriores"],
    correctAnswer: 3
  },
  {
    question: "Qual é a maior fantasia não realizada do Matheus?",
    options: ["Ficar com gêmeos", "Fazer em um lugar exótico", "Com alguém famoso", "Algo que ele só revela após muita insistência"],
    correctAnswer: 3
  },
  {
    question: "O que o Matheus faz quando um boy diz 'vamos ser sinceros um com o outro'?",
    options: ["Concorda, mas esconde metade", "Conta tudo sem filtro", "Muda de assunto", "Prepara as mentiras mais convincentes"],
    correctAnswer: 0
  },
  {
    question: "Qual é o maior sacrifício que o Matheus já fez por sexo?",
    options: ["Viajou longas distâncias", "Gastou muito dinheiro", "Fingiu interesse em algo chato", "Melhor não detalhar aqui"],
    correctAnswer: 3
  },
  {
    question: "O que o Matheus faz quando está em uma seca?",
    options: ["Reclama para os amigos", "Baixa todos os apps possíveis", "Manda mensagem para todos os ex", "Todas as anteriores"],
    correctAnswer: 3
  },
  {
    question: "Qual é a maior desculpa que o Matheus já inventou para terminar?",
    options: ["'Não estou pronto para relacionamento'", "'Preciso focar em mim'", "'Não é você, sou eu'", "Uma história elaborada e dramática"],
    correctAnswer: 3
  },
  {
    question: "O que o Matheus faz quando um boy diz que quer 'só sexo'?",
    options: ["Aceita na hora", "Finge que quer mais", "Diz que não é esse tipo de pessoa", "Depende de quão gato o boy é"],
    correctAnswer: 3
  },
  {
    question: "Qual é o maior segredo que o Matheus guarda sobre sua vida amorosa?",
    options: ["Um amor não correspondido", "Um caso com alguém comprometido", "Uma relação que ninguém aprovaria", "Algo que levará para o túmulo"],
    correctAnswer: 3
  },
  {
    question: "O que o Matheus faz quando está em uma festa e não conhece ninguém?",
    options: ["Fica no celular", "Vai embora", "Bebe até ficar sociável", "Encontra o gay mais próximo e vira melhor amigo"],
    correctAnswer: 3
  },
  {
    question: "Qual é a maior dica de pegação que o Matheus dá para os amigos?",
    options: ["Seja confiante", "Invista em quem te olha", "Não demonstre muito interesse", "Um truque secreto que sempre funciona"],
    correctAnswer: 3
  },
  {
    question: "O que o Matheus faz quando um boy pergunta sobre seu passado?",
    options: ["Conta tudo sem filtro", "Omite a maior parte", "Muda de assunto", "Conta uma versão editada e glamourizada"],
    correctAnswer: 3
  },
  {
    question: "Qual é o maior medo do Matheus na cama?",
    options: ["Não satisfazer o parceiro", "Fazer algo errado", "Ser comparado com outros", "Algo que ele nunca admite"],
    correctAnswer: 3
  },
  {
    question: "O que o Matheus faz quando está apaixonado por alguém comprometido?",
    options: ["Sofre em silêncio", "Tenta conquistar mesmo assim", "Espera terminar para atacar", "Todas as anteriores, dependendo da fase"],
    correctAnswer: 3
  },
  {
    question: "Qual é a maior qualidade que o Matheus procura em um boy?",
    options: ["Inteligência", "Senso de humor", "Aparência", "Algo que varia conforme a carência do momento"],
    correctAnswer: 3
  },
  {
    question: "O que o Matheus faz quando um boy diz que não está pronto para algo sério?",
    options: ["Aceita numa boa", "Tenta convencê-lo", "Finge que também não quer", "Já começa a planejar o casamento mesmo assim"],
    correctAnswer: 3
  },
  {
    question: "Qual é o maior defeito que o Matheus tolera em um crush?",
    options: ["Ciúmes", "Falta de atenção", "Maus hábitos", "Qualquer coisa se o boy for bonito o suficiente"],
    correctAnswer: 3
  },
  {
    question: "O que o Matheus faz quando está em uma balada e toca uma música que odeia?",
    options: ["Vai ao bar", "Continua dançando", "Reclama com os amigos", "Faz cara de nojo e grita 'FLOP!'"],
    correctAnswer: 3
  },
  {
    question: "Qual é a maior desculpa que o Matheus já usou para não ir a um date?",
    options: ["'Estou doente'", "'Surgiu um compromisso'", "'Tenho que trabalhar'", "Uma história elaborada e dramática"],
    correctAnswer: 3
  },
  {
    question: "O que o Matheus faz quando um boy pergunta 'quantos você já pegou'?",
    options: ["Conta a verdade", "Diminui o número", "Aumenta o número", "Diz 'perdi a conta' com um sorriso malicioso"],
    correctAnswer: 3
  },
  {
    question: "Qual é o maior presente que o Matheus já deu para um crush?",
    options: ["Algo caro", "Algo personalizado", "Uma experiência inesquecível", "Algo que não pode ser mencionado em público"],
    correctAnswer: 3
  },
  {
    question: "O que o Matheus faz quando está em uma fase de bad?",
    options: ["Se isola", "Sai para esquecer os problemas", "Desabafa com amigos", "Posta indireta no Instagram a cada 5 minutos"],
    correctAnswer: 3
  },
  {
    question: "Qual é a maior loucura que o Matheus já fez em uma balada gay?",
    options: ["Dançou no pole dance", "Beijou vários na mesma noite", "Subiu no palco sem ser chamado", "Algo que ficou na história da boate"],
    correctAnswer: 3
  },
  {
    question: "O que o Matheus faz quando um boy diz 'vamos ver onde isso vai dar'?",
    options: ["Fica na expectativa", "Já planeja o futuro", "Não cria expectativas", "Já começa a escolher nomes de filhos"],
    correctAnswer: 3
  },
  {
    question: "Qual é o maior segredo de sedução do Matheus?",
    options: ["O olhar", "A dança", "A conversa", "Uma técnica que ele nunca revela"],
    correctAnswer: 3
  },
  {
    question: "O que o Matheus faz quando está interessado em alguém do grupo de amigos?",
    options: ["Disfarça ao máximo", "Conta para um amigo próximo", "Dá indiretas", "Ataca sem pensar nas consequências"],
    correctAnswer: 3
  },
  {
    question: "Qual é a maior desculpa que o Matheus já usou para stalkear um crush?",
    options: ["'Caí no perfil sem querer'", "'Um amigo me mostrou'", "'Estava pesquisando outra coisa'", "Ele nem tenta disfarçar"],
    correctAnswer: 3
  },
  {
    question: "O que o Matheus faz quando um boy pergunta sobre seus fetiches?",
    options: ["Conta tudo de uma vez", "Revela aos poucos", "Diz que é 'normal'", "Testa a reação com os mais leves primeiro"],
    correctAnswer: 3
  },
  {
    question: "Qual é o maior gasto do Matheus em uma viagem?",
    options: ["Hospedagem", "Comida", "Baladas", "Compras para impressionar nas redes sociais"],
    correctAnswer: 3
  },
  {
    question: "O que o Matheus faz quando está em um date ruim?",
    options: ["Inventa uma desculpa para ir embora", "Fica no celular", "Bebe para ficar mais tolerável", "Manda SOS para os amigos resgatarem"],
    correctAnswer: 3
  },
  {
    question: "Qual é a maior mentira que o Matheus já contou sobre sua idade?",
    options: ["Diminuiu 2 anos", "Diminuiu 5 anos", "Aumentou a idade", "Depende de quem está perguntando"],
    correctAnswer: 3
  },
  {
    question: "O que o Matheus faz quando um boy pergunta 'o que você está procurando'?",
    options: ["'Algo sério'", "'Só curtição'", "'Amizade colorida'", "O que acha que o boy quer ouvir"],
    correctAnswer: 3
  },
  {
    question: "Qual é o maior sacrifício estético que o Matheus já fez?",
    options: ["Dieta radical", "Procedimento doloroso", "Exercícios intensos", "Algo que valeu cada centavo e dor"],
    correctAnswer: 3
  },
  {
    question: "O que o Matheus faz quando está em uma fase boa com a autoestima?",
    options: ["Posta mais fotos", "Sai mais", "Flerta mais", "Todas as anteriores e mais um pouco"],
    correctAnswer: 3
  },
  {
    question: "Qual é a maior dica de sexo que o Matheus dá para os amigos?",
    options: ["'Comunique-se sempre'", "'Seja confiante'", "'Aprenda técnicas novas'", "Algo específico demais para mencionar aqui"],
    correctAnswer: 3
  },
  {
    question: "O que o Matheus faz quando um boy diz que nunca ficou com homem antes?",
    options: ["Foge", "Vai com calma", "Ensina tudo", "Diz 'hoje você vai conhecer o paraíso'"],
    correctAnswer: 3
  },
  {
    question: "Qual é o brinquedo favorito do Matheus na hora H?",
    options: ["Algemas", "Vibradores", "Fantasias", "Ele tem uma coleção completa"],
    correctAnswer: 3
  },
  {
    question: "O que o Matheus faz quando um boy pergunta se ele é 'ativo ou passivo'?",
    options: ["Responde diretamente", "Diz que é versátil", "Faz mistério", "Responde 'vem descobrir'"],
    correctAnswer: 3
  },
  {
    question: "Qual é a maior fantasia sexual do Matheus?",
    options: ["Ménage", "Role play", "Em lugares públicos", "Algo que ele só conta depois de muita bebida"],
    correctAnswer: 3
  },
  {
    question: "O que o Matheus faz quando está em uma balada e vê o crush?",
    options: ["Finge que não viu", "Vai direto falar com ele", "Pede para um amigo mediar", "Dança provocativamente até ser notado"],
    correctAnswer: 3
  },
  {
    question: "Qual é o maior segredo que o Matheus guarda sobre seus gostos sexuais?",
    options: ["Tem um fetiche incomum", "Gosta de dominação", "Prefere submissão", "Algo que ele nunca revelou a ninguém"],
    correctAnswer: 3
  },
  {
    question: "O que o Matheus faz quando um boy pergunta sobre seu 'número'?",
    options: ["Conta a verdade", "Diminui drasticamente", "Diz que não lembra", "Responde 'o suficiente para saber o que estou fazendo'"],
    correctAnswer: 3
  },
  {
    question: "Qual é a maior loucura que o Matheus já fez por tesão?",
    options: ["Dirigiu horas para um encontro", "Pagou uma fortuna em um date", "Arriscou ser pego em público", "Algo que ele só conta para os amigos mais próximos"],
    correctAnswer: 3
  },
  {
    question: "O que o Matheus faz quando está em uma fase de abstinência?",
    options: ["Fica irritado", "Compensa com comida", "Investe em brinquedos", "Todas as anteriores e mais algumas"],
    correctAnswer: 3
  },
  {
    question: "Qual é a maior mentira que o Matheus já contou para impressionar um crush?",
    options: ["Sobre sua profissão", "Sobre seu passado", "Sobre suas habilidades", "Uma história elaborada que ninguém acreditaria"],
    correctAnswer: 3
  },
  {
    question: "O que o Matheus faz quando um boy pergunta se ele já traiu?",
    options: ["Conta a verdade", "Mente descaradamente", "Desconversa", "Responde com 'depende do que você considera traição'"],
    correctAnswer: 3
  },
  {
    question: "Qual é o maior segredo que o Matheus guarda sobre seus relacionamentos passados?",
    options: ["Teve um relacionamento secreto", "Ainda pensa em um ex específico", "Terminou por um motivo inusitado", "Uma história que ele nunca contou a ninguém"],
    correctAnswer: 3
  },
  {
    question: "O que o Matheus faz quando está em uma balada e toca aquela música que ele secretamente adora, mas finge odiar?",
    options: ["Continua fingindo que odeia", "Admite que gosta", "Dança discretamente", "Sabe toda a coreografia mas finge que é irônico"],
    correctAnswer: 3
  },
  {
    question: "Qual é a maior loucura que o Matheus já fez por estar apaixonado?",
    options: ["Declaração pública", "Presente extravagante", "Mudança radical de vida", "Algo que envolveu muito planejamento e pouca racionalidade"],
    correctAnswer: 3
  },
  {
    question: "O que o Matheus faz quando um boy pergunta sobre seus maiores arrependimentos?",
    options: ["Conta sinceramente", "Menciona algo leve", "Desconversa", "Diz 'não me arrependo de nada, tudo me fez ser quem sou'"],
    correctAnswer: 3
  },
  {
    question: "Qual é o maior segredo que o Matheus guarda sobre seus gostos musicais?",
    options: ["Adora um estilo inesperado", "Tem uma playlist secreta", "É fã de um artista 'vergonhoso'", "Algo que contradiz completamente sua imagem pública"],
    correctAnswer: 3
  },
  {
    question: "O que o Matheus faz quando está em uma fase de mudanças?",
    options: ["Planeja cuidadosamente", "Age por impulso", "Consulta os amigos", "Muda tudo de uma vez sem avisar ninguém"],
    correctAnswer: 3
  },
  {
    question: "Qual é a maior desculpa que o Matheus já usou para justificar ter dado um block em alguém?",
    options: ["'Foi sem querer'", "'Precisava de espaço'", "'Meu celular bugou'", "Uma história elaborada envolvendo hackers"],
    correctAnswer: 3
  },
  {
    question: "O que o Matheus faz quando um boy pergunta sobre seus maiores sonhos?",
    options: ["Conta sinceramente", "Menciona sonhos genéricos", "Desconversa", "Inclui o boy nos sonhos mesmo tendo acabado de conhecê-lo"],
    correctAnswer: 3
  },
  {
    question: "Qual é o maior segredo que o Matheus guarda sobre seus planos futuros?",
    options: ["Tem um plano inusitado", "Quer mudar completamente de vida", "Tem um objetivo secreto", "Algo que surpreenderia todos que o conhecem"],
    correctAnswer: 3
  },
  {
    question: "O que o Matheus faz quando está em uma balada e encontra alguém que deu ghosting nele?",
    options: ["Ignora completamente", "Confronta educadamente", "Finge que não lembra da pessoa", "Faz questão de mostrar o quanto está maravilhoso e feliz"],
    correctAnswer: 3
  },
  {
    question: "Qual é a maior loucura que o Matheus já fez por impulso?",
    options: ["Uma compra caríssima", "Uma viagem não planejada", "Uma mudança radical no visual", "Algo que ele só percebeu a gravidade no dia seguinte"],
    correctAnswer: 3
  },
  {
    question: "O que o Matheus faz quando um boy pergunta sobre seus maiores talentos?",
    options: ["Demonstra alguns", "Menciona talentos genéricos", "Faz mistério", "Sugere mostrar em um ambiente mais privado"],
    correctAnswer: 3
  },
  {
    question: "Qual é o maior segredo que o Matheus guarda sobre seus hábitos noturnos?",
    options: ["Tem insônia", "Tem uma rotina estranha", "Tem um ritual secreto", "Algo que ele só faz quando está sozinho"],
    correctAnswer: 3
  },
  {
    question: "O que o Matheus faz quando está em uma fase de nostalgia?",
    options: ["Revê fotos antigas", "Contata amigos do passado", "Revisita lugares significativos", "Manda mensagem para todos os ex ao mesmo tempo"],
    correctAnswer: 3
  },
  {
    question: "Qual é a maior desculpa que o Matheus já usou para justificar ter stalkeado alguém por horas?",
    options: ["'Estava pesquisando'", "'Caí no perfil e me perdi'", "'Um amigo pediu para verificar'", "Uma explicação psicológica complexa que ninguém questionou"],
    correctAnswer: 3
  },
  {
    question: "O que o Matheus faz quando um boy pergunta se ele é ciumento?",
    options: ["Admite que é", "Nega completamente", "Diz que é 'só um pouquinho'", "Responde 'só vou ser ciumento se você me der motivo'"],
    correctAnswer: 3
  },
  {
    question: "Qual é o maior segredo que o Matheus guarda sobre seus gostos em homens?",
    options: ["Tem um tipo muito específico", "Gosta de algo incomum", "Tem preferências contraditórias", "Algo que contradiz completamente o que ele diz em público"],
    correctAnswer: 3
  },
  {
    question: "O que o Matheus faz quando está em uma balada e toca aquela música que ele secretamente sabe toda a coreografia?",
    options: ["Disfarça que sabe", "Dança discretamente", "Mostra alguns passos", "Dá um show completo como se tivesse ensaiado a vida toda"],
    correctAnswer: 3
  },
  {
    question: "Qual é a maior loucura que o Matheus já fez em um primeiro encontro?",
    options: ["Foi muito sincero", "Inventou uma personalidade", "Fingiu interesses", "Algo que ou daria muito certo ou muito errado"],
    correctAnswer: 3
  }
];

export default function Home() {
  const [rainbowMode, setRainbowMode] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [randomizedQuestions, setRandomizedQuestions] = useState<typeof quizQuestions>([]);

  useEffect(() => {
    if (rainbowMode) {
      const interval = setInterval(() => {
        setRotation(prev => (prev + 5) % 360);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [rainbowMode]);

  // Função para embaralhar e selecionar 15 perguntas aleatórias
  const getRandomQuestions = () => {
    const shuffled = [...quizQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 15);
  };

  // Inicializar perguntas aleatórias quando o quiz é mostrado
  useEffect(() => {
    if (showQuiz) {
      setRandomizedQuestions(getRandomQuestions());
    }
  }, [showQuiz]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (!answerSubmitted) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleAnswerSubmit = () => {
    if (selectedAnswer !== null && !answerSubmitted) {
      setAnswerSubmitted(true);

      if (selectedAnswer === randomizedQuestions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }

      setTimeout(() => {
        if (currentQuestion < randomizedQuestions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
          setAnswerSubmitted(false);
        } else {
          setQuizCompleted(true);
        }
      }, 1500);
    }
  };

  const restartQuiz = () => {
    setRandomizedQuestions(getRandomQuestions());
    setCurrentQuestion(0);
    setScore(0);
    setQuizCompleted(false);
    setSelectedAnswer(null);
    setAnswerSubmitted(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / randomizedQuestions.length) * 100;

    if (percentage >= 90) {
      return "BICHA, VOCÊ CONHECE O MATHEUS MELHOR QUE ELE MESMO! 👑";
    } else if (percentage >= 70) {
      return "ARRASOU! Você é praticamente o melhor amigo do Matheus! 💅";
    } else if (percentage >= 50) {
      return "Hmm, você conhece o Matheus, mas ainda tem muito o que aprender sobre essa diva! 💁‍♂️";
    } else if (percentage >= 30) {
      return "Amiga, você mal conhece o Matheus! Precisa sair mais com ele! 🍸";
    } else {
      return "FLOP TOTAL! Você tem certeza que conhece o Matheus? 😂";
    }
  };

  return (
    <div className={`min-h-screen ${rainbowMode ? 'bg-rainbow-animate' : 'bg-gradient-to-b from-purple-600 via-pink-500 to-orange-400'} p-8 pb-20 font-[family-name:var(--font-geist-sans)]`}>
      <Confetti />

      <div className="fixed top-0 left-0 w-full h-2 rainbow-border"></div>
      <div className="fixed bottom-0 left-0 w-full h-2 rainbow-border"></div>
      <div className="fixed top-0 left-0 h-full w-2 rainbow-border"></div>
      <div className="fixed top-0 right-0 h-full w-2 rainbow-border"></div>

      {showQuiz ? (
        <div className="max-w-4xl mx-auto mt-8">
          <button
            onClick={() => setShowQuiz(false)}
            className="mb-6 px-4 py-2 bg-white/30 rounded-full text-white font-bold hover:bg-white/40 transition-colors"
          >
            ← Voltar para a Celebração
          </button>

          <div className={`bg-white/20 backdrop-blur-md rounded-xl p-8 shadow-xl ${rainbowMode ? 'border-rainbow border-4' : 'border border-white/30'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-8">
              Quiz: <span className={`${rainbowMode ? 'text-rainbow-fast' : 'text-rainbow'} animate-shimmer`}>Quanto Você Conhece o Matheus?</span>
            </h2>

            {!quizCompleted ? (
              <>
                <div className="mb-6 flex flex-col justify-between items-center">
                  <span className="text-white font-bold">Pergunta {currentQuestion + 1} de {randomizedQuestions.length}</span>
                  <span className="text-white font-bold">Pontuação: {score}</span>
                </div>

                {randomizedQuestions.length > 0 && currentQuestion < randomizedQuestions.length ? (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-white mb-4">{randomizedQuestions[currentQuestion].question}</h3>

                    <div className="space-y-3">
                      {randomizedQuestions[currentQuestion].options.map((option, index) => (
                        <div
                          key={index}
                          onClick={() => handleAnswerSelect(index)}
                          className={`p-4 rounded-lg cursor-pointer transition-all ${selectedAnswer === index
                            ? answerSubmitted
                              ? index === randomizedQuestions[currentQuestion].correctAnswer
                                ? 'bg-green-500/70'
                                : 'bg-red-500/70'
                              : 'bg-pink-500/70 border-2 border-white'
                            : 'bg-white/30 hover:bg-white/40'
                            } ${answerSubmitted && index === randomizedQuestions[currentQuestion].correctAnswer
                              ? 'bg-green-500/70'
                              : ''
                            }`}
                        >
                          <span className="text-white font-medium">{option}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-8">
                    <p className="text-white text-xl">Carregando perguntas...</p>
                  </div>
                )}

                <button
                  onClick={handleAnswerSubmit}
                  disabled={selectedAnswer === null || answerSubmitted || randomizedQuestions.length === 0}
                  className={`w-full py-3 rounded-full font-bold text-white ${selectedAnswer === null || answerSubmitted || randomizedQuestions.length === 0
                    ? 'bg-gray-500/50 cursor-not-allowed'
                    : rainbowMode
                      ? 'bg-rainbow-animate'
                      : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90'
                    }`}
                >
                  {answerSubmitted ? 'Próxima pergunta...' : 'Confirmar Resposta'}
                </button>
              </>
            ) : (
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Quiz Completo!</h3>

                <div className={`p-6 mb-6 ${rainbowMode ? 'bg-rainbow-animate' : 'bg-white/30'} rounded-xl`}>
                  <p className="text-white text-xl mb-2">Sua pontuação:</p>
                  <p className="text-4xl font-bold text-white mb-4">{score} de {randomizedQuestions.length}</p>
                  <p className="text-white text-lg font-bold">{getScoreMessage()}</p>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={restartQuiz}
                    className={`px-8 py-3 rounded-full font-bold text-white ${rainbowMode
                      ? 'bg-rainbow-animate'
                      : 'bg-gradient-to-r from-pink-500 to-purple-600'
                      } hover:opacity-90`}
                  >
                    Tentar Novamente
                  </button>

                  <button
                    onClick={() => setShowQuiz(false)}
                    className="px-8 py-3 bg-white/30 rounded-full text-white font-bold hover:bg-white/40"
                  >
                    Voltar para a Celebração
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <main className="max-w-4xl mx-auto flex flex-col items-center gap-8 pt-12">
          <div className="animate-bounce-slow relative">
            <div className={`absolute inset-0 ${rainbowMode ? 'rainbow-glow' : 'glow'} rounded-full blur-md -z-10`}></div>
            <Image
              className={`rounded-full border-4 ${rainbowMode ? 'border-rainbow' : 'border-white'} shadow-lg ${rainbowMode ? 'animate-spin-slow' : ''}`}
              src="/matheus.png"
              alt="Matheus Germano"
              width={150}
              height={150}
              priority
              style={{ transform: rainbowMode ? `rotate(${rotation}deg)` : 'none' }}
            />
          </div>

          <h1 className="text-6xl md:text-8xl font-bold text-center text-white drop-shadow-lg animate-pulse-slow">
            Feliz Aniversário!
          </h1>

          <div className={`bg-white/20 backdrop-blur-md rounded-xl p-8 shadow-xl ${rainbowMode ? 'border-rainbow border-4' : 'border border-white/30'} text-center`}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Para o <span className={`${rainbowMode ? 'text-rainbow-fast' : 'text-rainbow'} animate-shimmer`}>FABULOSO</span> Matheus Germano
            </h2>

            <p className="text-xl text-white mb-6">
              Hoje celebramos você em toda sua glória maravilhosa, autêntica e ABSOLUTAMENTE fabulosa! 💅✨
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {["Diva", "Orgulhoso", "Fabuloso", "Autêntico", "Icônico", "Lendário", "Arrasador"].map((trait, i) => (
                <span
                  key={i}
                  className={`px-4 py-2 ${rainbowMode ? 'bg-white/30 rainbow-bg-animate' : 'bg-white/30'} rounded-full text-white font-bold animate-float`}
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  {trait}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <button
                className={`px-8 py-4 ${rainbowMode ? 'bg-rainbow-animate' : 'bg-gradient-to-r from-pink-500 to-purple-600'} rounded-full text-white font-bold text-xl shadow-lg hover:scale-105 transition-transform`}
                onClick={() => {
                  setRainbowMode(!rainbowMode);
                  if (!rainbowMode) {
                    alert("🌈✨ MODO SUPER GAY ATIVADO! BICHA, ARRASOU! 💅💖");
                  }
                }}
              >
                {rainbowMode ? "MODO SUPER GAY ATIVADO! 🌈" : "Ativar Modo Super Gay! 🏳️‍🌈"}
              </button>

              <button
                className={`px-8 py-4 ${rainbowMode ? 'bg-rainbow-animate' : 'bg-gradient-to-r from-pink-500 to-purple-600'} rounded-full text-white font-bold text-xl shadow-lg hover:scale-105 transition-transform`}
                onClick={() => setShowQuiz(true)}
              >
                Fazer o Quiz Gay do Matheus! 🎮
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-8">
            <div className={`${rainbowMode ? 'bg-white/20 rainbow-bg-animate' : 'bg-white/20'} backdrop-blur-md rounded-xl p-6 shadow-xl ${rainbowMode ? 'border-rainbow border-2' : 'border border-white/30'}`}>
              <h3 className="text-2xl font-bold text-white mb-3">Playlist SUPER Gay</h3>
              <ul className="text-white space-y-2">
                {[
                  "Born This Way - Lady Gaga",
                  "Não Vou Deitar - Gloria Groove",
                  "Flutua - Johnny Hooker ft. Liniker",
                  "I Will Survive - Gloria Gaynor",
                  "Vogue - Madonna",
                  "Amor de Que - Pabllo Vittar",
                  "Rain On Me - Lady Gaga & Ariana Grande",
                  "Envolver - Anitta"
                ].map((song, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className={`${rainbowMode ? 'text-rainbow-fast' : 'text-pink-300'}`}>♫</span> {song}
                  </li>
                ))}
              </ul>
            </div>

            <div className={`${rainbowMode ? 'bg-white/20 rainbow-bg-animate' : 'bg-white/20'} backdrop-blur-md rounded-xl p-6 shadow-xl ${rainbowMode ? 'border-rainbow border-2' : 'border border-white/30'}`}>
              <h3 className="text-2xl font-bold text-white mb-3">Desejos de Aniversário</h3>
              <div className="space-y-3 text-white">
                <p>"Que seu dia seja tão FABULOSO quanto suas escolhas de roupa! 💖"</p>
                <p>"Brindando a mais um ano sendo AUTENTICAMENTE você! 🌈"</p>
                <p>"Você torna o mundo mais COLORIDO só por existir! ✨"</p>
                <p>"Continue BRILHANDO e espalhando GLITTER por onde passa! 💅"</p>
                <p>"Que seu aniversário seja tão ICÔNICO quanto você! 👑"</p>
              </div>
            </div>
          </div>

          <div className={`mt-12 text-center ${rainbowMode ? 'animate-pulse' : ''}`}>
            <h2 className="text-3xl font-bold text-white mb-4">As Cores da Bandeira do Orgulho São Você!</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { color: "bg-red-500", meaning: "Vida" },
                { color: "bg-orange-500", meaning: "Cura" },
                { color: "bg-yellow-500", meaning: "Luz do Sol" },
                { color: "bg-green-500", meaning: "Natureza" },
                { color: "bg-blue-500", meaning: "Harmonia" },
                { color: "bg-purple-500", meaning: "Espírito" }
              ].map((flag, i) => (
                <div
                  key={i}
                  className={`${rainbowMode ? `${flag.color} animate-bounce-custom` : flag.color} px-6 py-3 rounded-lg text-white font-bold shadow-md hover:scale-105 transition-transform`}
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  {flag.meaning}
                </div>
              ))}
            </div>
          </div>

          <div className={`mt-12 ${rainbowMode ? 'bg-white/20 rainbow-bg-animate' : 'bg-white/20'} backdrop-blur-md rounded-xl p-8 shadow-xl ${rainbowMode ? 'border-rainbow border-2' : 'border border-white/30'} text-center w-full`}>
            <h3 className="text-3xl font-bold text-white mb-4">Dicionário da Bicha</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-white">
              <div className={`${rainbowMode ? 'bg-white/10 rainbow-bg-animate' : 'bg-white/10'} p-4 rounded-lg`}>
                <span className="font-bold">Arrasar:</span> O que o Matheus faz todos os dias
              </div>
              <div className={`${rainbowMode ? 'bg-white/10 rainbow-bg-animate' : 'bg-white/10'} p-4 rounded-lg`}>
                <span className="font-bold">Lacrar:</span> Sinônimo de Matheus Germano
              </div>
              <div className={`${rainbowMode ? 'bg-white/10 rainbow-bg-animate' : 'bg-white/10'} p-4 rounded-lg`}>
                <span className="font-bold">Babado:</span> As histórias que só o Matheus sabe contar
              </div>
              <div className={`${rainbowMode ? 'bg-white/10 rainbow-bg-animate' : 'bg-white/10'} p-4 rounded-lg`}>
                <span className="font-bold">Viado:</span> Termo de carinho entre amigos
              </div>
              <div className={`${rainbowMode ? 'bg-white/10 rainbow-bg-animate' : 'bg-white/10'} p-4 rounded-lg`}>
                <span className="font-bold">Dar close:</span> Especialidade do aniversariante
              </div>
              <div className={`${rainbowMode ? 'bg-white/10 rainbow-bg-animate' : 'bg-white/10'} p-4 rounded-lg`}>
                <span className="font-bold">Fazer a linha:</span> O que o Matheus faz de melhor
              </div>
            </div>
          </div>

          <div className={`mt-12 ${rainbowMode ? 'bg-white/20 rainbow-bg-animate' : 'bg-white/20'} backdrop-blur-md rounded-xl p-8 shadow-xl ${rainbowMode ? 'border-rainbow border-2' : 'border border-white/30'} text-center w-full`}>
            <h3 className="text-3xl font-bold text-white mb-6">Motivos para Amar o Matheus</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { emoji: "💖", text: "Coração enorme" },
                { emoji: "✨", text: "Personalidade brilhante" },
                { emoji: "🌈", text: "Orgulho autêntico" },
                { emoji: "💅", text: "Estilo impecável" },
                { emoji: "🎭", text: "Expressão única" },
                { emoji: "🔥", text: "Energia contagiante" },
                { emoji: "🌟", text: "Talento incrível" },
                { emoji: "🦄", text: "Raridade preciosa" },
                { emoji: "💯", text: "100% fabuloso" }
              ].map((item, i) => (
                <div
                  key={i}
                  className={`${rainbowMode ? 'animate-pulse' : ''} flex flex-col items-center`}
                >
                  <div className="text-4xl mb-2">{item.emoji}</div>
                  <div className="font-bold">{item.text}</div>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      <footer className="mt-20 text-center text-white">
        <p className="text-lg">Feito com 💖 de Gabriel Fialho para o amigo mais FABULOSO do mundo</p>
        <p className="text-sm mt-2">© {new Date().getFullYear()} Aniversário do Matheus</p>
      </footer>
    </div>
  );
}
