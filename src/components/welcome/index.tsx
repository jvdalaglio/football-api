import { motion } from "framer-motion";

export default function Welcome() {
  return (
    <div className="flex flex-col flex-1 min-h-[60vh]">
      <div className="flex flex-1 flex-col lg:flex-row gap-6 w-full h-full">
        {/* Tabela de Classificação - Seção Principal */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 18 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex-1 flex flex-col justify-center"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg p-2">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path
                  d="M3 6h18M3 12h18M3 18h18"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Tabela de Classificação
            </h2>
          </div>
          <div className="flex flex-col items-center justify-center flex-1 text-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-full p-4 mb-4"
            >
              <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
                <path
                  d="M16 4a12 12 0 1 1 0 24 12 12 0 0 1 0-24zm0 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"
                  fill="#3B82F6"
                />
                <path d="M16 8a8 8 0 1 1 0 16 8 8 0 0 1 0-16z" fill="#2563EB" />
              </svg>
            </motion.div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Selecione uma Competição
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Escolha uma competição para ver a tabela de classificação
            </p>
          </div>
        </motion.div>

        {/* Coluna Direita - Artilheiros e Próximos Jogos */}
        <div className="flex flex-1 flex-col gap-4 justify-between">
          {/* Artilheiros */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 18,
              delay: 0.1,
            }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex-1 flex flex-col justify-center"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg p-2">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    fill="white"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Artilheiros
              </h2>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 text-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-yellow-100 to-orange-200 dark:from-yellow-900 dark:to-orange-800 rounded-full p-3 mb-3"
              >
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    fill="#F59E0B"
                  />
                </svg>
              </motion.div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">
                Top Goleadores
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs">
                Veja quem está marcando mais gols
              </p>
            </div>
          </motion.div>

          {/* Próximos Jogos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 18,
              delay: 0.2,
            }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex-1 flex flex-col justify-center"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-lg p-2">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                    fill="white"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Próximos Jogos
              </h2>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 text-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 rounded-full p-3 mb-3"
              >
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                    fill="#10B981"
                  />
                </svg>
              </motion.div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">
                Calendário
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs">
                Confira os próximos confrontos
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
