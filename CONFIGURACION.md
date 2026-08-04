# ⚙️ Guía de Configuración del Menú Digital

## 🍔 Configuración Rápida del Restaurante

### 1. Actualizar Información del Restaurante

Edita el archivo `src/config/restaurant.ts`:

```typescript
export const restaurantConfig = {
  // Información básica
  name: 'Monster Burger',  // ← Cambiar nombre del restaurante
  slogan: '🍔 Menú Digital',
  description: 'Las mejores hamburguesas preparadas con ingredientes frescos',

  // WhatsApp - CONFIGURACIÓN IMPORTANTE
  whatsapp: {
    phoneNumber: '573012345678',  // ← CAMBIAR A TU NÚMERO DE WHATSAPP
    // Formato: country code + número sin +
    // Ejemplos:
    // Colombia:   573012345678 (el +57 sin +)
    // México:     525512345678 (el +52 sin +)
    // Argentina:  541112345678 (el +54 sin +)
    
    defaultMessage: 'Hola 👋, me interesa hacer un pedido desde el menú digital de Monster Burger.',
  },

  // Información de contacto
  contact: {
    phone: '+57 301 234 5678',  // ← Tu número con formato
    email: 'pedidos@monsterburger.com',
    address: 'Calle Principal 123, Ciudad',
    hours: 'Lun - Dom: 11:00 AM - 11:00 PM',
  },

  // Redes sociales (opcional)
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
```

---

## 📱 Configuración de WhatsApp

### Obtener tu Número de WhatsApp

1. **Abre WhatsApp** en tu teléfono
2. **Toca el icono de menú** (⋮) o Ajustes
3. **Busca "Acerca de"**
4. Tu número aparece con el formato internacional (ej: +57 301 234 5678)
5. **Copia solo los dígitos sin el `+`**

### Formato Correcto del Número

```
ANTES: +57 301 234 5678
DESPUÉS: 573012345678  ✅

ANTES: +34 912 34 56 78
DESPUÉS: 34912345678  ✅
```

---

## 🎨 Cambios Realizados en Esta Versión

### Paleta de Colores Actualizada
- **Antes**: Naranja (#ea580c)
- **Ahora**: Rojo vibrante (#dc2626) + Dorado para acentos

**Por qué?** El rojo es más apetitoso para comida y el dorado añade un toque premium.

### Botón de WhatsApp Flotante ✨
- ✅ Botón flotante fijo en la esquina inferior derecha
- ✅ Pulse animation que llama la atención
- ✅ Tooltip al pasar el mouse
- ✅ Abre WhatsApp directamente con mensaje predefinido
- ✅ Optimizado para mobile y desktop

### Mejoras en Header
- ✅ Ícono más atractivo con checkmark
- ✅ Badge "Mesa 12" mejorado
- ✅ Emoji en el slogan (🍔)

### Footer Mejorado
- ✅ Link directo a WhatsApp con icono
- ✅ Información de teléfono clickeable
- ✅ Horario de atención visible
- ✅ Contacto más accesible

---

## 🚀 Cómo Desplegar los Cambios

### 1. Editar la Configuración
```bash
# Abre este archivo y actualiza tu información
src/config/restaurant.ts
```

### 2. Probar Localmente
```bash
cd menu-mesa
npm install
npm run dev
# Abre http://localhost:8443 en tu navegador
```

### 3. Hacer Commit y Push
```bash
git add .
git commit -m "🍔 Actualizar configuración del restaurante"
git push origin main
```

### 4. Deploy
El sitio se despliega automáticamente en Netlify

---

## 📲 Prueba del Botón WhatsApp

1. **En desarrollo**:
   - Haz clic en el botón verde de WhatsApp
   - Debe abrir WhatsApp Web (o tu app de WhatsApp)
   - Con el mensaje predefinido

2. **En producción**:
   - El botón flotante estará visible en todas las páginas
   - Funciona en móvil y desktop

---

## 🔧 Personalización Adicional

### Cambiar el Ícono del Logo
En `src/App.tsx`, busca la sección Header y reemplaza el SVG:

```tsx
<svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
  {/* Reemplaza este SVG con otro de tu elección */}
</svg>
```

### Cambiar la Paleta de Colores
En `src/index.css`, busca la sección `@theme` y actualiza los colores brand:

```css
@theme {
  --color-brand-600: #dc2626;  /* Color principal */
  --color-accent: #f59e0b;      /* Color secundario */
  /* ... más colores ... */
}
```

---

## ✅ Checklist de Configuración

- [ ] Cambié el número de WhatsApp en `src/config/restaurant.ts`
- [ ] Actualicé el nombre del restaurante
- [ ] Actualicé el teléfono de contacto
- [ ] Actualicé la dirección
- [ ] Actualicé los horarios
- [ ] Probé el botón de WhatsApp
- [ ] Probé en móvil
- [ ] Hice deploy

---

## ❓ Preguntas Frecuentes

**P: ¿Cómo cambio el número de WhatsApp?**
R: Edita `src/config/restaurant.ts` en la línea de `phoneNumber`. Asegúrate de usar el formato sin `+` (ej: 573012345678).

**P: ¿Funciona en iOS?**
R: Sí, el botón abre la app de WhatsApp en iOS, Android y también en WhatsApp Web en desktop.

**P: ¿Puedo cambiar el mensaje por defecto?**
R: Sí, edita el campo `defaultMessage` en `src/config/restaurant.ts`.

**P: ¿El botón es obligatorio?**
R: No, si no quieres usarlo, simplemente no llenaremos el número de WhatsApp y no aparecerá.

---

## 📞 Soporte

Si tienes problemas o preguntas, contacta al equipo de desarrollo.

---

**Última actualización**: Agosto 2025
**Versión**: 2.0 (Con WhatsApp y nueva paleta de colores)
