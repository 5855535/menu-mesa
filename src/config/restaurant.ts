/**
 * Configuración del Restaurante
 * Edita estos valores para personalizar el menú digital
 */

export const restaurantConfig = {
  // Información básica
  name: 'Monster Burger',
  slogan: '🍔 Menú Digital',
  description: 'Las mejores hamburguesas preparadas con ingredientes frescos',

  // WhatsApp
  whatsapp: {
    phoneNumber: '573012345678', // Formato: +countryCode without +
    // IMPORTANTE: Cambiar este número por el número real del restaurante
    // Ejemplo: Para Colombia: 573012345678
    // Ejemplo: Para México: 525512345678
    defaultMessage: 'Hola 👋, me interesa hacer un pedido desde el menú digital de Monster Burger.',
  },

  // Información de contacto
  contact: {
    phone: '+57 301 234 5678',
    email: 'pedidos@monsterburger.com',
    address: 'Calle Principal 123, Ciudad',
    hours: 'Lun - Dom: 11:00 AM - 11:00 PM',
  },

  // Redes sociales
  social: {
    instagram: 'https://instagram.com/monsterburger',
    facebook: 'https://facebook.com/monsterburger',
    whatsapp: 'https://wa.me/573012345678',
  },

  // Políticas
  policies: {
    allergens: 'Contiene frutos secos, lácteos y gluten',
    terms: 'Sujeto a disponibilidad',
  },
}
