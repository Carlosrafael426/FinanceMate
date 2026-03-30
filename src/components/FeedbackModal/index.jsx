import Modal from '../Modal'

function FeedbackModal({ isOpen, onClose, title, message, type = 'success' }) {
  const icon = type === 'success' ? '✅' : '⚠️'
  const color = type === 'success' ? 'text-emerald-600 dark:text-emerald-400' : 'text-orange-500 dark:text-orange-300'

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        <div className={`text-5xl mb-4 ${color}`}>{icon}</div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
        >
          Ok
        </button>
      </div>
    </Modal>
  )
}

export default FeedbackModal
