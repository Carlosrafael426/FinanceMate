function ConfirmModal({ isOpen, onClose, onConfirm, titulo, mensagem }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay escuro */}
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Conteúdo do Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-sm mx-4 z-10 transition-colors">
        <div className="text-center">
          <div className="text-5xl mb-4">⚠️</div>
          
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            {titulo}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {mensagem}
          </p>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal