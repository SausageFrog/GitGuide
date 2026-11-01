---
title: 'The greatest post of all time'
author: 'Ben'
---

# Conceptos Fundamentales de Git y GitHub

**Git** es un sistema de control de versiones distribuido que gestiona el historial de cambios de un proyecto de forma local.<br /> **GitHub** es la plataforma en la nube que aloja repositorios de Git y añade herramientas para el trabajo colaborativo.

## 1. Control de Versiones (Git)

### Repositorio
Directorio del proyecto rastreado por Git. Almacena todo el historial de versiones, ramas y metadatos de configuración dentro de la subcarpeta oculta `.git`.

### Commit
Registro inmutable del estado del proyecto en un momento específico. Cada commit se identifica mediante un hash criptográfico único (SHA-1) y contiene los cambios realizados, el autor, la marca de tiempo y un mensaje descriptivo.

### Branch/Rama
Linea de tiempo del desarrollo. Permite aislar el desarrollo de nuevas funcionalidades o correcciones sin alterar el código base estable.

### Merge
Operación que unifica el historial de dos o más ramas, integrando los commits de una rama origen dentro de una rama destino.

---

## 2. Sincronización Remota

### Remote (Remoto)
Referencia a una copia del repositorio alojada en un servidor externo (por convención llamada `origin`). Permite sincronizar el trabajo local con el resto del equipo.

### Clone (Clonar)
Operación inicial que descarga una copia íntegra de un repositorio remoto a la máquina local, incluyendo todos sus archivos, historial de commits y ramas.

### Push
Envía los commits registrados en el repositorio local hacia el repositorio remoto para actualizar la rama correspondiente en la nube.

### Pull
Descarga los nuevos commits desde el repositorio remoto y los fusiona automáticamente con la rama activa en el entorno local.

### Fetch
Descarga los cambios e historiales nuevos desde el servidor remoto hacia tu máquina para inspeccionarlos, pero sin fusionarlos automáticamente con tus archivos de trabajo actuales.

---

## 3. Colaboración y Flujo de Trabajo (GitHub)

### Issues
Sistema de seguimiento de tareas, errores (bugs) y mejoras dentro de GitHub. Permite documentar requerimientos, asignar responsables y vincular discusiones técnicas directamente con el código.

### Pull Request (PR)
Solicitud formal para fusionar los cambios de una rama hacia otra dentro de GitHub. Actúa como instancia de revisión de código (*Code Review*), ejecución de pruebas automatizadas y discusión técnica antes de autorizar el *Merge*.

### Fork
Copia independiente de un repositorio de terceros alojada en tu propia cuenta de GitHub. Permite modificar proyectos externos sin permisos de escritura directos y proponer mejoras al repositorio original mediante un *Pull Request*.

### GitFlow
Modelo de ramificación estandarizado para estructurar el ciclo de desarrollo en equipo:
* **`main`:** Código de producción estable.
* **`dev`:** Rama principal de integración continua donde convergen los avances del equipo.
* **`feature/*`:** Ramas temporales creadas a partir de `dev` para desarrollar una funcionalidad específica.
* **`hotfix/*`:** Ramas creadas desde `main` para corregir errores críticos en producción de forma inmediata.