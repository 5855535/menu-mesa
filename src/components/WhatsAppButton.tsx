import { useState } from 'react'

interface WhatsAppButtonProps {
  phoneNumber?: string
  message?: string
}

export function WhatsAppButton({
  phoneNumber = '573012345678', // Reemplazar con número real
  message = 'Hola, me interesa hacer un pedido desde el menú digital.',
}: WhatsAppButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleWhatsApp = () => {
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <>
      {/* Botón Flotante WhatsApp */}
      <button
        onClick={handleWhatsApp}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          fixed bottom-6 right-6 z-50
          w-14 h-14 sm:w-16 sm:h-16
          bg-[#25D366] hover:bg-[#20BA5A]
          rounded-full shadow-lg hover:shadow-2xl
          flex items-center justify-center
          transition-all duration-300 ease-out
          hover:scale-110 active:scale-95
          focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2
          group
        `}
        aria-label="Contactar por WhatsApp"
        title="Contacta por WhatsApp"
      >
        {/* Ícono WhatsApp */}
        <svg
          className="w-7 h-7 sm:w-8 sm:h-8 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371 0-.57 0-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-9.746 9.798c0 2.429.742 4.76 2.147 6.746l-2.257 6.351 6.558-2.113c1.973 1.06 4.209 1.621 6.756 1.621 5.429 0 9.885-4.418 9.912-9.852.0010-2.63-.775-5.095-2.245-7.252-1.47-2.157-3.55-3.711-5.667-4.267-2.117-.556-4.393-.196-6.358 1.041z" />
        </svg>

        {/* Tooltip al Hover */}
        {isHovered && (
          <div className="absolute bottom-full right-0 mb-3 px-3 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg whitespace-nowrap shadow-lg">
            Contactar por WhatsApp
            <div className="absolute top-full right-2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900" />
          </div>
        )}
      </button>

      {/* Pulse Animation Background */}
      <div
        className={`
          fixed bottom-6 right-6 z-40
          w-14 h-14 sm:w-16 sm:h-16
          bg-[#25D366] rounded-full
          opacity-20 animate-pulse
        `}
        style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}
      />
    </>
  )
}
