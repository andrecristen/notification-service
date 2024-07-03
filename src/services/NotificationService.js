/**
 * Classe que representa um serviço de notificação.
 * @class
 */
class NotificationService {

    /**
     * Cria uma instância do NotificationService.
     * @constructor
     * @param {Object} config - Configuração para o serviço.
     */
    constructor() {
        this.observers = [];
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    async notify(message) {
        let success = 0;
        for (const observer of this.observers) {
            try {
                if (await observer.update(message)) {
                    success++;
                }
            } catch (error) {
                return false;
            }
        }
        return (success == this.observers.length);
    }
}

module.exports = NotificationService;
