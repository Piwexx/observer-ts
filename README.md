# 📡 TS Observers Utils

Utilidades simples y tipadas en TypeScript para trabajar con `IntersectionObserver`, `MutationObserver` y `ResizeObserver`. Diseñado para facilitar la observación de elementos del DOM en proyectos web modernos.

---

## 🚀 Instalación

```bash
npm install @tu-org/ts-observers-utils
 ```
## 🧪 Ejemplos de Uso

### 🧭 observeElements  
Observa la visibilidad de uno o más elementos.

```ts
import { observeElements } from '@tu-org/ts-observers-utils';

const stop = observeElements(
  document.querySelectorAll('.track'),
  (entry, observer) => {
    if (entry.isIntersecting) {
      console.log('Elemento visible:', entry.target);
    }
  },
  {
    threshold: 0.5,
  }
);

// Para detener la observación
stop();
 ```
### 🧭 mutationElements   
Observa cambios en el DOM de uno o más elementos.

```ts
import { mutationElements } from '@tu-org/ts-observers-utils';

const stop = mutationElements(
  document.getElementById('app'),
  (mutation, observer) => {
    console.log('Mutación detectada:', mutation);
  },
  {
    childList: true,
    subtree: true,
  }
);

// Para detener la observación
stop();
 ```
### 🧭 resizeElements   
Observa cambios de tamaño en uno o varios elementos.

```ts
import { resizeElements } from '@tu-org/ts-observers-utils';

const stop = resizeElements(
  document.querySelector('.resizable'),
  (entry, observer) => {
    console.log('Nuevo tamaño:', entry.contentRect);
  },
  {}
);

// Para detener la observación
stop();
 ```