import BaseModel from './BaseModel.js'

export default class User extends BaseModel {
    constructor(data) {
        super('users')

        if (
            typeof data !== 'object' || data === null ||
            !('id' in data) ||
            !('firstname' in data) ||
            !('lastname' in data) ||
            !('email' in data) ||
            !('password' in data) ||
            !('role' in data)
        ) {
            throw new Error('[User] Données invalides : certains champs requis sont manquants')
        }

        if (data.firstname.length > 30) {
            throw new Error('[User] Le prénom ne doit pas dépasser 30 caractères')
        }
        if (data.lastname.length > 30) {
            throw new Error('[User] Le nom ne doit pas dépasser 30 caractères')
        }
        if (data.email.length > 50) {
            throw new Error('[User] L’email ne doit pas dépasser 50 caractères')
        }

        const validRoles = ['user', 'admin']
        if (!validRoles.includes(data.role)) {
            throw new Error(`[User] Rôle invalide : "${data.role}"`)
        }

        this.id = Number(data.id)
        this.firstname = String(data.firstname)
        this.lastname = String(data.lastname)
        this.email = String(data.email)
        this.password = String(data.password)
        this.role = data.role ?? 'user'
        this.active = 'active' in data ? Boolean(data.active) : true
        this.created_at = data.created_at ?? new Date().toISOString()
        this.updated_at = data.updated_at ?? null
    }

    get fullName() {
        return `${this.firstname} ${this.lastname}`
    }

    requireAdmin() {
        return this.role === 'admin'
    }
}
