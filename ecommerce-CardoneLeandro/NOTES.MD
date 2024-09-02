npm run generate:migration --name=<entityTable>

Para las rutas PUT donde debes actualizar partes de un objeto, puedes utilizar PartialType de @nestjs/mapped-types. Este utilitario genera un tipo basado en el DTO original, pero marca todos los campos como opcionales. Esto te permite recibir un objeto con campos incompletos sin requerir que todos estén presentes.
 La función PartialType toma un DTO existente y genera una nueva clase DTO donde todos los campos son opcionales. Esto permite que la información entrante en una ruta PUT o PATCH no tenga que incluir todos los campos definidos en el DTO original, pero aún conserva las reglas de validación para aquellos campos que sí estén presentes.

Por ejemplo, si tienes un DTO original CreateUserDto con campos como name, email, y password, al utilizar PartialType(CreateUserDto), se crea un UpdateUserDto donde estos campos son opcionales. Si en la solicitud PUT solo envías email, el UpdateUserDto aceptará este dato y lo validará conforme a las reglas definidas en CreateUserDto, mientras que name y password no serán requeridos.

Esto es especialmente útil para actualizaciones parciales, donde solo algunos campos de un objeto deben ser modificados, sin requerir que toda la estructura del DTO original esté presente.


REPASAR TODAS LAS VARIABLES VERIFICANDO LA COHERENCIA EN EL ENUNCIADO DE LAS MISMAS. 
REPASAR TODOS LOS REPOSITORIOS SEPARANDO LOS RETURN DE LOS AWAIT!!!


ESTANDARIZAR LAS DECLARACIONES DE LOS METODOS PERSONALIZADOS DE LOS REPOSITORIOS / SERVICIO
COMO POR EJEMPLO, REEMPLAZAR LOS FIND(default) POR GET(en metodos personalizados)


SI SE UTILIZARAN O NO ABREVIATURAS PARA REFERIRNOS A LOS COMPONENTES INYECTADOS
COMO Sv para los servicios o Rp para los repositorios.



# Resumen del Proyecto de E-commerce

## Objetivos Realizados

1. **Estructura del Proyecto:**
   - Creación de la estructura básica del proyecto en NestJS con módulos de `auth`, `categories`, `products`, y `users`.

2. **Controlador de Productos (ProductsController):**
   - Implementación de métodos CRUD (Crear, Leer, Actualizar, Eliminar) para productos.
   - Manejo de errores y validaciones.

3. **Repositorio de Usuarios (UsersRepository):**
   - Implementación de métodos para obtener, crear, actualizar y eliminar usuarios.
   - Corrección de errores y validaciones en métodos del repositorio.

4. **Servicio de Usuarios (UsersService):**
   - Implementación de métodos para gestionar usuarios.
   - Manejo de errores y retorno adecuado de respuestas.

5. **Controlador de Usuarios (UsersController):**
   - Implementación de métodos CRUD para usuarios.
   - Manejo de errores con `BadRequestException`.

6. **Guardia de Autenticación (AuthGuard):**
   - Implementación básica del guardia para verificar credenciales mediante cabeceras `Authorization`.

## Tareas Pendientes

1. **Autenticación con JWT:**
   - Implementar la generación y validación de tokens JWT.
   - Integrar JWT con el sistema de autenticación existente.

2. **Validaciones Adicionales:**
   - Implementar validaciones adicionales con `class-validator` en los DTOs.
   - Configurar pipes para validar datos entrantes y IDs.

3. **Protección de Rutas:**
   - Configurar y aplicar guards para proteger rutas basadas en roles (por ejemplo, solo admins).

4. **Configuración y Seguridad:**
   - Configurar `bcrypt` para el hashing de contraseñas.
   - Mejorar la seguridad y manejo de excepciones globalmente.

5. **Pruebas:**
   - Implementar pruebas unitarias y de integración para los componentes del proyecto.
