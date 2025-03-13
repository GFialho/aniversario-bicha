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

  useEffect(() => {
    if (rainbowMode) {
      const interval = setInterval(() => {
        setRotation(prev => (prev + 5) % 360);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [rainbowMode]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (!answerSubmitted) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleAnswerSubmit = () => {
    if (selectedAnswer !== null && !answerSubmitted) {
      setAnswerSubmitted(true);

      if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }

      setTimeout(() => {
        if (currentQuestion < quizQuestions.length - 1) {
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
    setCurrentQuestion(0);
    setScore(0);
    setQuizCompleted(false);
    setSelectedAnswer(null);
    setAnswerSubmitted(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100;

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
                  <span className="text-white font-bold">Pergunta {currentQuestion + 1} de {quizQuestions.length}</span>
                  <span className="text-white font-bold">Pontuação: {score}</span>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-4">{quizQuestions[currentQuestion].question}</h3>

                  <div className="space-y-3">
                    {quizQuestions[currentQuestion].options.map((option, index) => (
                      <div
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        className={`p-4 rounded-lg cursor-pointer transition-all ${selectedAnswer === index
                            ? answerSubmitted
                              ? index === quizQuestions[currentQuestion].correctAnswer
                                ? 'bg-green-500/70'
                                : 'bg-red-500/70'
                              : 'bg-pink-500/70 border-2 border-white'
                            : 'bg-white/30 hover:bg-white/40'
                          } ${answerSubmitted && index === quizQuestions[currentQuestion].correctAnswer
                            ? 'bg-green-500/70'
                            : ''
                          }`}
                      >
                        <span className="text-white font-medium">{option}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleAnswerSubmit}
                  disabled={selectedAnswer === null || answerSubmitted}
                  className={`w-full py-3 rounded-full font-bold text-white ${selectedAnswer === null || answerSubmitted
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
                  <p className="text-4xl font-bold text-white mb-4">{score} de {quizQuestions.length}</p>
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
