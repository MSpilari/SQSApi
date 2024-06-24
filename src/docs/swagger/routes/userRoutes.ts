/**
 * @swagger
 * /newUser:
 *   post:
 *     summary: Add a new User
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                    type: string
 *                    description: User created successfuly
 *       500:
 *         description: Invalid request
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Error'
 *       400:
 *         description: Bad request
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login with user email and password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Login successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                    type: boolean
 *                 accessToken:
 *                    type: string
 *                 user:
 *                    type: string
 *                 userId:
 *                    type: number
 *
 *       400:
 *         description: Bad request
 *         content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Error'
 *       401:
 *         description: Invalid Credentials
 *         content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /refreshToken:
 *   get:
 *     summary: Refresh the accessToken if the cookie is not expired
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successfully refresh access token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                    type: string
 *       500:
 *         description: Invalid or expired token
 *         content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /allUsers:
 *   get:
 *     summary: Return an array of all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Users list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /catalog:
 *   get:
 *     summary: Return the catalog from the user that comes from MinIo bucket
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Catalog from the authenticated user with his categories and products
 *       401:
 *         description: Invalid or expired token
 *         content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /deleteUser:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Deleted user successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                    type: boolean
 *                 deletedUser:
 *                    type: string
 *       500:
 *         description: Invalid or expired token
 *         content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Error'
 */
